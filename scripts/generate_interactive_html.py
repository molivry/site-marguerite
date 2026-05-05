import re

# Read the paths
with open('paths_output.txt', 'r', encoding='utf-16le') as f:
    svg_paths = f.read()

# Clean up 
svg_paths = svg_paths.replace('<!-- Found 96 departments -->', '').replace('<!-- Done -->', '').strip()

def remove_idf_zoom(svg_content):
    """
    Parses the SVG content line by line.
    Only removes subpaths for Île-de-France departments (75, 77, 78, 91, 92, 93, 94, 95)
    if they are located in the zoom inset area (top-right).
    """
    idf_depts = ['75', '77', '78', '91', '92', '93', '94', '95']
    
    new_lines = []
    
    # Process each line (each path)
    for line in svg_content.split('\n'):
        # Check if this line is a path for an IDF department
        dept_match = re.search(r'data-numerodepartement="([^"]+)"', line)
        if dept_match and dept_match.group(1) in idf_depts:
            # This is an IDF department, apply the zoom removal logic
            
            def process_d(match):
                d_attr = match.group(1)
                segments = re.split(r'(z|Z)', d_attr)
                new_d_parts = []
                current_x, current_y = 0, 0
                
                i = 0
                while i < len(segments) - 1:
                    segment = segments[i]
                    closer = segments[i+1]
                    
                    # Regex to find move command with optional separators
                    move_match = re.search(r'^\s*([mM])\s*(-?[\d\.]+)[,\s]*(-?[\d\.]+)', segment)
                    
                    if move_match:
                        cmd, x_str, y_str = move_match.groups()
                        x, y = float(x_str), float(y_str)
                        
                        start_x, start_y = 0, 0
                        if cmd == 'M':
                            start_x, start_y = x, y
                        else:
                            start_x = current_x + x
                            start_y = current_y + y
                        
                        # Check if in Zoom area (Top-Right)
                        if start_x > 550 and start_y < 150:
                            # Remove this segment (Zoom Inset)
                            pass
                        else:
                            # Keep this segment (Main Map)
                            # Reconstruct with absolute M to be safe
                            rest_of_segment = segment[move_match.end():]
                            new_segment = f'M {start_x:.4f} {start_y:.4f}{rest_of_segment}'
                            new_d_parts.append(new_segment + closer)
                        
                        current_x, current_y = start_x, start_y
                    else:
                        if segment.strip():
                            new_d_parts.append(segment + closer)
                    
                    i += 2
                
                return f'd="{"".join(new_d_parts)}"'

            # Apply the processing to the d attribute of this line
            new_line = re.sub(r'd="([^"]+)"', process_d, line)
            new_lines.append(new_line)
        else:
            # Not an IDF department (e.g. Bas-Rhin), keep exactly as is
            new_lines.append(line)
            
    return '\n'.join(new_lines)

# Apply the zoom removal
svg_paths = remove_idf_zoom(svg_paths)

# Generate the full HTML
html_template = '''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Route des Vins Marguerite - Carte Interactive</title>
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
            stroke: #5F6F52;
            stroke-width: 0.5;
            transition: all 0.3s ease;
        }

        #france-map path.wine-region {
            fill: #1C4220;
            cursor: pointer;
        }

        #france-map path.wine-region:hover {
            fill: #A9B388;
            transform: scale(1.02);
            transform-origin: center;
            filter: drop-shadow(0 0 10px rgba(95, 111, 82, 0.6));
            z-index: 10;
        }

        #france-map path.wine-region.active {
            fill: #A9B388;
            filter: drop-shadow(0 0 15px rgba(95, 111, 82, 0.8));
            transform: scale(1.02);
            stroke: #fff;
            stroke-width: 1;
            cursor: default;
        }

        /* Floating Card Style for Info Panel */
        #info-panel {
            position: fixed;
            top: 100px;
            right: 50px;
            width: 380px;
            max-height: 80vh;
            background: rgba(254, 250, 224, 0.9);
            box-shadow: 0 8px 32px rgba(95, 111, 82, 0.2);
            padding: 30px;
            border-radius: 20px;
            overflow-y: auto;
            transform: translateX(120%);
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.4);
        }

        #info-panel.visible {
            transform: translateX(0);
        }

        #info-panel h2 {
            font-family: 'Playfair Display', serif;
            font-size: 1.8em;
            color: #5F6F52;
            margin-bottom: 15px;
            border-bottom: 2px solid #5F6F52;
            padding-bottom: 8px;
        }

        #info-panel h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.3em;
            color: #5F6F52;
            margin-top: 20px;
            margin-bottom: 12px;
        }

        /* Domain List Item as Card */
        .domain-card {
            display: flex;
            align-items: center;
            background: white;
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            border: 1px solid rgba(11, 110, 79, 0.1);
        }

        .domain-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(95, 111, 82, 0.15);
            border-color: #1C4220;
        }

        .domain-logo {
            width: 40px;
            height: 40px;
            object-fit: contain;
            margin-right: 15px;
            border-radius: 50%;
            background: #f8f8f8;
            padding: 5px;
        }

        .domain-info {
            flex: 1;
        }

        .domain-name {
            font-family: 'Playfair Display', serif;
            font-weight: bold;
            color: #333;
            font-size: 1.1em;
        }

        .domain-sub {
            font-size: 0.8em;
            color: #666;
            margin-top: 2px;
        }

        .btn {
            display: block;
            width: 100%;
            padding: 12px 20px;
            margin: 10px 0;
            background: #1C4220;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1em;
            font-family: 'Georgia', serif;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(92, 76, 7, 0.2);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(95, 111, 82, 0.3);
            background: #A9B388;
        }

        .btn-secondary {
            background: linear-gradient(135deg, #666 0%, #444 100%);
            margin-top: 20px;
            font-size: 0.9em;
            padding: 10px 16px;
        }

        .btn-secondary:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
            background: linear-gradient(135deg, #777 0%, #555 100%);
        }

        .wine-details {
            background: rgba(255, 255, 255, 0.6);
            padding: 15px;
            border-radius: 10px;
            margin-top: 15px;
            border-left: 4px solid #1C4220;
        }

        .wine-details p {
            margin: 8px 0;
            line-height: 1.6;
            color: #444;
            font-size: 0.95em;
            font-family: 'Georgia', serif;
        }

        .wine-details strong {
            color: #5F6F52;
            font-weight: 600;
        }

        .breadcrumb {
            font-size: 0.85em;
            color: #888;
            margin-bottom: 15px;
            font-style: italic;
        }

        #info-panel::-webkit-scrollbar {
            width: 6px;
        }

        #info-panel::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 3px;
        }

        #info-panel::-webkit-scrollbar-thumb {
            background: #5F6F52;
            border-radius: 3px;
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
            text-align: center;
        }

        #title-overlay.hidden {
            opacity: 0;
            pointer-events: none;
        }

        .hidden {
            display: none !important;
        }

        .subtitle {
            font-size: 0.45em;
            margin-top: 8px;
            opacity: 0.9;
            font-style: italic;
            font-weight: normal;
            font-family: 'Georgia', serif;
        }

        #back-button {
            position: fixed;
            top: 30px;
            left: 30px;
            z-index: 100;
            width: auto;
            min-width: 200px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        /* Marker SVG Style */
        .marker-group {
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .marker-group:hover {
            filter: url(#hover-shadow);
        }
        
        .marker-group:hover rect {
            stroke: #5F6F52;
            stroke-width: 0.2;
        }
        
        .marker-group:hover text {
            fill: #5F6F52;
        }

        .marker-text {
            font-family: 'Playfair Display', serif;
            font-weight: bold;
            fill: #333;
            pointer-events: none; /* Click on group/rect handles it */
        }
    </style>
</head>
<body>
    <div id="title-overlay">
        Route des Vins Marguerite
        <div class="subtitle">Cliquez sur une région viticole</div>
    </div>

    <button id="back-button" class="btn btn-secondary hidden" onclick="returnToMap()">
        ← Retour à la carte
    </button>
    
    <div id="map-container">
        <svg id="france-map" viewBox="105 18 568 567" preserveAspectRatio="xMidYMid meet">
            <defs>
                <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="0.5"/>
                    <feOffset dx="0" dy="0.5" result="offsetblur"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <filter id="hover-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
                    <feOffset dx="0" dy="1" result="offsetblur"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.5"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
''' + svg_paths + '''
            <g id="markers-container"></g>
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
                        x: 235, y: 400,
                        wines: [
                            { name: 'Margaux Grand Cru', vintage: '2018', description: 'Un vin d\\'exception issu des meilleurs terroirs de Margaux. Notes de cassis, de violette et de cèdre avec une structure tannique élégante.', price: '€€€€' },
                            { name: 'Pavillon Rouge', vintage: '2019', description: 'Le second vin du château, tout aussi remarquable. Fruité intense, épices douces et finale persistante.', price: '€€€' }
                        ]
                    },
                    {
                        name: 'Château Pétrus',
                        x: 265, y: 410,
                        wines: [{ name: 'Pétrus Pomerol', vintage: '2015', description: 'L\\'une des plus grandes appellations de Pomerol. Richesse aromatique exceptionnelle avec des notes de fruits noirs, truffe et épices.', price: '€€€€€' }]
                    },
                    {
                        name: 'Château d\\'Yquem',
                        x: 245, y: 420,
                        wines: [{ name: 'Sauternes', vintage: '2017', description: 'Le roi des vins liquoreux. Arômes d\\'abricot confit, miel d\\'acacia et notes de safran. Équilibre parfait entre sucre et acidité.', price: '€€€€' }]
                    }
                ]
            },
            '39': {
                name: 'Jura - Vignobles du Jura',
                domaines: [
                    {
                        name: 'Domaine de la Pinte',
                        x: 555, y: 295,
                        wines: [
                            { name: 'Vin Jaune', vintage: '2012', description: 'Le trésor du Jura, élevé sous voile durant 6 ans et 3 mois. Arômes de noix, curry, épices et une longueur infinie en bouche.', price: '€€€' },
                            { name: 'Arbois Trousseau', vintage: '2020', description: 'Cépage autochtone du Jura. Vin rouge délicat aux notes de fruits rouges et d\\'épices fines.', price: '€€' }
                        ]
                    },
                    {
                        name: 'Château-Chalon',
                        x: 550, y: 305,
                        wines: [{ name: 'Château-Chalon AOC', vintage: '2011', description: 'L\\'appellation reine du Vin Jaune. Complexité aromatique unique avec des notes de curry, noix fraîche et fruits secs.', price: '€€€€' }]
                    },
                    {
                        name: 'Domaine Tissot',
                        x: 565, y: 315,
                        wines: [{ name: 'Crément du Jura', vintage: '2019', description: 'Effervescent élégant élaboré selon la méthode traditionnelle. Bulles fines, fraîcheur et notes de fleurs blanches.', price: '€€' }]
                    }
                ]
            },
            '49': {
                name: 'Maine-et-Loire - Vallée de la Loire',
                domaines: [
                    {
                        name: 'Domaine des Baumard',
                        x: 260, y: 255,
                        wines: [
                            { name: 'Coteaux du Layon', vintage: '2018', description: 'Vin moelleux issu de Chenin Blanc. Arômes de coing, miel et fleurs d\\'acacia. Équilibre parfait entre douceur et fraîcheur.', price: '€€' },
                            { name: 'Savennières', vintage: '2019', description: 'Vin blanc sec minéral et puissant. Notes d\\'agrumes, pierre à fusil et une belle tension.', price: '€€€' }
                        ]
                    },
                    {
                        name: 'Château de Fesles',
                        x: 275, y: 275,
                        wines: [{ name: 'Bonnezeaux', vintage: '2016', description: 'Grand cru de la Vallée de la Loire. Chenin Blanc botrytisé aux arômes de fruits exotiques et d\\'épices douces.', price: '€€€' }]
                    },
                    {
                        name: 'Domaine Guiberteau',
                        x: 265, y: 265,
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
                        <div class="domain-card" onclick="showDomaineView(${index})">
                            <img src="logo%20vignoble.png" alt="Logo" class="domain-logo">
                            <div class="domain-info">
                                <div class="domain-name">${domaine.name}</div>
                                <div class="domain-sub">Voir les vins</div>
                            </div>
                        </div>
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
                        <div class="domain-card" onclick="showWineView(${index})">
                            <img src="logo%20vignoble.png" alt="Vin" class="domain-logo">
                            <div class="domain-info">
                                <div class="domain-name">${wine.name}</div>
                                <div class="domain-sub">${wine.vintage}</div>
                            </div>
                        </div>
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
            // Remove active class from region
            const activeRegion = document.querySelector('.wine-region.active');
            if (activeRegion) {
                activeRegion.classList.remove('active');
            }
            
            // Hide back button
            document.getElementById('back-button').classList.add('hidden');
            
            currentRegion = null;
            currentView = 'map';
            clearMarkers();
        }

        function clearMarkers() {
            const container = document.getElementById('markers-container');
            if (container) {
                container.innerHTML = '';
            }
        }

        function showVineyardMarkers(deptNum) {
            const region = WINE_DATA[deptNum];
            if (!region || !region.domaines) return;

            clearMarkers();
            
            // Show back button
            document.getElementById('back-button').classList.remove('hidden');

            const svg = document.getElementById('france-map');
            
            region.domaines.forEach((domaine, index) => {
                if (domaine.x && domaine.y) {
                    // Create SVG Group
                    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    g.setAttribute("class", "marker-group");
                    g.setAttribute("filter", "url(#drop-shadow)");
                    
                    // Estimate width based on name length (approx 0.7 units per char + padding)
                    // Base width for logo (3) + padding (1)
                    // Estimate width based on name length (approx 0.7 units per char + padding)
                    // Base width for logo (3) + padding (1)
                    const charWidth = 1.1;
                    const baseWidth = 8; 
                    const textWidth = domaine.name.length * charWidth;
                    const totalWidth = baseWidth + textWidth;
                    const height = 5.5;
                    
                    // Center the group on the coordinate
                    // We want the coordinate to be roughly at the bottom center or center
                    // Let's position it slightly above the point
                    const x = domaine.x - (totalWidth / 2);
                    const y = domaine.y - (height / 2);
                    
                    // Background Rect (Pill)
                    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    rect.setAttribute("x", x);
                    rect.setAttribute("y", y);
                    rect.setAttribute("width", totalWidth);
                    rect.setAttribute("height", height);
                    rect.setAttribute("rx", height / 2);
                    rect.setAttribute("ry", height / 2);
                    rect.setAttribute("fill", "white");
                    
                    // Logo Image
                    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
                    image.setAttribute("href", "logo%20vignoble.png");
                    image.setAttribute("x", x + 0.8);
                    image.setAttribute("y", y + 0.8);
                    image.setAttribute("width", height - 1.6);
                    image.setAttribute("height", height - 1.6);
                    
                    // Text
                    // Text
                    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    text.setAttribute("x", x + height); // Start after logo
                    text.setAttribute("y", y + (height / 2) + 0.6); // Vertically centered (reverted to original)
                    text.setAttribute("class", "marker-text");
                    text.setAttribute("font-size", "2.0"); // Scaled for map view
                    text.textContent = domaine.name;
                    
                    // Click Event
                    g.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleMarkerClick(deptNum, index);
                    });
                    
                    g.appendChild(rect);
                    g.appendChild(image);
                    g.appendChild(text);
                    const container = document.getElementById('markers-container');
                    container.appendChild(g);
                }
            });
        }

        function handleMarkerClick(deptNum, domaineIndex) {
            currentRegion = deptNum;
            showDomaineView(domaineIndex);
            showPanel();
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
                    
                    // Move to top (z-index fix) but keep below markers
                    const markersContainer = document.getElementById('markers-container');
                    svg.insertBefore(target, markersContainer);
                    
                    // Add active class
                    target.classList.add('active');
                    
                    // Update state
                    currentView = 'region';
                    currentRegion = deptNum;

                    if (!initialViewBox) {
                        initialViewBox = svg.getAttribute('viewBox').split(' ').map(Number);
                    }
                    
                    const currentVB = svg.getAttribute('viewBox').split(' ').map(Number);
                    const targetVB = calculateTargetViewBox(target);
                    animateViewBox(currentVB, targetVB);
                    
                    setTimeout(() => {
                        showVineyardMarkers(deptNum);
                    }, 400);
                }
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            const svg = document.getElementById('france-map');
            svg.addEventListener('click', handleMapClick);
            
            // Add hover effect to move to top (z-index fix)
            const regions = document.querySelectorAll('.wine-region');
            regions.forEach(region => {
                region.addEventListener('mouseenter', function() {
                    // Move to end of SVG (but before markers) to render on top
                    const markersContainer = document.getElementById('markers-container');
                    this.parentNode.insertBefore(this, markersContainer);
                });
            });
            
            // Add ESC key listener
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    if (currentView !== 'map') {
                        returnToMap();
                    }
                }
            });
        });
    </script>
</body>
</html>'''

# Write final HTML
with open('../website/index.html', 'w', encoding='utf-8') as f:
    f.write(html_template)

print("index.html created successfully!")
