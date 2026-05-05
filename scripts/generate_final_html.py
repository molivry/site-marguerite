import re

# Read the paths
with open('paths_output.txt', 'r', encoding='utf-16le') as f:
    svg_paths = f.read()

# Clean up 
svg_paths = svg_paths.replace('<!-- Found 96 departments -->', '').replace('<!-- Done -->', '').strip()

# Generate the full HTML
html_template = '''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Route des Vins de France - Carte Interactive</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Georgia', 'Playfair Display', serif;
            background: #FEFAE0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow: hidden;
            color: #5F6F52;
        }

        #map-container {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        #france-map {
            max-width: 90%;
            max-height: 90vh;
            cursor: default;
            filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
        }

        #france-map path {
            fill: #e0e0e0;
            stroke: #fff;
            stroke-width: 1.5;
            transition: all 0.3s ease;
        }

        #france-map path.wine-region {
            fill: #1C4220;
            cursor: pointer;
        }

        #france-map path.wine-region:hover {
            fill: #A9B388;
        }

        #info-panel {
            position: fixed;
            right: -450px;
            top: 0;
            width: 450px;
            height: 100vh;
            background: rgba(254, 250, 224, 0.98);
            box-shadow: -4px 0 30px rgba(95, 111, 82, 0.2);
            padding: 40px 30px;
            overflow-y: auto;
            transition: right 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            backdrop-filter: blur(10px);
        }

        #info-panel.visible {
            right: 0;
        }

        #info-panel h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2.2em;
            color: #5F6F52;
            margin-bottom: 20px;
            border-bottom: 3px solid #5F6F52;
            padding-bottom: 10px;
        }

        #info-panel h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.5em;
            color: #3D3305;
            margin-top: 25px;
            margin-bottom: 15px;
        }

        .btn {
            display: block;
            width: 100%;
            padding: 16px 22px;
            margin: 12px 0;
            background: #1C4220;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1.1em;
            font-family: 'Georgia', serif;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(92, 76, 7, 0.2);
        }

        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 16px rgba(95, 111, 82, 0.35);
            background: #A9B388;
        }

        .btn-secondary {
            background: linear-gradient(135deg, #666 0%, #444 100%);
            margin-top: 30px;
        }

        .btn-secondary:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            background: linear-gradient(135deg, #777 0%, #555 100%);
        }

        .wine-details {
            background: rgba(255, 255, 255, 0.7);
            padding: 22px;
            border-radius: 12px;
            margin-top: 20px;
            border-left: 5px solid #1C4220;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .wine-details p {
            margin: 12px 0;
            line-height: 1.7;
            color: #444;
            font-size: 1.05em;
        }

        .wine-details strong {
            color: #5F6F52;
            font-weight: 600;
        }

        .breadcrumb {
            font-size: 0.95em;
            color: #888;
            margin-bottom: 20px;
            font-style: italic;
        }

        #info-panel::-webkit-scrollbar {
            width: 10px;
        }

        #info-panel::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
        }

        #info-panel::-webkit-scrollbar-thumb {
            background: #5F6F52;
            border-radius: 10px;
        }

        #info-panel::-webkit-scrollbar-thumb:hover {
            background: #1C4220;
        }

        #title-overlay {
            position: fixed;
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(95, 111, 82, 0.95);
            color: white;
            padding: 25px 50px;
            border-radius: 15px;
            font-size: 2.2em;
            font-family: 'Playfair Display', serif;
            box-shadow: 0 6px 30px rgba(95, 111, 82, 0.4);
            z-index: 100;
            transition: opacity 0.5s ease;
            backdrop-filter: blur(10px);
        }

        #title-overlay.hidden {
            opacity: 0;
            pointer-events: none;
        }

        .subtitle {
            font-size: 0.45em;
            margin-top: 8px;
            opacity: 0.9;
            font-style: italic;
            font-weight: normal;
            font-family: 'Georgia', serif;
        }
    </style>
</head>
<body>
    <div id="title-overlay">
        Route des Vins de France
        <div class="subtitle">Cliquez sur une région viticole</div>
    </div>
    
    <div id="map-container">
        <svg id="france-map" viewBox="105 18 568 567" preserveAspectRatio="xMidYMid meet">
''' + svg_paths + '''
        </svg>
    </div>

    <aside id="info-panel">
        <div id="panel-content"></div>
    </aside>

    <script>
        const WINE_DATA = {
            '33': {
                name: 'Gironde - Région Bordelaise',
                domaines: [
                    {
                        name: 'Château Margaux',
                        wines: [
                            { name: 'Margaux Grand Cru', vintage: '2018', description: 'Un vin d\\'exception issu des meilleurs terroirs de Margaux. Notes de cassis, de violette et de cèdre avec une structure tannique élégante.', price: '€€€€' },
                            { name: 'Pavillon Rouge', vintage: '2019', description: 'Le second vin du château, tout aussi remarquable. Fruité intense, épices douces et finale persistante.', price: '€€€' }
                        ]
                    },
                    {
                        name: 'Château Pétrus',
                        wines: [{ name: 'Pétrus Pomerol', vintage: '2015', description: 'L\\'une des plus grandes appellations de Pomerol. Richesse aromatique exceptionnelle avec des notes de fruits noirs, truffe et épices.', price: '€€€€€' }]
                    },
                    {
                        name: 'Château d\\'Yquem',
                        wines: [{ name: 'Sauternes', vintage: '2017', description: 'Le roi des vins liquoreux. Arômes d\\'abricot confit, miel d\\'acacia et notes de safran. Équilibre parfait entre sucre et acidité.', price: '€€€€' }]
                    }
                ]
            },
            '39': {
                name: 'Jura - Vignobles du Jura',
                domaines: [
                    {
                        name: 'Domaine de la Pinte',
                        wines: [
                            { name: 'Vin Jaune', vintage: '2012', description: 'Le trésor du Jura, élevé sous voile durant 6 ans et 3 mois. Arômes de noix, curry, épices et une longueur infinie en bouche.', price: '€€€' },
                            { name: 'Arbois Trousseau', vintage: '2020', description: 'Cépage autochtone du Jura. Vin rouge délicat aux notes de fruits rouges et d\\'épices fines.', price: '€€' }
                        ]
                    },
                    {
                        name: 'Château-Chalon',
                        wines: [{ name: 'Château-Chalon AOC', vintage: '2011', description: 'L\\'appellation reine du Vin Jaune. Complexité aromatique unique avec des notes de curry, noix fraîche et fruits secs.', price: '€€€€' }]
                    },
                    {
                        name: 'Domaine Tissot',
                        wines: [{ name: 'Crément du Jura', vintage: '2019', description: 'Effervescent élégant élaboré selon la méthode traditionnelle. Bulles fines, fraîcheur et notes de fleurs blanches.', price: '€€' }]
                    }
                ]
            },
            '49': {
                name: 'Maine-et-Loire - Vallée de la Loire',
                domaines: [
                    {
                        name: 'Domaine des Baumard',
                        wines: [
                            { name: 'Coteaux du Layon', vintage: '2018', description: 'Vin moelleux issu de Chenin Blanc. Arômes de coing, miel et fleurs d\\'acacia. Équilibre parfait entre douceur et fraîcheur.', price: '€€' },
                            { name: 'Savennières', vintage: '2019', description: 'Vin blanc sec minéral et puissant. Notes d\\'agrumes, pierre à fusil et une belle tension.', price: '€€€' }
                        ]
                    },
                    {
                        name: 'Château de Fesles',
                        wines: [{ name: 'Bonnezeaux', vintage: '2016', description: 'Grand cru de la Vallée de la Loire. Chenin Blanc botrytisé aux arômes de fruits exotiques et d\\'épices douces.', price: '€€€' }]
                    },
                    {
                        name: 'Domaine Guiberteau',
                        wines: [{ name: 'Saumur-Champigny', vintage: '2020', description: 'Vin rouge élégant à base de Cabernet Franc. Fruits rouges croquants, poivre et une belle fraîcheur.', price: '€€' }]
                    }
                ]
            }
        };

        let currentRegion = null;
        let currentView = 'map';
        let currentDomaine = null;
        let currentWine = null;
        let initialViewBox = null;

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animateViewBox(startViewBox, targetViewBox, duration = 800) {
            const startTime = performance.now();
            const svg = document.getElementById('france-map');

            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeInOutCubic(progress);

                const currentVB = [
                    startViewBox[0] + (targetViewBox[0] - startViewBox[0]) * easedProgress,
                    startViewBox[1] + (targetViewBox[1] - startViewBox[1]) * easedProgress,
                    startViewBox[2] + (targetViewBox[2] - startViewBox[2]) * easedProgress,
                    startViewBox[3] + (targetViewBox[3] - startViewBox[3]) * easedProgress
                ];

                svg.setAttribute('viewBox', currentVB.join(' '));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }

            requestAnimationFrame(animate);
        }

        function calculateTargetViewBox(element) {
            const svg = document.getElementById('france-map');
            const bbox = element.getBBox();
            
            const padding = 0.2;
            const paddingX = bbox.width * padding;
            const paddingY = bbox.height * padding;
            
            const targetX = bbox.x - paddingX;
            const targetY = bbox.y - paddingY;
            const targetWidth = bbox.width + (paddingX * 2);
            const targetHeight = bbox.height + (paddingY * 2);
            
            const containerWidth = svg.clientWidth;
            const containerHeight = svg.clientHeight;
            const containerRatio = containerWidth / containerHeight;
            const targetRatio = targetWidth / targetHeight;
            
            let finalWidth = targetWidth;
            let finalHeight = targetHeight;
            let finalX = targetX;
            let finalY = targetY;
            
            if (targetRatio > containerRatio) {
                finalHeight = finalWidth / containerRatio;
                finalY = targetY - (finalHeight - targetHeight) / 2;
            } else {
                finalWidth = finalHeight * containerRatio;
                finalX = targetX - (finalWidth - targetWidth) / 2;
            }
            
            return [finalX, finalY, finalWidth, finalHeight];
        }

        function showPanel() {
            document.getElementById('info-panel').classList.add('visible');
            document.getElementById('title-overlay').classList.add('hidden');
        }

        function hidePanel() {
            document.getElementById('info-panel').classList.remove('visible');
            document.getElementById('title-overlay').classList.remove('hidden');
        }

        function showRegionView(regionId) {
            const region = WINE_DATA[regionId];
            if (!region) return;

            currentRegion = regionId;
            currentView = 'region';
            
            const content = document.getElementById('panel-content');
            content.innerHTML = `
                <h2>${region.name}</h2>
                <p class="breadcrumb">Sélectionnez un domaine viticole</p>
                <div id="domaines-list">
                    ${region.domaines.map((domaine, index) => `
                        <button class="btn" onclick="showDomaineView(${index})">
                            ${domaine.name}
                        </button>
                    `).join('')}
                </div>
                <button class="btn btn-secondary" onclick="returnToMap()">
                    ← Retour à la Carte de France
                </button>
            `;
            
            showPanel();
        }

        function showDomaineView(domaineIndex) {
            const region = WINE_DATA[currentRegion];
            const domaine = region.domaines[domaineIndex];
            currentDomaine = domaineIndex;
            currentView = 'domaine';
            
            const content = document.getElementById('panel-content');
            content.innerHTML = `
                <h2>${domaine.name}</h2>
                <p class="breadcrumb">${region.name} > ${domaine.name}</p>
                <h3>Nos Vins</h3>
                <div id="wines-list">
                    ${domaine.wines.map((wine, index) => `
                        <button class="btn" onclick="showWineView(${index})">
                            ${wine.name} (${wine.vintage})
                        </button>
                    `).join('')}
                </div>
                <button class="btn btn-secondary" onclick="returnToRegion()">
                    ← Retour aux Domaines
                </button>
            `;
        }

        function showWineView(wineIndex) {
            const region = WINE_DATA[currentRegion];
            const domaine = region.domaines[currentDomaine];
            const wine = domaine.wines[wineIndex];
            currentWine = wineIndex;
            currentView = 'wine';
            
            const content = document.getElementById('panel-content');
            content.innerHTML = `
                <h2>${wine.name}</h2>
                <p class="breadcrumb">${region.name} > ${domaine.name} > ${wine.name}</p>
                <div class="wine-details">
                    <p><strong>Millésime :</strong> ${wine.vintage}</p>
                    <p><strong>Tarif :</strong> ${wine.price}</p>
                    <p><strong>Description :</strong></p>
                    <p>${wine.description}</p>
                </div>
                <button class="btn btn-secondary" onclick="returnToDomaine()">
                    ← Retour aux Vins
                </button>
            `;
        }

        function returnToMap() {
            const svg = document.getElementById('france-map');
            const currentVB = svg.getAttribute('viewBox').split(' ').map(Number);
            animateViewBox(currentVB, initialViewBox);
            hidePanel();
            currentRegion = null;
            currentView = 'map';
        }

        function returnToRegion() {
            showRegionView(currentRegion);
        }

        function returnToDomaine() {
            showDomaineView(currentDomaine);
        }

        function handleMapClick(event) {
            const target = event.target;
            
            if (target.tagName === 'path') {
                const deptNum = target.getAttribute('data-numerodepartement');
                
                if (WINE_DATA[deptNum]) {
                    const svg = document.getElementById('france-map');
                    if (!initialViewBox) {
                        initialViewBox = svg.getAttribute('viewBox').split(' ').map(Number);
                    }
                    
                    const currentVB = svg.getAttribute('viewBox').split(' ').map(Number);
                    const targetVB = calculateTargetViewBox(target);
                    animateViewBox(currentVB, targetVB);
                    
                    setTimeout(() => {
                        showRegionView(deptNum);
                    }, 400);
                }
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            const svg = document.getElementById('france-map');
            svg.addEventListener('click', handleMapClick);
        });
    </script>
</body>
</html>'''

# Write final HTML
with open('../website/index.html', 'w', encoding='utf-8') as f:
    f.write(html_template)

print("✅ index.html créé avec succès!")
print("✅ 96 départements français intégrés")
print("✅ Régions viticoles (33, 39, 49) marquées en vert anglais")
