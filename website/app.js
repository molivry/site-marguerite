const WINE_DATA = {
    '33': {
        name: 'Gironde - Région Bordelaise',
        domaines: [
            {
                name: 'Château Margaux',
                x: 235, y: 400,
                wines: [
                    { name: 'Margaux Grand Cru', vintage: '2018', description: 'Un vin d\'exception issu des meilleurs terroirs de Margaux. Notes de cassis, de violette et de cèdre avec une structure tannique élégante.', price: '€€€€' },
                    { name: 'Pavillon Rouge', vintage: '2019', description: 'Le second vin du château, tout aussi remarquable. Fruité intense, épices douces et finale persistante.', price: '€€€' }
                ]
            },
            {
                name: 'Château Pétrus',
                x: 265, y: 410,
                wines: [{ name: 'Pétrus Pomerol', vintage: '2015', description: 'L\'une des plus grandes appellations de Pomerol. Richesse aromatique exceptionnelle avec des notes de fruits noirs, truffe et épices.', price: '€€€€€' }]
            },
            {
                name: 'Château d\'Yquem',
                x: 245, y: 420,
                wines: [{ name: 'Sauternes', vintage: '2017', description: 'Le roi des vins liquoreux. Arômes d\'abricot confit, miel d\'acacia et notes de safran. Équilibre parfait entre sucre et acidité.', price: '€€€€' }]
            }
        ]
    },
    '39': {
        name: 'Jura - Vignobles du Jura',
        domaines: [
            {
                name: "Domaine Stéphane & Bénédicte Tissot",
                x: 565, y: 315,
                location_details: "À Montigny-lès-Arsures - 50 hectares - Bio & Biodynamie",
                description: "Référence absolue du Jura, entrer chez Tissot, c'est entrer dans un laboratoire d'excellence. Connu pour son travail parcellaire d'orfèvre, il produit une gamme immense de vins alliant précision, puissance et créativité.",
                wines: [
                    {
                        category: "Les Bulles",
                        items: [
                            {
                                name: "Crémant Indigène (AOC Crémant du Jura)",
                                description: "50% Chardonnay, 50% Pinot Noir (avec une touche de Poulsard et Trousseau). La particularité ? La prise de mousse se fait avec les levures naturelles du raisin (levain indigène) et du jus de raisin congelé. C'est vif, complexe, fruité. Une vraie réussite."
                            },
                            {
                                name: "Crémant Blanc de Noirs 2021/2022 (AOC Crémant du Jura)",
                                description: "Une cuvée de caractère née sur des terroirs argileux en altitude. C’est un effervescent vineux et structuré, marqué par de \"beaux amers\" nobles en finale."
                            },
                            {
                                name: "BBF (Blanc de Blancs élevé en Fût) (AOC Crémant du Jura)",
                                description: "C'est immense. Une fermentation spontanée, un élevage en fûts comme un grand Bourgogne. C'est floral, ample, complexe, avec cette amertume noble qui signe les grands terroirs. Plus \"Jura\" et plus doux que la version au levain champenois qui paraît plus stricte."
                            }
                        ]
                    },
                    {
                        category: "Les Blancs",
                        items: [
                            {
                                name: "Sursis 2022 (AOC Arbois blanc)",
                                description: "Ce Chardonnay ouillé est planté sur le terroir mythique de Château-Chalon (habituellement réservé au Vin Jaune et au savagnin). Élevé 2 ans en tonneau, il offre la puissance du terroir mais avec la fraîcheur du fruit."
                            },
                            {
                                name: "La Tour de Curon 2022 (AOC Arbois blanc)",
                                description: "Une parcelle légendaire sur calcaire du Bajocien. Il y a tout : la tension, l'acidité tranchante, le fruit, le floral et une minéralité dingue. Un monstre d'élégance (3 ans d'élevage tout de même)."
                            },
                            {
                                name: "Patchwork 2024 (AOC Arbois blanc)",
                                description: "Son nom résume tout : c’est une mosaïque des terroirs du domaine. Stéphane Tissot assemble ici 60% de sols calcaires (qui apportent la structure) et 40% de sols argileux (qui donnent le gras). Après un an d'élevage, le résultat est un modèle d'équilibre. En bouche, le vin offre une ampleur généreuse, présente mais jamais lourde."
                            },
                            {
                                name: "Les Graviers 2023 (AOC Arbois blanc)",
                                description: "Sur ce terroir purement calcaire, on pourrait s'attendre à une austérité tranchante, mais le millésime 2023 en a décidé autrement. Le vin se révèle étonnamment ouvert et généreux dès l'ouverture. On est séduit par une rondeur solaire et des notes gourmandes de miel qui tapissent le palais."
                            },
                            {
                                name: "En Barberon 2023 (AOC Arbois blanc)",
                                description: "Si l'argile est souvent synonyme de puissance, elle garde ici l'eau et la fraîcheur du sol. Le résultat est un vin marqué par une tension vibrante et une fraîcheur éclatante qui tranche avec le profil des Graviers. C’est droit, ciselé et terriblement énergique. Un vrai coup de cœur pour cette pureté minérale."
                            },
                            {
                                name: "Les Bruyères 2023 (AOC Arbois blanc)",
                                description: "Né sur les argiles du Trias, ce vin s'impose par son caractère affirmé. C'est un Chardonnay \"large\" et généreux, qui déploie une aromatique puissante marquée par des notes épicées et un côté presque rustique (dans le bon sens du terme). Un vin de matière et de caractère."
                            },
                            {
                                name: "La Mailloche 2023 (AOC Arbois blanc)",
                                description: "Sur les argiles compactes du Lias, on change de registre pour aller vers la verticalité. Ce Chardonnay est un bloc de matière : dense, serré, il offre une sensation tactile saisissante, au point de paraître \"presque tannique\" en finale. C'est un vin blanc taillée pour la table et la garde."
                            },
                            {
                                name: "La Mailloche 2005 (AOC Arbois blanc)",
                                description: "Ce vin, issu de très vieilles vignes sur argile, nous emmène ailleurs. Le nez est d'une complexité folle, marqué par des notes de soja et de céréales, typiques de la réduction noble des grands Tissot vieillis. En bouche, malgré l'âge, il garde une énergie incroyable : on retrouve de l'agrume, une belle astringence qui tient le vin, des amers racés et cette finale saline indélébile. Un monument."
                            },
                            {
                                name: "La Tour de Curon 2006 (AOC Arbois blanc)",
                                description: "À l'époque, les vignes n'étaient que des \"bébés\" (plantées en 2002), mais le terroir calcaire parlait déjà. Comparé à la densité de La Mailloche, ce Curon joue la carte de la lumière. Il se distingue par un profil plus frais, porté par une grande pureté. On retient surtout cette trame construite sur de beaux amers et une minéralité tranchante. Une preuve éclatante que le terroir sublime le cépage dès le plus jeune âge."
                            },
                            {
                                name: "Chardonnay Rose Massale 2024 (AOC Arbois blanc)",
                                description: "Attention, pépite ! Blanc issu d'une mutation rare : le Chardonnay à grains roses (sélection massale), il est planté majoritairement sur des argiles (60%). Au nez, c'est la signature des grands Tissot : une \"réduction\" noble qui explose sur des notes fumées, torréfiées et grillées. En bouche, cette puissance aromatique est canalisée par une trame saline incroyable."
                            },
                            {
                                name: "La Vie en Rose 2024 (AOC Arbois rosé)",
                                description: "Il s'agit d'une complantation (tous les cépages sont mélangés dans la vigne) de très vieilles variétés, souvent à peaux roses : Chardonnay Rose, Poulsard blanc/rose, Savagnin blanc/rose et le rarissime Béclan. Le profil est déroutant et génial : le nez s'ouvre sur une petite touche oxydative, tandis que la bouche est une décharge d'énergie. On y trouve une belle minéralité et une superbe amertume citronnée qui étire le vin en longueur."
                            },
                            {
                                name: "Vin Jaune En Spois 2018 (AOC Arbois Vin Jaune)",
                                description: "Issu d'un terroir de marnes du Trias (considéré comme un sol \"chaud\"), ce Vin Jaune se révèle puissant et épicé. Le nez est une plongée dans le Jura traditionnel avec des arômes de pruneau, de morille et de champignon de Paris. En bouche, on retrouve le bois sec et la noisette, signature d'un Vin Jaune solaire et généreux."
                            },
                            {
                                name: "Vin Jaune La Mailloche 2017 (AOC Arbois Vin Jaune)",
                                description: "Changement de décor radical. Sur les argiles compactes du Lias (qui retiennent l'eau), ce Vin Jaune est un monstre de tension. Olfactivement, c'est un bouquet intense dominé par la noix et le curry, complété par des notes complexes de fruits secs et de pomme cuite L'alliance entre l'alcool et l'acidité en fait un Vin Jaune \"immortel\", taillé pour traverser les décennies."
                            },
                            {
                                name: "Vin Jaune Les Bruyères (AOC Arbois Vin Jaune)",
                                description: "Issu également du Trias, sur ce terroir, le Vin Jaune s'exprime souvent avec une grande ampleur. Les versions à élevage prolongé (comme le 2011 élevé 12 ans sous voile en fût de chêne) développent un profil incroyablement onctueux, avec des notes gourmandes de caramel qui viennent enrober la puissance typique du Jaune."
                            },
                            {
                                name: "Vin Jaune La Vasée 2014 (AOC Arbois Vin Jaune)",
                                description: "Une cuvée rare née de vieilles vignes situées à la jonction du Bas Lias et du Haut Trias. Ce Vin Jaune se distingue par une acidité si dense qu'elle en devient presque tannique, miionérale et iodée en bouche, preuve de la concentration extrême des raisins."
                            },
                            {
                                name: "Vin Jaune Château-Chalon 2011 (AOC Château-Chalon)",
                                description: "L'appellation reine, le Graal du Vin Jaune. Sur ce grand millésime, le vin défie le temps avec une fraîcheur citronnée éblouissante. Loin de la lourdeur, c'est un Vin Jaune tout en tension et en élégance, qui vibre longtemps après la dernière gorgée."
                            }
                        ]
                    },
                    {
                        category: "Les Rouges",
                        items: [
                            {
                                name: "DD 2023/2024 (AOC Arbois rouge)",
                                description: "L'assemblage \"glouglou\" par excellence (Poulsard, Trousseau, Pinot). En 2023, c'est une bombe de fruit, gourmand avec du volume. En 2024 (plus froid), c’est plus végétal et sur la retenue."
                            },
                            {
                                name: "Pinot Noir Sous la Tour 2023 (AOC Arbois rouge)",
                                description: "Né sur un terroir calcaire, ce Pinot Noir joue la carte de l'aérien et de la gourmandise. Bien que vinifié en vendange entière durant 4 semaines, il surprend par son profil immédiatement accessible et très ouvert. Le résultat est bluffant : on a une sensation de fruit éclatant et juteux qui rappelle presque le style \"bonbon\" d'une macération carbonique. Un vin de plaisir pur."
                            },
                            {
                                name: "Pinot Noir En Barberon 2022 (AOC Arbois rouge)",
                                description: "Changement de décor avec ce terroir d'argile. Ici, le vin gagne en sérieux et en profondeur. C'est un Pinot plus ferme, charpenté par des tanins végétaux nobles qui apportent de la tenue. La palette aromatique est racée, dominée par des notes fumées et épicées typiques de ce sol. Un vin de caractère."
                            },
                            {
                                name: "Trousseau en Amphore 2024 (AOC Arbois rouge)",
                                description: "C’est la cuvée qui pousse le curseur de la gourmandise encore plus loin. Vinifié en amphore, ce Trousseau conserve le style \"infusion\" cher au domaine (peu d'extraction, couleur claire), mais gagne une texture inédite. L'amphore lui apporte une rondeur supplémentaire et surtout plus d'amplitude en bouche par rapport aux vinifications classiques."
                            },
                            {
                                name: "Trousseau Singulier 2024 (AOC Arbois rouge)",
                                description: "Né sur un terroir calcaire, ce Trousseau porte bien son nom : il offre une définition singulière et racée du cépage. Ici, on a la concentration du fruit mûr, mais sans aucune lourdeur, grâce à une vinification douce en infusion. Le nez est signé par une note typique et éclatante de poivre blanc, marqueur des grands Trousseaux. C'est un vin de structure, mais tout en finesse."
                            },
                            {
                                name: "Poulsard Vieilles Vignes 2023 (AOC Arbois rouge)",
                                description: "Stéphane Tissot prend ici le contrepied des standards du Poulsard avec une macération longue de 3 mois. Le vin gagne une matière incroyable. En bouche, c'est beaucoup plus ample et texturé que les Poulsards classiques. On quitte le registre du simple \"glouglou\" pour aller vers un vin rouge de gastronomie, profond et étoffé, tout en gardant la finesse du cépage."
                            },
                            {
                                name: "Poulsard Confidentiel 2024 (AOC Arbois rouge)",
                                description: "Une cuvée unique, véritable photographie du millésime, puisqu'elle rassemble tous les terroirs de Poulsard du domaine sur 2024. Vinifié avec une macération de 5 semaines (plus courte que le Vieilles Vignes, mais conséquente pour du Poulsard), il dévoile un profil différent. C'est un vin plus structuré, qui a du \"morgon\" et de la tenue. Il prouve que même ce cépage à la peau fine peut donner des vins avec un peu plus de caractère."
                            }
                        ]
                    }
                ]
            },
            {
                name: "Domaine Cellier Saint Benoit",
                x: 555, y: 295,
                location_details: "<i>À Pupillin</i> - 6,25 hectares - Bio & Biodynamie",
                description: "Situé dans la capitale du Ploussard, ce domaine de 6,25 hectares est une pépite montante du Jura. Repris par Benjamin Benoit, le vignoble est mené en bio avec une précision chirurgicale. Sa philosophie ? Une approche micro-parcellaire pour des vins qui misent tout sur l'élégance et la finesse.",
                images: ["images/Cellier1.webp", "images/Cellier2.webp"],
                wines: [
                    {
                        category: "Les Blancs",
                        items: [
                            {
                                name: "Courbes Raies 2023 (AOC Côtes du Jura blanc)",
                                description: "Une cuvée élevée en équilibre entre 12 mois de fûts et 6 en cuve inox. C'est un vin \"solaire\", qui assume sa rondeur et son côté très fruité et gourmand. Mais la signature du terroir est là : une trame saline et minérale vient tendre le tout pour éviter toute lourdeur."
                            },
                            {
                                name: "Les Chariots 2023 (AOC Côtes du Jura blanc)",
                                description: "Changement d'ambiance. Ici, le nez s'ouvre sur une petite touche oxydative (typique du Jura) qui apporte de la complexité. En bouche : C'est un vin \"très tranchant\", d'une minéralité redoutable. L'élevage en bois lui apporte un côté beurré et des notes de fleurs blanches qui viennent habiller cette colonne vertébrale acide."
                            },
                            {
                                name: "La Marcette 2023 (AOC Côtes du Jura blanc)",
                                description: "Issue de vignes de chardonnay de 70 ans plantées sur des marnes triasiques, cette cuvée puise toute l’essence du sol pour en concentrer la matière. Le résultat : un vin franchement gourmand, porté par un fruit éclatant. Le nez mêle miel, coing et fleurs blanches. La bouche, ample et généreuse, garde une belle tension grâce à une acidité sous-jacente. L’élevage de neuf mois en fûts anciens vient parfaire l’équilibre sans marquer le vin."
                            }
                        ]
                    },
                    {
                        category: "Les Rouges",
                        items: [
                            {
                                name: "Chambines 2023 (AOC Côtes du Jura rouge)",
                                description: "Sa robe intrigue par sa couleur \"rouge ambré\", presque liquoreuse. Fruit d'une macération douce de 16 jours, avec égrappage manuel, ce vin présente un faible degré d'alcool, titrant seulement 10,5%. En bouche, il surprend par son extrême légèreté et ses arômes de petits fruits rouges. C'est un vin conçu comme une infusion toute en délicatesse."
                            },
                            {
                                name: "Côte de Feule 2023 (AOC Côtes du Jura rouge)",
                                description: "Ce vin est issu de vignes plantées sur les célèbres marnes noires du Trias, bénéficiant d'une exposition privilégiée plein Sud. Sa robe arbore une couleur très fauve. Le nez, complexe, révèle des notes de groseille et de fraise acidulée. Grâce à une fermentation et un élevage en fût de bois méticuleux, la sensation en bouche se distingue par un tanin assez fin. Un joli vin rouge du Jura, fin, juteux et intensément fruité."
                            },
                            {
                                name: "Viandris 2023 (AOC Côtes du Jura rouge)",
                                description: "S’il ne fallait en retenir qu’un, ce serait celui-ci. Ce vin est une véritable vibration. Le nez est un feu d’artifice mêlant le peps de l’agrume (qui évoque immédiatement l'orange sanguine), la chaleur des épices et une élégance florale envoûtante. En bouche, l'architecture est parfaite : une tension minérale qui tient le vin droit, une fraîcheur éclatante et une acidité millimétrée. Un grand vin d'émotion."
                            },
                            {
                                name: "Fontenelle 2023 (AOC Côtes du Jura rouge)",
                                description: "Vinifié en semi-carbonique, il garde un profil \"rond et léger\" malgré une structure un peu plus tannique que ses Poulsards. On part sur les fruits noirs, l'épice et la datte, avec un côté \"aigre-doux\" très stimulant. La finale laisse une empreinte limoneuse, fidèle à son sol."
                            },
                            {
                                name: "Courbes Raies 2023 (AOC Côtes du Jura rouge)",
                                description: "C'est le Pinot Noir qui fait du bien, celui qui ne triche pas. En bouche, il déploie une finesse remarquable. On y retrouve avec plaisir les marqueurs identitaires du cépage : un panier de cerises rouges juteuses et cette note de champignon frais / sous-bois qui apporte de la profondeur. Une cuvée simple et efficace, taillée pour la table et le plaisir immédiat."
                            }
                        ]
                    },
                    {
                        category: "Les bulles",
                        items: [
                            {
                                name: "Crémant du Jura 2022 (Brut Nature) (AOC Crémant du Jura)",
                                description: "Ce Crémant dégorgé en octobre 2025 est une petite bombe de plaisir. Un nez complexe aux notes oxydatives de noix. En bouche, c'est fruité et pâtissier, avec des notes gourmandes de miel, d'amande et de tarte au pomme. L'attaque est vineuse (\"champanisé\") mais sans tension agressive. C'est plein de fraicheur, c'est bon, ça se boit tout seul."
                            }
                        ]
                    }
                ]
            },
            {
                name: "Domaine Valentin Morel (Les Pieds sur Terre)",
                x: 560, y: 305,
                location_details: "Poligny - 8 hectares - Bio & Biodynamie",
                description: "Valentin Morel n'est pas qu'un vigneron, c'est un intellectuel de la vigne. Ici, on réfléchit au sens du métier, on défend les cépages résistants (hybrides) et on travaille sans filet.",
                wines: [
                    {
                        category: "Les Blancs",
                        items: [
                            {
                                name: "Saint Savin 2022 (AOC Côtes du Jura)",
                                description: "Dans le verre surprise, ce 2022 sur sol calcaire est un \"faux calme\". L'attaque est ronde, presque crémeuse (on sent le beurre frais), mais une énergie citronnée vient réveiller le tout en finale. Valentin est formel (et on est d'accord) : c'est le vin absolu pour un Comté. Le gras du fromage épouse le côté lactique du vin, et l'acidité nettoie le palais."
                            },
                            {
                                name: "Les Trouillots 2022 (AOC Côtes du Jura)",
                                description: "Ici, les Marnes du Lias (des argiles grises, lourdes et collantes) donnent des \"épaules\" et de la puissance au vin. Pour dompter cette force, le vin a passé 2 ans en fûts. Contrairement au Saint-Savin qui se livre tout de suite, celui-ci est un vin de garde plus large, plus structuré, taillé pour la table."
                            },
                            {
                                name: "Savagnin Ouillé 2020 (AOC Côtes du Jura)",
                                description: "C'est un millésime solaire et ça se sent ! On a des notes de fruits exotiques, c'est riche, gourmand, avec une onctuosité folle en bouche. Cependant, la salinité finale rappelle qu'on est bien dans le Jura."
                            }
                        ]
                    },
                    {
                        category: "Macérations & Curiosités",
                        items: [
                            {
                                name: "Vin de Paille 2013 (AOC Vin de Paille)",
                                description: "Des raisins séchés sur paille, 10 ans d'âge... C'est mielleux, un côté poire caramélisée, amandes grillées, tabac blond, avec une complexité forte."
                            },
                            {
                                name: "Savagnin Macéré 2023 (Vin de France)",
                                description: "Vous avez peur des vins oranges trop durs ? Goûtez celui-ci. Vinifié comme un rouge (15 jours avec les peaux) mais élevé en inox, il garde une fluidité incroyable. Pas de tanins râpeux ici, juste des notes florales et de pêche de vigne. C'est la porte d'entrée idéale vers l'univers de la macération."
                            }
                        ]
                    },
                    {
                        category: "Les Rouges",
                        items: [
                            {
                                name: "Poulsard Les Trouillots 2023 (AOC Côtes du Jura)",
                                description: "La robe est si pâle qu'on dirait un rosé foncé. En bouche, c'est de l'eau de roche : minéral, frais, avec des notes de fraise et groseille. Le vin est égrappé car Valentin juge qu'elle n'est souvent pas assez mûre sur le Poulsard. Une macération courte de 2 semaines en inox suffit à extraire juste ce qu'il faut de fruit sans durcir le vin. Une véritable infusion."
                            },
                            {
                                name: "En Bois d’Arnaux 2023 (AOC Côtes du Jura)",
                                description: "On monte d'un cran. Le nez nous emmène en Orient avec des arômes de tamarin, de datte et d'épices douces. C'est un vin aérien d’une extrême légereté, mais avec une persistance aromatique folle."
                            },
                            {
                                name: "Trousseau Les Trouillots 2023 (AOC Côtes du Jura)",
                                description: "Plus structuré que le Poulsard, il marque son territoire avec ses fameuses notes de poivre blanc. C'est gourmand, fluide et dynamique."
                            },
                            {
                                name: "Pinot Noir 2022 (AOC Côtes du Jura)",
                                description: "Oubliez le boisé bourguignon. Ici, c'est un Pinot \"droit dans ses bottes\". Un tanin léger, une trame minérale très présente et des notes de sous-bois et de petits fruits rouges (cerise). L'acidité naturelle du Jura lui donne une colonne vertébrale très solide. C'est très élégant."
                            }
                        ]
                    }
                ]
            }
        ]
    },
    '49': {
        name: 'Maine-et-Loire - Vallée de la Loire',
        domaines: [

            {
                name: 'Loïc Mahé',
                x: 255, y: 245,
                location_details: "À Savennières - 4,5 hectares - Bio & Biodynamie",
                description: "Loïc Mahé fonde toute sa philosophie sur une vérité simple : 90% de la qualité se joue à la vigne. Cette conviction se traduit par une gestion des sols et des vignes d'une précision extrême, excluant l'utilisation de tout produit ou engrais chimique ou l'introduction d'animaux domestiques. Ce savoir-faire, allié à des vendanges manuelles par tris successifs, garantit des Chenins de précision, vibrants et salins.",
                wines: [
                    {
                        category: "Les blancs",
                        items: [
                            {
                                name: "Savennières Sables & Schistes 2023 (AOC Savennières)",
                                description: "Cette cuvée est l'introduction idéale à la minéralité de Savennières. Elle puise sa droiture dans les sols de schistes et de sables. Le vin est vinifié en demi-muids (fûts de 600 litres). Le nez est puissant, sur des notes d'agrumes, d'amande fraîche et de fumée. En bouche, il est droit et salin, avec une vivacité qui étire la finale. C'est un vin racé et élégant, qui démontre la capacité du Chenin à allier richesse et fraîcheur cristalline."
                            },
                            {
                                name: "Petit Moulin 2023 (AOC Anjou)",
                                description: "Cette cuvée est l'une des plus riches du domaine, issue d'un terroir au sud de l'Anjou et élevée sur lies fines pendant 18 mois. C'est un vin qui déploie une matière incroyable. En bouche, on y retrouve des accents de miel. Véritable gourmandise."
                            },
                            {
                                name: "Amphorae 2021 (AOC Savennières)",
                                description: "Cette cuvée est l'incarnation de la recherche de pureté et de précision géologique. Le Chenin Blanc est élevé en amphores. Ce choix technique permet une micro-oxygénation lente et homogène sans l'apport de notes boisées. Ainsi, Le nez affiche une franchise aromatique éclatante et cristalline, dominée par la pierre à fusil et les agrumes ciselés. En bouche, le vin surprend par son volume texturé qui gagne en densité. La finale est une démonstration de l'énergie du schiste, avec une tension saline redoutable qui prolonge l'expression du terroir. Un Chenin intégral, taillé pour la garde et la haute gastronomie."
                            },
                            {
                                name: "Les Fougeraies 2019 (AOC Savennières)",
                                description: "Cette cuvée parcellaire provient d'un terroir de sables éoliens sur sous-sol schisteux. Elle est soumise à un long élevage de 18 à 24 mois, avec une part significative en barrique (fûts de chêne). La robe est jaune très soutenue. Le nez, complexe, révèle des notes de fruits à noyau, de noix et d'épices douces dues à l'élevage en bois. En bouche, l'attaque est souple et ronde, immédiatement suivie par une puissance structurée et une minéralité marquée. Le vin est à la fois tranchant par son acidité et onctueux par sa matière, offrant une finale persistante aux amers subtils."
                            },
                            {
                                name: "Équilibre 2019 (AOC Savennières)",
                                description: "Issue d'un sol chaud et peu profond de schistes verts et pourpres, cette cuvée est élevée lentement durant 20 mois, dont 12 en fûts de chêne. Cet élevage long et en bois lui confère un potentiel de garde exceptionnel (15 à 20 ans). Après aération, le nez révèle une complexité intense de noisettes toastées, de fruits à noyaux et d'épices. En bouche, il déploie un équilibre magistral entre une fraîcheur ciselée et une tension saline persistante qui invite à la grande gastronomie."
                            }
                        ]
                    },
                    {
                        category: "Macération",
                        items: [
                            {
                                name: "cuve \"M\" (Vin de France)",
                                description: "La cuvée expérimentale de Sauvignon vinifiée en macération pelliculaire (vin orange). Le vin est élevé en cuve inox. Le profil est très clair, fruité et minéral. Il est étonnamment simple à boire, offrant un équilibre entre le grain du contact pelliculaire et la vivacité du fruit."
                            }
                        ]
                    },
                    {
                        category: "Bulles",
                        items: [
                            {
                                name: "Petit Moulin (Vin de France)",
                                description: "Ce vin pétillant est élaboré en Méthode Traditionnelle à partir de Chenin Blanc. Il est sans dosage. Le vin subit un long élevage sur lattes de 24 mois minimum. Les bulles sont fines et la bouche est vive et tendue. Malgré son profil nature, il garde un côté traditionnel et un beau potentiel d'évolution."
                            }
                        ]
                    },
                    {
                        category: "Les rouges",
                        items: [
                            {
                                name: "La Bande à mouton noir 2023 (Vin de France)",
                                description: "Cette gamme est élaborée à partir de raisins de négoce. La version rouge est un assemblage de Cabernet Franc et de Grolleau. C'est un rouge frais et fruité, dans l'esprit du \"glouglou\" chic. L'assemblage apporte des arômes de fruits rouges (cerise, framboise) avec une touche épicée. Un vin de plaisir immédiat."
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Domaine du château de Plaisance',
                x: 260, y: 235,
                location_details: "À Rochefort-sur-Loire - 25 hectares - Bio & Biodynamie",
                description: "Bienvenue au Château de Plaisance, une institution de 25 hectares située sur les terroirs prestigieux de Rochefort-sur-Loire. Sous l'impulsion de Vanessa Cherruau, le domaine est conduit avec une philosophie centrée sur la lecture millimétrée des sols de schistes. Ici, on cherche à exprimer la dualité de l'Anjou Noir : cette force minérale brute du shiste primaire alliée à une élégance portée par une viticulture de précision qui apporte une tension verticale et une aptitude à la garde exceptionnelle.",
                wines: [
                    {
                        category: "Les blancs",
                        items: [
                            {
                                name: "Anjou Blanc (Vin de France)",
                                description: "C'est le vin de plaisir par excellence, celui qui ouvre les portes de l'univers de Plaisance avec une générosité immédiate. Le millésime 2024 apporte une fraîcheur croquante, préservant toute l'énergie du Chenin sans la lourdeur des années trop solaires. On est ici sur un vin qui privilégie l'éclat aromatique et la pureté du fruit. Le nez s'ouvre sur un bouquet printanier de pomme granny et de fleurs. La finale reste fidèle à l'ADN de Plaisance : elle est marquée par une fine salinité qui vient tendre l'ensemble et apporter une persistance minérale rafraîchissante."
                            },
                            {
                                name: "Ronceray (AOC Anjou)",
                                description: "C’est l'hommage de Vanessa Cherruau à l'histoire de l'Anjou (le nom fait référence à l'Abbaye du Ronceray qui possédait les vignes de Chaume au XIe siècle). On utilise ici les raisins issus du prestigieux terroir de l'unique Grand Cru de la Loire, mais vinifiés en sec. Les vignes, plus âgées et profondément enracinées dans les schistes et les poudingues (galets millénaires), transmettent au vin une densité minérale hors norme. En bouche, c'est beaucoup plus ample, vif et dynamique que les Anjou Blancs classiques. L'attaque est large, sur des notes de coing frais, de verveine et de zeste d'agrume. C'est un vin vibrant qui, tout en gardant la finesse légendaire du Chenin, impose une structure texturée et une finale aux amers nobles, typique de la roche de Chaume."
                            },
                            {
                                name: "Savennières (AOC Savennières)",
                                description: "Le Savennières du Château de Plaisance est un vin de \"rive droite\", né sur des coteaux de schistes gréseux et volcaniques (ryolithes). Contrairement aux schistes plus \"tendres\" de Rochefort, Savennières repose sur une roche mère très dure qui impose au Chenin une droiture et une austérité noble dans sa jeunesse. C'est un vin de structure, bâti pour la garde. En bouche, c'est beaucoup plus profond et complexe que les blancs de plaine. On quitte le registre aromatique simple pour entrer dans des notes de zestes de pamplemousse, de fleurs séchées et ce fumé minéral (presque pétrolé) si caractéristique des grands schistes. L'attaque est franche et la finale s'étire sur des amers nobles qui rappellent l'écorce d'orange amère."
                            },
                            {
                                name: "Grande Pièce (AOC Anjou)",
                                description: "Cette cuvée est sans doute une des plus audacieuse de Vanessa Cherruau. Issue de parcelles sélectionnées pour leur potentiel de garde, cette cuvée bénéficie d'un élevage prolongé et d’une fermentation malolactique partielle. Le nez est intrigant, mêlant des notes de fruits mûrs à des touches de fruits secs ou de miel, tandis que la bouche offre un volume onctueux et une persistance remarquable."
                            },
                            {
                                name: "Quarts de Chaume (AOC Quarts de Chaume Grand Cru)",
                                description: "Vanessa Cherruau prend ici le contrepied des liquoreux parfois pesants avec un Quarts de Chaume 2023 d'une pureté cristalline. Le vin gagne une matière incroyable, riche et sirupeuse, mais portée par une acidité qui le rend aérien. Avec ses 100g de sucre résiduel, le vin déploie un panier d'abricots confits, de miel de fleurs, de gingembre et d'écorces d'orange. Cependant, c'est la finale qui impressionne : une tension minérale extrême et une salinité héritée du schiste qui nettoient le palais, créant un équilibre parfait entre la richesse et la vibration. On l'imagine bien sûr sur un bleu de caractère ou une tarte Tatin!"
                            }
                        ]
                    },
                    {
                        category: "Les rouges",
                        items: [
                            {
                                name: "Sur la Butte (AOC Anjou)",
                                description: "Un assemblage original de Cabernet Franc et de Sauvignon. Vanessa Cherruau prend ici le contrepied des rouges d'Anjou avec un Sur la Butte 2023 d'une fluidité désarmante. Le vin gagne une matière incroyable, non pas par sa puissance, mais par la soie de sa texture. En bouche, c'est beaucoup plus léger, aérien et \" glouglou\" que les standards de l'appellation. On quitte le registre du vin rouge structuré pour aller vers un vin de plaisir pur, conçu comme une infusion de petits fruits rouges. Le nez est une explosion de groseille et de framboise fraîche. Les tanins sont hyper légers."
                            },
                            {
                                name: "Grand Lopin (AOC Anjou)",
                                description: "Si \"Sur la Butte\" joue la carte de l'infusion, Grand Lopin est la cuvée qui assoit la réputation du domaine sur les grands rouges d'Anjou. On monte ici d'un cran en termes de complexité et de profondeur. L'Anjou Noir apporte au Cabernet Franc une structure minérale unique et une capacité de garde importante. On quitte le registre du simple fruit immédiat pour des notes d'épices, de fruits noirs mûrs et de mûres des bois. Bien que le vin garde une certaine légèreté dans son toucher, sa présence est affirmée et persistante."
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Antoine Sanzay',
                x: 265, y: 265,
                location_details: "À Varrains - 28 hectares - Bio",
                description: "Franchir la porte du Domaine Antoine Sanzay, c'est entrer dans le monde de la haute couture viticole. À Varrains, sur ses 28 hectares certifiés en Agriculture Biologique, Antoine ne se contente pas de produire du Saumur-Champigny : il sculpte la roche. Son travail est une ode à la délicatesse, transformant le Cabernet Franc et le Chenin en des étoffes soyeuses où chaque fil est une nuance du terroir. Ici, la recherche de la finesse de grain est une obsession, et chaque cuvée raconte l'histoire d'un équilibre trouvé entre la tension du calcaire et la souplesse du sable.",
                wines: [
                    {
                        category: "Les blancs",
                        items: [
                            {
                                name: "Les Essarts 2023 (AOC Saumur)",
                                description: "C'est la cuvée parcellaire qui redéfinit le blanc de Saumur. Issue d'un terroir argilo-calcaire et crayeux, elle bénéficie d'un élevage patient de 18 mois en demi-muids. Antoine prend ici le contrepied des blancs trop boisés en utilisant des contenants larges (500L), permettant au vin de respirer sans être marqué par les arômes de fût. Le vin gagne une matière incroyable par sa droiture. En bouche, c’est beaucoup plus salin et minéral que les Chenins classiques. On quitte le registre de la rondeur pour aller vers un vin de terroir pur, étiré par une acidité noble et une finale crayeuse."
                            },
                            {
                                name: "Les Salles Martin 2023 (AOC Saumur)",
                                description: "Cette cuvée est une expression singulière du Chenin, issue de vignes de 50 ans plantées sur des terroirs de sables. Là où le calcaire apporte souvent une tension stricte, le sable offre ici une texture plus souple et une aromatique immédiate. Antoine Sanzay cherche ici à préserver le fruit tout en allant chercher une signature minérale spécifique, très différente de celle des sols crayeux. En bouche, c'est beaucoup plus fruité et volumineux que les Chenins classiques de pur calcaire. On quitte le registre de la simple acidité pour aller vers un vin de gastronomie marqué par une salinité persistante qui vient équilibrer la richesse du fruit. On l'imagine parfaitement sur un poisson de Loire au beurre blanc, des Saint-Jacques poêlées ou même un fromage de chèvre affiné."
                            }
                        ]
                    },
                    {
                        category: "Les rouges",
                        items: [
                            {
                                name: "La Paterne 2023 (AOC Saumur-Champigny)",
                                description: "La Paterne est la cuvée identitaire du domaine, conçue comme un assemblage de toutes les jeunes vignes de l'exploitation. L'objectif ici n'est pas la démonstration de puissance, mais la recherche d'un équilibre parfait entre fraîcheur et accessibilité. Le travail en cave vise à préserver l'éclat du fruit, en évitant les extractions massives pour favoriser une structure souple et une buvabilité maximale. En bouche, c'est beaucoup plus léger, juteux et pulpeux que les Saumur-Champigny de longue garde. On quitte le registre du tanin rigide pour aller vers un vin de soif élégant, porté par des notes de petits fruits rouges croquants. Le profil est celui d'un Cabernet léger, avec un tanin très fin qui apporte juste ce qu'il faut de structure pour souligner le fruit sans jamais l'écraser."
                            },
                            {
                                name: "Les Poyeux 2023 (AOC Saumur-Champigny)",
                                description: "Le terroir mythique de Saumur-Champigny. Ici, la fermentation se fait au frais pour préserver la longueur et la pureté. Antoine Sanzay prend ici le contrepied des extractions massives avec un Poyeux 2023 qui sublime le végétal noble. Le vin gagne une matière incroyable, à la fois juteuse et pulpeuse. En bouche, c'est beaucoup plus soyeux et minéral que n'importe quel autre cru. On quitte le registre de la démonstration de force pour aller vers un vin de méditation, profond, étoffé, aux tanins d'une finesse de velours."
                            }
                        ]
                    }
                ]
            }
        ]
    },
    '44': {
        name: 'Loire-Atlantique - Vallée de la Loire',
        domaines: [
            {
                name: 'Eric Chevalier',
                x: 228, y: 268,
                location_details: "À Saint Philbert de Grand Lieu - 30 hectares - Bio",
                description: "Certifié en Agriculture Biologique depuis 2016, Éric et sa sœur Gaëlle poursuivent la quête de vins francs, salins et sains. Leur philosophie : laisser le terroir océanique, riche en schistes et roches métamorphiques, s'exprimer sans filtre, avec une intervention humaine minimale mais experte, pour des cuvées d'une fraîcheur et d'une finesse remarquables. C'est l'essence même du Muscadet, mais avec une vision résolument contemporaine.",
                images: ["images/chevalier-vignes.jpg", "images/chevalier-bouteilles.jpg", "images/chevalier-travail.jpg"],
                wines: [
                    {
                        category: "Les Blancs",
                        items: [
                            {
                                name: "Folle Blanche 2024 (AOC Gros Plant du Pays Nantais)",
                                description: "C'est le parfait vin de soif, à la fois vif et désaltérant. Imaginez une immersion immédiate dans l'iode et les agrumes frais. Ce vin exprime la simplicité d'une matière première saine et d'une vinification qui laisse le cépage parler. Un véritable \"glouglou\" chic et minéral, idéal pour l'apéro ou les huîtres."
                            },
                            {
                                name: "Avenue 2023 (IGP Val de Loire)",
                                description: "Un Chardonnay qui prend de la dimension grâce à un terroir où il se sent bien. Le nez s'ouvre sur la poire, la pomme et une touche beurrée, très engageante. En bouche, c'est ample et généreux, mais la minéralité propre au domaine vient trancher le gras, offrant une finale nette et équilibrée."
                            },
                            {
                                name: "Starfish 2023 (AOC Muscadet Côtes de Grand Lieu sur Lie)",
                                description: "Un classique du domaine, parfait pour découvrir la patte d'Éric Chevalier. Ce Muscadet est un assemblage de différentes parcelles, dont l'élevage sur lies lui apporte de la rondeur et de la complexité. C'est un vin frais et salin, avec de belles notes de fruits blancs mûrs et une petite touche fumée. Sa sapidité en fait un allié rêvé pour tous les produits de la mer."
                            },
                            {
                                name: "La Noë 2023 (AOC Muscadet Côtes de Grand Lieu sur Lie)",
                                description: "Issu d'une parcelle sur granites et gneiss (roches dures), ce Muscadet est une démonstration de tension. Le nez est finement floral et citronné. En bouche, c'est d'une grande précision, la minéralité est ciselée et la finale persistante. C'est un vin qui gagne en complexité avec le temps, le genre de Muscadet qui mérite quelques années de cave."
                            },
                            {
                                name: "Fié Gris 2023 (IGP Val de Loire)",
                                description: "Voici la curiosité du domaine ! Ce cépage rare, le Sauvignon Gris (ou Fié Gris), offre un profil aromatique unique. Le vin est riche et structuré, avec des notes florales distinguées et une finale épicée. Planté sur des graves roulées sur sables et limons, il offre une bouche enveloppante. On est loin du Sauvignon Blanc classique : c'est une dégustation gourmande et originale."
                            }
                        ]
                    },
                    {
                        category: "Macération",
                        items: [
                            {
                                name: "Cirrus 2022 (IGP Val de Loire)",
                                description: "Attention : Malgré sa couleur rouge ambrée due à la macération pelliculaire, cette cuvée est faite à partir du cépage blanc Fié Gris (ou Sauvignon Rose). Le vin est le fruit d'une macération longue sur grappes entières, qui lui confère une couleur et une texture surprenantes. En bouche, c'est beaucoup plus ample et texturé que les blancs classiques. On quitte le registre du simple blanc pour aller vers un vin orange de gastronomie, profond et étoffé, qui mêle les notes de pêche blanche à la tension saline, avec une subtile sensation tannique due au contact avec les peaux. Un ovni sublime !"
                            }
                        ]
                    },
                    {
                        category: "Les rouges",
                        items: [
                            {
                                name: "Accolade 2024 (IGP Val de Loire)",
                                description: "Un assemblage de deux cépages phares de la Loire : le Cabernet Franc et le Pineau d'Aunis. Ce vin est conçu comme un rouge de soif par excellence. Le nez est immédiatement séduisant avec une dominante de poivre blanc et de fruits rouges acidulés (caractéristique du Pineau d'Aunis). Léger et frais grâce à une macération courte en grappes entières, il déploie une vivacité éclatante en bouche."
                            },
                            {
                                name: "Emeri 2024 (IGP Val de Loire)",
                                description: "Issu d'un mariage entre le Grolleau (cépage local) et le Pinot Noir, cette cuvée est un rouge tout en délicatesse. L'équilibre est parfait entre la gourmandise et le croquant du fruit (cerise, cassis) apportés par les deux cépages. Le résultat : un vin souple, fruité et facile à boire, à seulement 10,5% d'alcool environ."
                            },
                            {
                                name: "Les Hauts Cormiers 2023 (IGP Val de Loire)",
                                description: "Voici le Pinot Noir de gastronomie du domaine. La robe est d'un rouge plus intense. Le nez est plus sombre et plus complexe, avec des notes de fruits noirs, de sous-bois et de réglisse. Grâce à une macération plus longue et un potentiel élevage en cuve (ou fûts anciens), la bouche est plus charnue et étoffée. On quitte le simple vin de fruit pour aller vers un rouge plus construit."
                            },
                            {
                                name: "Cardinal 2023 (IGP Val de Loire)",
                                description: "Hommage à l'ancien propriétaire, cette cuvée est un Cabernet Franc à 100%, qui exprime la maturité et le croquant. En bouche, il présente un tanin ferme mais fin, avec une belle colonne acide qui assure sa fraîcheur. C'est un vin intense et juteux, parfait pour découvrir l'élégance du Cabernet Franc hors de l'Anjou ou de Chinon."
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Jean-Baptiste Hardy',
                x: 235, y: 245,
                location_details: "À Mouzillon - 8,5 hectares - Bio",
                images: ["images/hardy-dessin.jpg", "images/hardy-eclats.jpg"],
                description: "Installé au cœur de l'appellation Muscadet Sèvre-et-Maine, Jean-Baptiste Hardy incarne la nouvelle génération de vignerons ligériens. Après un parcours initiatique chez les plus grands (Domaine Roulot, Leflaive, Nouvelle-Zélande, Patagonie), il applique une technicité de pointe à son domaine familial cultivé en Agriculture Biologique. Sur des terroirs volcaniques de Gabbro, sa philosophie est d'allier une précision et une élégance tout en restant fidèle à la salinité nantaise. C'est l'harmonie parfaite entre un savoir-faire international et la profondeur du terroir local.",
                wines: [
                    {
                        category: "Les Blancs",
                        items: [
                            {
                                name: "Éclats 2023 (Vin de France)",
                                description: "Cette cuvée est l'initiation parfaite à la patte du vigneron. Issu de jeunes vignes, il déploie un \"éclat\" aromatique sur la poire verte et le zeste de citron. En bouche, il prend immédiatement de la matière et de la rondeur, loin de la légèreté parfois associée au cépage. Son long élevage sur lies lui apporte une texture étoffée tout en conservant une minéralité vibrante qui tend la finale. Un vin de qualité, qui conjugue accessibilité et profondeur."
                            },
                            {
                                name: "Fief de Chaintre 2023 (AOC Muscadet-Sèvre-et-Maine sur Lie)",
                                description: "Ici, nous passons à la pleine expression du terroir. Ce vin provient de très vieilles vignes plantées sur le Gabbro, offrant une concentration exceptionnelle. Le nez est riche et complexe, mêlant notes fumées et fruits blancs mûrs. En bouche, c'est beaucoup plus ample et texturé que les standards du Muscadet. Le vin gagne une puissance et une gourmandise remarquables, se transformant en un vin blanc de gastronomie, profond et étoffé. La concentration des vieilles vignes apporte une allonge qui est magnifiée par la tension saline propre à ces sols volcaniques."
                            },
                            {
                                name: "Clos des Lozangères (AOC Muscadet-Sèvre-et-Maine sur Lie)",
                                description: "Cette parcelle est l'une des plus vieilles du domaine, plantée en Melon de Bourgogne dès les années 1950, sur un terroir de Gabbro et de silico-argileux. Le vin est travaillé comme un cru, avec un élevage très long (jusqu'à 18 mois sur lies) pour en extraire la quintessence. Il allie l'intensité du fruit à une tension remarquable. La bouche est d'une droiture et d'une finesse qui rappellent les grands blancs de garde. La finale, longue et persistante, révèle des notes d'amande et de pierre à fusil, le positionnant comme un Muscadet de très haut potentiel, capable de rivaliser avec les meilleurs Chenins de Loire."
                            },
                            {
                                name: "L'Aubière (Vin de France)",
                                description: "Jean-Baptiste Hardy prend ici le pari d'un blanc hors appellation qui mise tout sur le volume et la texture. Le nez s'ouvre sur une complexité envoûtante, avec des notes de cire d'abeille, d'épices douces et d'amande fraîche. En bouche, un vin ample et généreux, d'une texture veloutée et enveloppante. La fraîcheur océanique vient maintenir l'équilibre, offrant une finale sapide et nette."
                            }
                        ]
                    },
                    {
                        category: "Les rouges",
                        items: [
                            {
                                name: "Le Petit Clos (IGP Val de Loire)",
                                description: "Issu du cépage Gamay, cette cuvée est un archétype de la \"rougeur infusée\" ligérienne. Sa robe est d'un rubis éclatant, invitant. Le nez est un festival de petits fruits rouges croquants : fraise des bois, groseille et un soupçon de pivoine. En bouche, le vin est d'une extrême légèreté. Il est juteux, avec un côté salin qui excite les papilles, le tout soutenu par une fraîcheur désaltérante. C'est le rouge parfait pour les moments Terre et Mer!"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    '37': {
        name: 'Indre-et-Loire - Vallée de la Loire',
        domaines: [
            {
                name: 'La Taille au loup',
                x: 310, y: 250,
                location_details: "À Montlouis-sur-Loire - 70 hectares - Bio",
                description: "On vous emmène aujourd'hui à Montlouis-sur-Loire, au Domaine de la Taille au Loup, une institution de 70 hectares conduite en Agriculture Biologique. Ici, la philosophie est claire : on cherche la pureté absolue à travers un égrappage manuel méticuleux et une vinification qui refuse tout levurage ou chaptalisation. Pour le vigneron, un grand vin doit avant tout être \"hydratant\", une quête de fraîcheur et de digestibilité que l'on retrouve dans chaque flacon.",
                wines: [
                    {
                        category: "Les bulles",
                        items: [
                            {
                                name: "Triple Zéro (AOC Montlouis-sur-Loire effervescent)",
                                description: "Considérée comme une référence mondiale dans l'univers des bulles, cette cuvée est le manifeste de Jacky Blot pour un vin sans artifice. On l'appelle \"Triple Zéro\" car zéro chaptalisation (pas d'ajout de sucre à la récolte), zéro liqueur de tirage (prise de mousse naturelle), et zéro liqueur d'expédition (pas de dosage final). Triple Zéro 2022 est d'une droiture absolue. En bouche, c'est beaucoup plus tendu et pur que les méthodes traditionnelles classiques. On y retrouve des notes cristallines de poire, de fleurs blanches et une minéralité crayeuse qui étire la finale sur une longueur désaltérante."
                            }
                        ]
                    },
                    {
                        category: "Les blancs",
                        items: [
                            {
                                name: "Clos Michet 2023 (AOC Montlouis-sur-Loire)",
                                description: "Le Clos Michet est une parcelle située sur le versant sud de l’appellation, surplombant le Cher. C’est un terroir qui capte la lumière, offrant des Chenins d’une maturité exemplaire tout en conservant la fraîcheur saline du domaine. Cette cuvée est strictement parcellaire, issue de vignes ancrées dans un sol de tuffeau recouvert d’argiles à silex. On mise ici sur la patience avec un élevage de 12 mois en barriques de plusieurs vins, ce qui permet de nourrir le Chenin sans jamais le \"boiser\" de manière ostentatoire. En bouche, on y retrouve ces notes identitaires de toasté et de noisettes, mêlées à des effluves de fleurs blanches et de miel d’acacia. Malgré cette richesse, la signature de Jacky Blot est bien là : une trame minérale qui vient étirer la finale pour éviter toute lourdeur."
                            },
                            {
                                name: "Les Hauts de Husseau 2023 (AOC Montlouis-sur-Loire)",
                                description: "Situé sur le point le plus haut de l’appellation Montlouis-sur-Loire. Cette cuvée est issue de vignes centenaires, dont les racines plongent profondément dans le tuffeau blanc. Cet âge canonique permet une régularité de production et une concentration minérale exceptionnelle. Après 11 mois d’élevage en barrique, le vin est prêt à livrer son message de terroir. En bouche, c’est tendu, vif et très minéral. On quitte le registre du fruit de surface pour aller vers un vin de gastronomie pur, profond et étoffé par une bouche saline et vibrante."
                            },
                            {
                                name: "Venise (Vouvray) 2023 (AOC Vouvray)",
                                description: "Bien que les vignes soient situées sur l’appellation Vouvray, le vin est déclassé en Vin de France (Vdf) car le chai de vinification se trouve sur la rive opposée, à Montlouis-sur-Loire. C’est un vin de \"climat\", issu d’un clos d’un hectare seulement, qui offre une lecture radicalement différente du Chenin. Ce petit enclos bénéficie d’une exposition et d’un microclimat qui poussent le raisin vers une maturité très avancée. En bouche, c’est beaucoup plus complexe et profond que les Chenins traditionnels. On quitte le registre du fruit frais pour aller vers un vin plus profond et étoffé par un côté oxydatif noble parfaitement maîtrisé. Le nez est envoûtant, dominé par la pomme mûre et des notes de coing compoté. C’est un vin de caractère, vibrant, qui m’a littéralement conquis."
                            },
                            {
                                name: "Les Hauts de Husseau 2019 (AOC Montlouis-sur-Loire)",
                                description: "Si le 2023 brille par sa tension rocheuse, le millésime 2019 nous offre aujourd'hui un visage radicalement différent. Après quelques années de repos en cave, cette cuvée issue de vignes centenaires s'est apaisée pour laisser place à une plus grande harmonie. En bouche, c'est beaucoup plus gourmand, équilibré et fruité que dans sa prime jeunesse. On quitte le registre de la minéralité tranchante pour aller vers un vin de gastronomie plus profond et étoffé. Le nez s'est complexifié, mêlant notes de fruits jaunes mûrs, de cire d'abeille et une pointe de noisette grillée. C'est un vin qui vibre par sa justesse et sa sérénité, un véritable coup de cœur."
                            },
                            {
                                name: "Moelleux 2020 (AOC Montlouis-sur-Loire Moelleux)",
                                description: "Ce Moelleux 2020 est le fruit d'une sélection de raisins desséchés sur souche qui concentrent les sucres et les arômes tout en préservant l'âme du Chenin. Ce millésime affiche 50g de sucre résiduel. Si ce chiffre peut paraître élevé, il est ici contrebalancé par une acidité tranchante propre au terroir de Montlouis. C'est ce que Jacky Blot appelait un vin \"hydratant\" : même avec du sucre, le palais reste frais et disponible autour de notes de coing, de miel de fleurs et d'abricot sec."
                            }
                        ]
                    },
                    {
                        category: "Les rouges",
                        items: [
                            {
                                name: "Les Coteaux du Levant 2023 (AOC Bourgueil)",
                                description: "Pour comprendre les rouges du domaine, on doit se projeter sur la rive droite de la Loire, à Bourgueil. Ici, les Coteaux du Levant profitent, comme leur nom l’indique, des premiers rayons du soleil sur des pentes douces d’argiles. C’est le terroir de la gourmandise par excellence. Le sol, riche en argiles, apporte au Cabernet Franc une rondeur naturelle et un fruit éclatant. La viticulture en bio et l’égrappage manuel total permettent d’éliminer toute trace de rafle. C’est un vin hyper délicat qui glisse sur le palais avec une élégance rare."
                            },
                            {
                                name: "Le Haut de la Butte 2023 (AOC Bourgueil)",
                                description: "Situé sur la partie supérieure du coteau du Domaine de la Butte, ce terroir se distingue par un sol mince composé d'argiles à silex reposant directement sur le calcaire. C'est ici que le Cabernet Franc gagne en tension et en profondeur, offrant une facette plus sombre et structurée que les cuvées de bas de coteau. Le silex joue un rôle de réflecteur de chaleur tout en apportant une vibration minérale très particulière. En bouche, c'est beaucoup plus structuré et complexe. On retrouve des notes de fruits très mûrs et noirs, évoquant la griotte noire et la datte. La trame minérale du silex apporte une \"droiture\" qui soutient le vin du début à la fin, offrant une finale longue et élégamment austère."
                            },
                            {
                                name: "Mi-Pente 2021 (AOC Bourgueil)",
                                description: "Elle est issue du cœur du coteau, là où la pente est la plus forte et où le terroir argilo-calcaire est le plus qualitatif. C'est ici que Jacky Blot a choisi d'isoler ses plus vieilles vignes, âgées de 70 ans, pour créer un grand vin de garde. Ce terroir d'argilo-calcaire sur tuffeau offre une régulation hydrique parfaite pour les vieilles vignes. Pour dompter la puissance de ce terroir, le vin bénéficie d'un élevage patient de 15 mois en barriques (dont une partie de bois neuf). En bouche, c'est beaucoup plus complexe et étoffé. Malgré la fraîcheur du millésime 2021, les tanins restent légers et d'une finesse de grain remarquable. Le nez s'ouvre sur un bouquet de fruits noirs compotés, de violette et de légères notes fumées héritées de l'élevage."
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Domaine Grosbois',
                x: 305, y: 275,
                location_details: "À Panzoult - 20 hectares - Bio & Biodynamie",
                description: "Une référence en Vallée de la Loire : le Domaine Grosbois à Panzoult, au cœur de l'AOC Chinon. Sur 20 hectares travaillés en Agriculture Biologique et Biodynamique, les frères Nicolas et Sylvain Grosbois incarnent le renouveau. Leur philosophie est celle d'un paysan-vigneron : la polyculture y est reine car pour les Grosbois, un grand vin naît d'un écosystème sain. La quête ? Des vins sans artifice, qui vibrent par la finesse de leur terroir de tuffeau et de sables, révélant la véritable élégance du Cabernet Franc.",
                wines: [
                    {
                        category: "Les blancs",
                        items: [
                            {
                                name: "Manay 2023 (AOC Chinon blanc)",
                                description: "C’est le Chenin de l’apéritif. Élevé majoritairement en cuve inox, il est le manifeste d’une tension cristalline. Le domaine prend ici le contrepied des Chenins boisés avec un Manay 2023 d’une pureté absolue. Le vin gagne une matière incroyable par sa droiture minérale. En bouche, c’est beaucoup plus vif, tendu et désaltérant que les blancs classiques. On quitte le registre de l’opulence pour aller vers un vin de soif marqué par les agrumes, la pomme verte et une salinité délicieuse."
                            },
                            {
                                name: "Roncière 2023 (AOC Chinon blanc)",
                                description: "Issu d'un parcellaire de caractère, ce Chenin connait souvent un passage en fût pour gagner en complexité. On découvre ici un vin structuré et gourmand. Le vin gagne une matière incroyable, ronde et délicatement beurrée. En bouche, c'est beaucoup plus enveloppant et texturé que le Manay. On quitte le registre de la simple fraîcheur pour aller vers un vin de table étoffé par des notes de fruits jaunes et de fleurs blanches."
                            }
                        ]
                    },
                    {
                        category: "Les rouges",
                        items: [
                            {
                                name: "Gabare 2021 (AOC Chinon)",
                                description: "La cuvée Gabare est un pilier au Domaine Grosbois, issue des parcelles de milieu de coteau sur le fameux sol de millarge (sable, argile et calcaire). Ce vin est l'expression du terroir calcaire de Chinon. L'élevage se fait en cuve béton. En bouche, c'est beaucoup plus tendu et élégant que les Gabare des années solaires. On quitte le registre de la puissance immédiate pour aller vers un vin fin, délicat et ciselé. Le nez s'ouvre sur un bouquet plus frais et aérien, dominé par la cerise noire. La trame tannique est soyeuse et précise, soutenue par une acidité qui lui promet un bel avenir en cave."
                            },
                            {
                                name: "Glacière 2023 (AOC Chinon)",
                                description: "Si Gabare représente la structure, Glacière est l’expression de la fraîcheur. Cette cuvée est issue de parcelles situées sur le bas du coteau, là où les sols sont plus légers, composés de sables et d’alluvions. L’élevage court en cuve béton préserve cette pureté aromatique. Nicolas Grosbois prend ici le contrepied des rouges de Loire parfois austères avec une cuvée Glacière 2023 d’une buvabilité extrême. En bouche, c’est un vin de plaisir immédiat autour des arômes de framboise fraîche, de cerise griotte et une pointe de réglisse. Les tanins sont quasi imperceptibles, laissant place à une sensation de velours et de fraîcheur acidulée."
                            },
                            {
                                name: "Montet 2021 (AOC Chinon)",
                                description: "Le Montet est la cuvée parcellaire la plus prestigieuse du domaine. Issue de vignes situées sur le haut du coteau, là où la couche d'argile est fine et repose directement sur le tuffeau blanc, elle représente la quintessence de Chinon. En 2021, cette position en hauteur a permis de préserver une acidité noble et une grande précision aromatique. Ce terroir exige de la patience. Le vin bénéficie d'un élevage long de 18 mois en fûts (foudres et barriques de plusieurs vins). La bouche est étoffée par des notes de cèdre, de graphite et de petits fruits noirs (mûre sauvage). La trame tannique est d'une finesse de grain exceptionnelle, portée par une tension minérale qui étire la finale. C'est un vin \"énergique\"."
                            },
                            {
                                name: "Grolleau 2023 (Vin de France)",
                                description: "Le Grolleau est le cépage \"plaisir\" par excellence de la région. Au Domaine Grosbois, on le travaille avec une approche peu interventionniste (souvent en macération courte ou \"infusion\") pour préserver son éclat naturel. Planté sur des sols plus légers (sables et argiles), ce Grolleau 2023 exprime toute sa spontanéité. On cherche ici l’extraction minimale : juste assez pour la couleur et le fruit, sans jamais aller chercher la dureté du tanin. C’est un vin qui se boit pour sa fraîcheur et sa digestibilité. On quitte le registre de la puissance pour aller vers un vin de soif étoffé par des notes intenses de petits fruits rouges (groseille, framboise sauvage) et une touche poivrée caractéristique. C’est un vin léger et très frais, avec un léger tanin qui apporte juste ce qu’il faut de structure pour ne pas être un simple jus de fruit."
                            }
                        ]
                    }
                ]
            }
        ]
    },
    '42': {
        name: 'Loire - Côte Roannaise',
        domaines: [
            {
                name: 'Domaine des Pothiers',
                x: 476, y: 348,
                location_details: "À Villemontais - 23 hectares - Bio & Biodynamie",
                description: "Situé à Villemontais, à l'extrémité sud de la Vallée de la Loire, le Domaine des Pothiers est le fer de lance du renouveau de la Côte Roannaise. Sous l'impulsion de Romain Paire, ce domaine de 23 hectares conduit en Agriculture Biologique et Biodynamie (Demeter) magnifie le Gamay Saint Romain. Ce cépage autochtone, cultivé sur des sols de granit entre 400 et 500 mètres d'altitude, offre des vins d'une verticalité rare, marqués par des degrés alcooliques modérés (souvent autour de 12%) et une fraîcheur éclatante.",
                wines: [
                    {
                        category: "Les Blancs",
                        items: [
                            {
                                name: "Colline en Flamme 2024 (Vin de France)",
                                description: "Le granit s’exprime ici avec une franchise absolue grâce à une vinification épurée en cuve béton. La dégustation dévoile un contraste saisissant entre la gourmandise de fruits jaunes mûrs — effleurant des nuances de caramel — et une trame minérale presque crayeuse. L'ensemble s'étire sur une finale intensément saline, confirmant son statut de blanc de caractère, aussi à l'aise à l'apéritif qu'accompagné de mets iodés."
                            },
                            {
                                name: "Fou de Chêne 2024 (IGP Urfé)",
                                description: "L'exercice de l'élevage trouve ici tout son intérêt à travers un mariage savant entre barrique (⅓) et foudre (⅔). Cette cuvée offre un toucher de bouche onctueux et lactique, révélant une complexité toastée qui saura ravir les amateurs de vins amples."
                            },
                            {
                                name: "Hors Piste 2024 (IGP Urfé)",
                                description: "Oubliez les Pinot Gris sirupeux : cette cuvée en IGP Urfé explore une voie radicalement sèche et droite. L'amplitude aromatique est saisissante, naviguant entre les fruits exotiques, le pain d’épices et les saveurs automnales, tout en conservant une finale tendue et précise héritée du sol granitique."
                            },
                            {
                                name: "En Paradis 2024 (IGP Urfé)",
                                description: "Planter du Riesling sur les contreforts du Massif Central était un pari audacieux. Pourtant, l’expérience démontre que le granit roannais possède une affinité naturelle avec le cépage. Le résultat? Une palette dominée par les agrumes frais (citron vert, pamplemousse) qui s'entremêle à une signature minérale profonde."
                            }
                        ]
                    },
                    {
                        category: "Les Rosés",
                        items: [
                            {
                                name: "Granit Rosé 2024 (Vin de France)",
                                description: "Ce rosé de pressurage direct privilégie la vivacité du fruit frais. On y retrouve l'expression immédiate du Gamay Saint Romain, avec une bouche juteuse, acidulée et florale qui évoque les petits fruits rouges et les fleurs blanches. Un vin de plaisir, sans artifice."
                            }
                        ]
                    },
                    {
                        category: "Les Rouges",
                        items: [
                            {
                                name: "La Chapelle 2024 (AOC Côte Roannaise)",
                                description: "Issue des sommets du domaine sur un terroir de granit vert, cette cuvée élevée 11 mois en cuve tronconique bois est marquée par un caractère épicé et poivré qui domine une matière profonde et énergique. La finale minérale donne naissance à une cuvée précise, tendue et éclatante."
                            },
                            {
                                name: "Domaine 2023 (AOC Côte Roannaise)",
                                description: "Les vieilles vignes de la propriété livrent ici une version plus ample et veloutée. Un élevage patient en cuve béton et sous bois permet une structure naturellement généreuse. La bouche est pulpeuse, délivrant des notes de fruits confiturés et d'épices douces. La matière s'étire sans jamais perdre sa finesse de grain."
                            },
                            {
                                name: "N°6 2024 (AOC Côte Roannaise)",
                                description: "La cuvée N°6 s'affirme comme l'expression la plus énergique et \"infusée\" du domaine. Romain Paire opte ici pour une extraction tout en douceur. L'objectif est de préserver la tension naturelle du granit tout en offrant une trame soyeuse. Le nez est une explosion de fraîcheur, dominé par des notes de framboise sauvage et de groseille. Une signature épicée très marquée, évoquant le poivre blanc, vient complexifier l'ensemble et souligne l'identité du cépage Saint Romain."
                            },
                            {
                                name: "Diogène 2023 (AOC Côte Roannaise)",
                                description: "Véritable laboratoire sensoriel, cette cuvée tire profit de la porosité de la terre cuite issue d’une macération en amphore pour laisser le vin respirer sans l’apport aromatique du bois. C’est un retour aux sources qui privilégie la pureté du fruit et l’expression du terroir de granit sous un angle totalement inédit. Le nez est captivant, dévoilant des notes de datte épicée et de fruits confits, évoquant étrangement les saveurs acidulées et complexes du \"Tamarigo\" mexicain. C’est un vin de texture, où la macération apporte une mâche délicate mais présente. La bouche est riche, profonde, tout en conservant une énergie vibrante qui évite toute lourdeur."
                            }
                        ]
                    },
                    {
                        category: "Les Bulles",
                        items: [
                            {
                                name: "Eclipse 2023 (Vin mousseux rosé (méthode ancestrale))",
                                description: "Travaillée selon la méthode ancestrale, cette bulle de Gamay est une bulle de plaisir immédiat privilégiant le fruit éclatant et une effervescence joyeuse, fine et digeste. Le vin conserve un léger sucre résiduel parfaitement équilibré par une acidité tranchante, typique des granits d'altitude. On quitte le registre de la bulle complexe pour une expérience juteuse et désaltérante."
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Domaine Sérol',
                x: 476, y: 326,
                location_details: "À Renaison - Côte Roannaise - Bio & Biodynamie",
                description: "Le Domaine Sérol, établi à Renaison au cœur de la Côte Roannaise, incarne une vision contemporaine et engagée de cette appellation confidentielle. Certifié en biodynamie, ce domaine travaille le Gamay Saint-Romain et le Chenin sur des terroirs de granit pour des vins d'une grande précision et d'une authenticité rare.",
                wines: [
                    {
                        category: "Les Rosés",
                        items: [
                            {
                                name: "Cabochard 2024 (Vin de France)",
                                description: "Élaboré à partir de Gamay, ce rosé se veut avant tout minéral. Le domaine privilégie un profil peu fruité et sérieux. En bouche, le vin reste droit, évitant toute lourdeur aromatique pour se concentrer sur la pureté du terroir."
                            }
                        ]
                    },
                    {
                        category: "Les Blancs",
                        items: [
                            {
                                name: "Pas Faire Sans 2024 (IGP Urfé)",
                                description: "Une cuvée de négoce (Chenin d'Anjou et de Limoux) qui recherche la tension maximale. Vinifié en cuve béton, foudre et fûts de 500 litres, le vin gagne une rondeur acidulée tout en conservant une grande fraîcheur. On quitte le fruit simple pour une structure minérale incisive."
                            },
                            {
                                name: "Champtoise 2024 (Vin de France)",
                                description: "Ce Chenin planté sur granit exprime un équilibre parfait entre fruit blanc et fleur blanche. L'élevage sur lies de plus de 10 mois en fût apporte de la rondeur sans masquer la finesse. La bouche est harmonieuse, alliant la richesse de la matière à la droiture saline du granit."
                            }
                        ]
                    },
                    {
                        category: "Les Rouges",
                        items: [
                            {
                                name: "Éclat de Granit 2024 (AOC Côte Roannaise)",
                                description: "Vinifié en cuve béton avec 15% de grappes entières pour ramener de la fraîcheur et équilibrer l'acidité. Cet assemblage de 17 parcelles offre un vin fruité et épicé. La structure est renforcée par une rafle mûre qui apporte une matière tactile et vibrante."
                            },
                            {
                                name: "Oudan 2023 (AOC Côte Roannaise)",
                                description: "Issu d'un coteau plein Sud sur granit rose, ce vin gagne en profondeur et en minéralité. Vinifié en cuve tronconique avec 20% de grappes entières, il offre des notes de violette, framboise et cerise. L'élevage de 11 mois en foudres arrondit les tanins pour un résultat charnu et élégant."
                            },
                            {
                                name: "Les Blondins 2023 (AOC Côte Roannaise)",
                                description: "Une co-propriété avec les frères Grosbois sur un terroir exposé Sud-Est. C'est une cuvée solaire et riche, où le fruit atteint une générosité où se déploient des saveurs de fruits rouges mûrs et d'épices. Le vin s'étire sur une finale longue et équilibrée, où éclatent la minéralité et la vivacité typiques des granits de la Côte Roannaise."
                            },
                            {
                                name: "Chez Coste 2023 (AOC Côte Roannaise)",
                                description: "Issu d'une parcelle granitique d'altitude exposée Est, de vignes de 30 ans sur un sol riche en fer et vieux granit, Chez Coste 2023 exprime avec précision toute la singularité du Gamay de la Côte-Roannaise. Le nez s'ouvre sur des arômes de framboise fraîche, de cerise croquante et de fines notes poivrées, soulignées par une touche florale délicate de pivoine et de lilas. La bouche, ample mais tendue, séduit par sa texture soyeuse et sa minéralité vibrante. L'élevage en amphore apporte une grande lisibilité du terroir, sans maquillage, laissant place à une finale longue, fraîche et saline."
                            }
                        ]
                    },
                    {
                        category: "Les Bulles",
                        items: [
                            {
                                name: "Espiègle (Vin de France / Chenin - Méthode Ancestrale)",
                                description: "Issue de jeunes vignes de Chenin sur sables granitiques et conduite en biodynamie, cette cuvée est un modèle de précision en méthode ancestrale. La robe est cristalline, jaune pâle, avec une bulle d'une grande finesse. Au nez, l'éclat est immédiat sur des notes de poire juteuse, de pomme granny et d'agrumes frais, soulignés par une minéralité saline typique du terroir. En bouche, l'attaque est vive et croquante. Un Pét-Nat de haute volée, droit et digeste, qui privilégie la pureté absolue du fruit à la complexité des levures."
                            },
                            {
                                name: "Turbullent 2024 (Vin de France / Gamay Saint-Romain - Méthode Ancestrale)",
                                description: "Cette cuvée emblématique, 100% Gamay Saint-Romain sur terroirs granitiques, réaffirme son statut de référence du pétillant naturel rosé en biodynamie. Le millésime 2024 se dévoile sous une robe framboise lumineuse. Le nez est une explosion de petits fruits rouges frais (fraise des bois, groseille) agrémentée d'une touche florale acidulée. En bouche, la gourmandise du fruit et une pointe de sucre résiduel sont immédiatement contrebalancées par une fraîcheur saline et une finale désaltérante. Avec seulement 9% d'alcool, c'est un vin de plaisir pur et croquant."
                            }
                        ]
                    }
                ]
            }
        ]
    },
    '51': {
        name: 'Marne - Champagne',
        domaines: [
            {
                name: 'Louis Roederer',
                x: 466, y: 143,
                location_details: "À Reims - Montagne de Reims - 242 hectares - Bio & Biodynamie",
                description: "Dernière grande maison familiale et indépendante, Louis Roederer incarne l'excellence champenoise avec une âme de vigneron. Elle se distingue par un domaine exceptionnel de 242 hectares, dont plus de la moitié est conduite en biodynamie sous l'impulsion de Jean-Baptiste Lécaillon. Cette maîtrise totale de la vigne permet à la maison de sculpter des vins d'une précision chirurgicale, où la tension saline des terroirs calcaires rencontre une richesse onctueuse héritée d'élevages longs sous bois. Roederer parvient ainsi à capturer l'énergie brute de la nature tout en conservant une signature gastronomique et une élégance intemporelle.",
                wines: [
                    {
                        category: "Les Bulles",
                        items: [
                            {
                                name: "Brut Nature 2018",
                                description: "Fruit d'une collaboration créative avec Philippe Starck, ce millésime non dosé exprime la pureté absolue des argiles froides de mi-coteaux. Malgré une attaque tranchée et tendue, le vin révèle une texture étonnamment onctueuse due à la maturité des raisins pressés ensemble. La finale est d'une grande fraîcheur, vibrante et dépouillée de tout artifice, offrant une expérience minérale sans compromis."
                            },
                            {
                                name: "Collection 246",
                                description: "La cuvée Collection 246 s'affirme comme une lecture vibrante du millésime 2021, enrichie par ⅓ d'une réserve perpétuelle commencée en 2012. Le nez, élégamment pâtissier, s'ouvre sur des notes de pâte d'amande et de fruits jaunes mûrs comme la mirabelle. Plus juteuse que ses prédécesseurs (245), elle offre une bouche charnue et gourmande tout en conservant la précision calcaire de la maison. Un champagne d'équilibre, à la fois complexe et immédiat."
                            },
                            {
                                name: "Vintage 2016",
                                description: "Issu d'un millésime canniculaire, ce champagne dominé par le Pinot Noir (68%) sur argiles brunes se distingue par sa stature corpulente et onctueuse. Le nez est gourmand, marqué par des notes pâtissières et une touche originale de réglisse qui apporte de la profondeur. En bouche, le vin est porté par une bulle d'une finesse extrême qui souligne l'élégance de sa structure imposante."
                            }
                        ]
                    },
                    {
                        category: "Les Rosés",
                        items: [
                            {
                                name: "Rosé 2017",
                                description: "Ce rosé de macération à froid, élaboré selon la technique unique d'infusion de la maison, arbore une robe saumonée délicate. Le nez est intensément floral, tandis que la bouche offre une explosion d'énergie portée par des notes vives de pamplemousse et d'agrumes."
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Lacourte-Godbillon',
                x: 470, y: 153,
                location_details: "À Écueil - Premier Cru Montagne de Reims - 8 hectares - Bio & Biodynamie",
                description: "Au cœur du Premier Cru d'Écueil, sur la Montagne de Reims, le Domaine Lacourte-Godbillon incarne le renouveau du Champagne de vigneron sous l'impulsion de Géraldine Lacourte et Richard Desvignes. Ce couple de Récoltants-Manipulants a su insuffler une vision moderne et exigeante à l'exploitation familiale, passant d'une viticulture conventionnelle à une certification biologique et biodynamique (premier millésime certifié en 2022). Ils travaillent leurs 8 hectares, majoritairement plantés en Pinot Noir sur des sables profonds, avec une précision quasi chirurgicale : travail des sols à cheval, élevages longs sous bois et dosage à l'aveugle pour laisser s'exprimer leur terroir.",
                wines: [
                    {
                        category: "Les Bulles",
                        items: [
                            {
                                name: "Terroirs d'Écueil (Extra-Brut)",
                                description: "Véritable porte d'entrée du domaine, cette cuvée reflète fidèlement l'encépagement de l'exploitation (85% Pinot Noir, 15% Chardonnay) sur des sols de sables et d'argiles légères. Le nez est immédiat, porté par la fraîcheur de la pomme Granny Smith et d'amandes fraîches. En bouche, la trame est tendue, minérale et marquée par une empreinte crayeuse caractéristique. Un vin d'approche du terroir, précis et salin, dosé à 2,5g/l."
                            },
                            {
                                name: "Mi-Pentes (Extra-Brut)",
                                description: "Un coup de cœur qui illustre la rencontre parfaite entre le Pinot Noir et les sols sableux du domaine, avec un élevage partiel sous bois (68% fûts). Un Champagne ciselé et tranchant. Le profil aromatique est gourmand, évoquant l'amande, la tarte aux pommes et la noisette grillée, tout en conservant une structure droite et une grande pureté saline."
                            },
                            {
                                name: "Millésime 2019 (Brut)",
                                description: "Une cuvée d'assemblage composée de 54% de Pinot Noir et 46% de Chardonnay, issue exclusivement des terroirs Premier Cru d'Écueil. Le nez, complexe et élégant, s'ouvre sur des arômes de fruits à chair blanche et d'agrumes mûrs, complétés par des notes de brioche beurrée et de fruits secs liées à un long vieillissement sur lies. En bouche, l'équilibre de la puissance vineuse du Pinot Noir est parfaitement étirée par la fraîcheur saline du Chardonnay. Dosée à 5g/l, cette cuvée conserve une droiture exemplaire et une finale persistante, marquée par une fine amertume noble."
                            },
                            {
                                name: "Les Chaillots 2017 (Blanc de Noirs Extra-Brut)",
                                description: "Ce Blanc de Noirs parcellaire est le fruit d'une sélection massale de vieilles vignes de Pinot Noir, ancrées sur les sables fins du terroir Premier Cru d'Écueil. À la dégustation, le vin mêle la structure vineuse du Pinot Noir à une élégance aromatique portée sur les fruits rouges mûrs, les notes de sous-bois et une subtile touche toastée. La bouche est ample et profonde, guidée par une tension minérale saline et un dosage très bas."
                            },
                            {
                                name: "Terroir Épanoui (Extra-Brut - Vieillissement prolongé)",
                                description: "Un assemblage pilier du domaine (85% Pinot Noir et 15% Chardonnay) magnifié par un vieillissement prolongé sur lies de plus de sept ans. Le nez s'éloigne du fruit frais pour s'ouvrir sur des notes de fruits secs, de miel d'acacia et de torréfaction. En bouche, la maturité est évidente, offrant une texture onctueuse et patinée, tout en conservant la colonne vertébrale saline et la tension minérale propres au style Lacourte-Godbillon. Un champagne de méditation et de haute gastronomie."
                            },
                            {
                                name: "Mont Âme-Migérats 2017 (Blanc de Blancs Brut)",
                                description: "Cette cuvée parcellaire nous transporte sur le terroir du Mont Aimé, à l'extrémité sud de la Côte des Blancs, où le Chardonnay s'enracine dans une craie affleurante et un sol très calcaire. La robe est d'un or brillant, introduisant un nez particulièrement généreux avec des notes de crème pâtissière, de fruits exotiques et de noyau. En bouche, le vin se distingue par son volume et son onctuosité, équilibrée par la tension crayeuse du terroir. Un Blanc de Blancs de caractère, idéal pour la haute gastronomie."
                            },
                            {
                                name: "Chaillots Hautes Vignes 2020 (Blanc de Blancs Extra-Brut)",
                                description: "Cette cuvée parcellaire est issue d'une sélection de vieilles vignes de Chardonnay sur les hauteurs du terroir d'Écueil. Vinifiée intégralement en fûts avec un tirage sous bouchon liège (agrafe), le vin se distingue par une tension cristalline remarquable. Le nez dévoile un éclat de pomme acidulée et de zestes de citron, enrobé par les nuances finement toastées, épicées et vanillées de l'élevage. En bouche, la texture est à la fois dense et aérienne, portée par une effervescence crémeuse et une minéralité saline persistante."
                            }
                        ]
                    },
                    {
                        category: "Les Rosés",
                        items: [
                            {
                                name: "Rosé d'Assemblage (Extra-Brut)",
                                description: "Ce rosé est élaboré par l'assemblage de vin blanc de base et d'une petite proportion de vin rouge tranquille (Coteaux Champenois) issu du domaine. La robe, d'un rose saumoné très élégant, laisse place à un nez subtil marqué par la finesse de la pêche de vigne, de la groseille et une pointe d'agrumes. En bouche, l'attaque est vive et la structure est bâtie sur la tension plutôt que sur la sucrosité. Le dosage très bas (Extra-Brut) préserve une fraîcheur cristalline et une finale saline."
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Pascal Agrapart',
                x: 462, y: 176,
                location_details: "À Avize - Côte des Blancs - 12 hectares",
                description: "Figure de proue des champagnes de vignerons, classé 3 étoiles par La Revue du Vin de France, Pascal Agrapart gère un patrimoine exceptionnel de 12 hectares dans les Grands Crus de la Côte des Blancs (Avize, Oger, Cramant, Oiry). Sa force : une approche parcellaire chirurgicale, des sols labourés pour forcer les racines dans la craie profonde, et des vinifications aux levures indigènes en vieux demi-muids de 600 litres — sans jamais apporter de goût boisé. Pureté saline et tension cristalline sont sa signature indissociable.",
                wines: [
                    {
                        category: "Les Bulles",
                        items: [
                            {
                                name: "7 Crus (2021/2022)",
                                description: "Porte d'entrée du domaine, cette cuvée assemble les sept villages où Pascal cultive ses vignes, mêlant 90% Chardonnay et 10% Pinot Noir. Le nez est une invitation gourmande sur la pomme verte et les fleurs blanches, soulignée par une pointe de pâtisserie fine. En bouche, le vin se révèle enveloppant et salin, offrant une fraîcheur immédiate et une grande buvabilité grâce à son dosage Extra-Brut très équilibré."
                            },
                            {
                                name: "Terroirs",
                                description: "Blanc de Blancs assemblant quatre villages Grand Cru (Avize, Oger, Cramant, Oiry), dont 25% élevés en fûts de chêne. Le nez est marqué par les noisettes fraîches, le pamplemousse rose et un côté anisé. La bouche est scintillante de pureté, offrant un noyau citronné très sec et une finale crayeuse. Une référence de la minéralité champenoise."
                            },
                            {
                                name: "Minéral 2017",
                                description: "Exercice de géologie appliquée issu de deux parcelles de vieilles vignes (plus de 50 ans) sur un sol très mince où la craie affleure immédiatement. Le nez jaillit avec une pureté cristalline sur des notes de citron, pomme verte et fleurs blanches. À l'aération, la pierre mouillée, la craie fraîche et une touche iodée prennent le dessus, complétées par des nuances bourguignonnes de beurre frais et noisette grillée issues de l'élevage en fûts. Énorme coup de cœur !"
                            },
                            {
                                name: "Avizoise 2017",
                                description: "Une autre facette d'Avize, issue de vignes sur argiles profondes avant la craie. Le vin gagne en densité et richesse avec des arômes de poire pochée, d'amande et de pin. La bouche est enveloppante et charnue, mais parfaitement équilibrée par une tension saline millimétrée. Un champagne de relief qui demande du temps pour se livrer totalement."
                            },
                            {
                                name: "Venus 2018",
                                description: "Cuvée parcellaire portant le nom de la première jument du domaine, qui a inauguré le retour au labour animal. Issue du lieu-dit « La Fosse aux Pourceaux » à Avize, d'une parcelle de Chardonnays plantés en 1959 où aucun engin mécanique n'a foulé le sol depuis des décennies. Le nez s'ouvre sur des notes cristallines de lys et jasmin. L'absence de dosage laisse place à une empreinte minérale saisissante de silex, complétée par des touches de noisette grillée et de pain d'épices. L'attaque est ample et majestueuse, portée par la générosité du millésime 2018."
                            }
                        ]
                    }
                ]
            },
            {
                name: 'De Sousa',
                x: 475, y: 185,
                location_details: "À Avize - Côte des Blancs - 14 hectares - Bio & Biodynamie",
                description: "Figure de proue de la Côte des Blancs, le Domaine De Sousa est aujourd'hui aux mains de la 3ème génération : Charlotte, Julie et Valentin. Pionnier de la viticulture durable, certifié en bio et biodynamie depuis plus de 20 ans, le domaine respecte un principe sacré : le travail du sol au cheval pour ne pas tasser la craie et favoriser un enracinement profond, source de l'expression du terroir.",
                wines: [
                    {
                        category: "Les Bulles",
                        items: [
                            {
                                name: "Chemin des Terroirs",
                                description: "Assemblage des 3 cépages champenois (Chardonnay, Pinot Noir, Meunier) vinifié en cuve inox pendant 7 à 8 mois pour préserver un profil frais et simple. Avec un dosage de 5g, c'est un champagne immédiat et fruité, idéal pour une entrée en matière tout en finesse."
                            },
                            {
                                name: "Réserve Blanc de Blancs",
                                description: "Un 100% Chardonnay (Grand Cru d'Avize, Oger, Cramant) qui exprime parfaitement l'identité De Sousa. À l'image du Chemin des Terroirs avec un dosage à 5g et une vinification en inox, il se révèle plus salin, minéral et tendu. On y retrouve des notes florales et un caractère crayeux persistant."
                            },
                            {
                                name: "Blanc de Noirs (Base 2019)",
                                description: "Un pur Pinot Noir qui bénéficie d'un élevage de 10 mois en fût de chêne suivi de 3 ans de vieillissement en cave. En version Brut Nature, il offre un équilibre magistral entre la fraîcheur du terroir et la gourmandise du fruit mûr."
                            },
                            {
                                name: "3A",
                                description: "Nommée d'après ses trois terroirs d'origine (Avize, Aÿ et Ambonnay), elle assemble 50% Chardonnay pour la fraîcheur et 50% Pinot Noir pour le fruit. Les vins sont pressés ensemble et élevés en fûts, avec l'apport de 30% de réserve perpétuelle débutée en 2014. Le résultat est complexe : des notes d'amande, une texture de crème pâtissière et une touche de fruits exotiques."
                            },
                            {
                                name: "Caudalie",
                                description: "L'emblème du domaine. Ce 100% Chardonnay est issu de vieilles vignes de plus de 50 ans et bénéficie d'une réserve perpétuelle remontant à 1995. L'élevage en fût de chêne lui confère un profil fondu, boisé, crémeux et complexe, d'une longueur en bouche exceptionnelle — d'où son nom faisant référence à l'unité de mesure de la persistance aromatique."
                            },
                            {
                                name: "Rosé Caudalie",
                                description: "Un assemblage précis de 90% Chardonnay et 10% Pinot Noir (provenant d'Aÿ), vinifié en fûts. Le nez évoque un coulis de fruits rouges acidulé, tandis que la bouche reste saline et souple. C'est un compagnon de table incroyable, notamment avec des noisettes torréfiées. Énorme coup de cœur !"
                            },
                            {
                                name: "Umami",
                                description: "Inspirée par un voyage au Japon d'Erick, cette cuvée exceptionnelle ne cherche pas seulement l'arôme, mais le mystique cinquième goût japonais : l'umami. Né d'un assemblage de 60% Chardonnay et 40% Pinot Noir, issu exclusivement de vieilles vignes de plus de 60 ans (Grands Crus d'Avize, Oger, Cramant ; Aÿ et Ambonnay) et d'un élevage méticuleux 100% en fûts de chêne. Elle se distingue par une bouche charnue, presque huileuse, où la richesse des agrumes confits et du beurre noisette rencontre une minéralité crayeuse percutante. Une persistance iodée qui incarne parfaitement la cinquième saveur. Un champagne de haute gastronomie, vibrant et d'une élégance absolue."
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Moussé Fils',
                x: 449, y: 165,
                location_details: "À Cuisles - Vallée de la Marne - 7 hectares - Bio & Biodynamie",
                description: "Cédric Moussé est l'un des vignerons les plus passionnants de la Vallée de la Marne. Installé à Cuisles, il travaille ses 7 hectares avec une obsession : révéler la noblesse du Meunier, cépage longtemps méprisé. Sa philosophie repose sur la réserve perpétuelle (solera débutée en 2003), le travail des argiles (illites) du secteur et une précision millimétrée du dosage. Un domaine pédagogique autant qu'émotionnel.",
                wines: [
                    {
                        category: "Les Bulles",
                        items: [
                            {
                                name: "L'Esquisse (Base 2023)",
                                description: "Assemblage de 70% Meunier et 30% Pinot Noir, où l'utilisation judicieuse des tailles de Meunier (le second jus) apporte une souplesse immédiate. C'est la porte d'entrée idéale pour découvrir le domaine. À la dégustation, le vin se révèle légèrement citronné et fruité, porté par une belle rondeur malgré un dosage très bas de 1,5g qui préserve sa tension."
                            },
                            {
                                name: "L'Esquisse Blanc de Blancs (Base 2022)",
                                description: "Issue d'une parcelle de Chardonnay en bas de coteau et en conversion bio, cette version propose une approche encore plus directe. Bien que non dosé, ce champagne garde une petite sucrosité naturelle qui le rend assez facile à boire."
                            },
                            {
                                name: "Eugène",
                                description: "La cuvée phare du domaine (80% Meunier, 20% Pinot Noir). Sa vinification repose sur une réserve perpétuelle (solera) initiée en 2003, conservée uniquement en cuves inox et béton pour éviter tout marquage boisé. Cette technique permet de marier la vivacité du millésime récent (2023) à la complexité tertiaire des vins clairs vieux de 20 ans, signature d'un savoir-faire intergénérationnel."
                            },
                            {
                                name: "Eugène Rosé",
                                description: "L'Eugène Rosé pousse l'exercice encore plus loin en assemblant deux réserves perpétuelles (une blanche et une rouge) sur une même période de vingt ans (2003-2023). Le nez est hyper fruité, explosant sur des notes de fraise acidulée et de pamplemousse rose, tout en gardant une acidité vibrante et une grande fraîcheur en finale."
                            },
                            {
                                name: "Les Vignes de mon Village",
                                description: "Champagne non dosé issu d'une réserve plus récente (2014-2022). On y découvre un nez atypique et séduisant d'agrumes, de clémentine et de vanille, débouchant sur une bouche dont la rondeur naturelle équilibre parfaitement l'absence totale de sucre."
                            },
                            {
                                name: "Les Terres d'Illites 2022",
                                description: "Une cuvée pédagogique centrée sur les argiles vertes (illites) du secteur de Cuisles. Ce vin de gastronomie se montre structuré et précis, offrant une lecture directe de l'influence du sol sur le Meunier."
                            },
                            {
                                name: "Les Fortes Terres 2019",
                                description: "Cuvée 100% Meunier de caractère, taillée pour la haute gastronomie. Issue du millésime 2019, elle est l'aboutissement d'une recherche de puissance et de maturité. Avec seulement 3g de sucre, le dosage est d'une précision chirurgicale : il ne sert pas à sucrer, mais simplement à souligner l'amertume noble du Meunier et la richesse extraite des argiles brunes du domaine."
                            },
                            {
                                name: "L'Orage 2021",
                                description: "L'Orage 2021 raconte une histoire de solidarité champenoise après un sinistre climatique. Élaborée à partir de Chardonnay offert par des vignerons amis pour sauver les pertes du domaine, elle dégage une fraîcheur, une tension et une minéralité remarquables, soulignées par une note délicate d'amande."
                            }
                        ]
                    },
                    {
                        category: "Spiritueux",
                        items: [
                            {
                                name: "Ratafia de Meunier",
                                description: "Une rareté élaborée à partir des derniers jus de presse (rebêches), mutés puis élevés deux ans sur le toit du chai. Ce passage en plein air, soumis aux contrastes thermiques, forge un caractère oxydatif unique aux notes de fruits confits et d'épices. Très loin des standards sucrés, il exprime une profondeur aromatique saisissante. Un flacon idéal pour escorter un dessert aux fruits d'automne ou un fromage de caractère."
                            }
                        ]
                    }
                ]
            }
        ]
    }
}


// ============================================================
//  État de l'application
// ============================================================
let currentRegion  = null;
let currentDomaine = null;
let currentWine    = null;
let currentView    = 'map'; // 'map' | 'region' | 'domaine' | 'wine' | 'search'
let initialViewBox = null;
let activeFilter   = 'all';
let searchIndex    = null; // index plat des vins, construit au 1er appel


// ============================================================
//  Utilitaires catégories
// ============================================================
function getCategoryRank(category) {
    if (!category) return 99;
    const c = category.toLowerCase()
        .replace(/^les\s+/, '')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .trim();
    if (c.includes('blanc') || c.includes('jaune') || c.includes('paille')) return 0;
    if (c.includes('rose'))   return 1;
    if (c.includes('rouge'))  return 2;
    if (c.includes('bulle') || c.includes('effervescent') || c.includes('cremant')) return 3;
    if (c.includes('macera') || c.includes('curiosit')) return 4;
    return 5;
}

function getCategoryFilterKey(category) {
    if (!category) return 'other';
    const c = category.toLowerCase()
        .replace(/^les\s+/, '')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .trim();
    if (c.includes('blanc') || c.includes('jaune') || c.includes('paille')) return 'blanc';
    if (c.includes('rose'))   return 'rose';
    if (c.includes('rouge'))  return 'rouge';
    if (c.includes('bulle') || c.includes('effervescent') || c.includes('cremant') || c.includes('petillant')) return 'bulles';
    if (c.includes('macera') || c.includes('macere') || c.includes('curiosit')) return 'maceration';
    return 'other';
}

// ============================================================
//  Animation viewBox (conservée — utilise rAF correctement)
// ============================================================
function easeInOutCubic(t) {
    return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
}

function animateViewBox(start, target, duration = 700) {
    const svg = document.getElementById('france-map');
    const startTime = performance.now();

    function step(now) {
        const p = Math.min((now - startTime) / duration, 1);
        const e = easeInOutCubic(p);
        const vb = start.map((s, i) => s + (target[i] - s) * e);
        svg.setAttribute('viewBox', vb.join(' '));
        if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function calculateTargetViewBox(element) {
    const svg    = document.getElementById('france-map');
    const bbox   = element.getBBox();
    const pad    = 0.7;
    const padX   = bbox.width  * pad;
    const padY   = bbox.height * pad;
    const tW     = bbox.width  + padX * 2;
    const tH     = bbox.height + padY * 2;
    const ratio  = svg.clientWidth / svg.clientHeight;
    let fW = tW, fH = tH;
    if (tW / tH > ratio) fH = fW / ratio; else fW = fH * ratio;
    const fX = window.innerWidth > 768
        ? (bbox.x + bbox.width/2) - fW * 0.25
        : bbox.x - padX - (fW - tW)/2;
    const fY = bbox.y - padY - (fH - tH)/2;
    return [fX, fY, fW, fH];
}

// ============================================================
//  Moteur de recherche global
// ============================================================

function buildSearchIndex() {
    searchIndex = [];
    for (const [regionId, region] of Object.entries(WINE_DATA)) {
        region.domaines.forEach((domaine, domaineIdx) => {
            const hasCategories = domaine.wines.length > 0 && domaine.wines[0].category;
            if (hasCategories) {
                domaine.wines.forEach((cat, catIdx) => {
                    if (!cat.items) return;
                    cat.items.forEach((wine, itemIdx) => {
                        searchIndex.push({
                            regionId,   regionName: region.name,
                            domaineIdx, domaineName: domaine.name,
                            domaineLocation: domaine.location_details || '',
                            domaineDesc: domaine.description || '',
                            wineRef: `${catIdx}-${itemIdx}`,
                            wineName: wine.name || '',
                            wineDesc: wine.description || '',
                            category: cat.category || ''
                        });
                    });
                });
            } else {
                domaine.wines.forEach((wine, wineIdx) => {
                    searchIndex.push({
                        regionId,   regionName: region.name,
                        domaineIdx, domaineName: domaine.name,
                        domaineLocation: domaine.location_details || '',
                        domaineDesc: domaine.description || '',
                        wineRef: String(wineIdx),
                        wineName: wine.name || '',
                        wineDesc: wine.description || '',
                        category: wine.type_category || ''
                    });
                });
            }
        });
    }
}

function norm(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function countIn(haystack, needle) {
    const h = norm(haystack), n = norm(needle);
    if (!n || n.length < 2) return 0;
    let c = 0, p = 0;
    while ((p = h.indexOf(n, p)) !== -1) { c++; p += n.length; }
    return c;
}

function scoreEntry(e, terms) {
    let s = 0;
    for (const t of terms) {
        s += countIn(e.wineName,        t) * 5;
        s += countIn(e.category,        t) * 4;
        s += countIn(e.domaineName,     t) * 4;
        s += countIn(e.domaineLocation, t) * 3;
        s += countIn(e.wineDesc,        t) * 3;
        s += countIn(e.domaineDesc,     t) * 2;
        s += countIn(e.regionName,      t) * 2;
    }
    return s;
}

function performSearch(query) {
    if (!searchIndex) buildSearchIndex();
    const terms = norm(query).split(/\s+/).filter(t => t.length >= 2);
    if (!terms.length) return [];
    return searchIndex
        .map(e => ({ e, s: scoreEntry(e, terms) }))
        .filter(r => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 60)
        .map(r => r.e);
}

function showSearchResults(query, results) {
    currentView = 'search';
    const content = document.getElementById('panel-content');

    if (!results.length) {
        content.innerHTML = `
            <h2>Recherche</h2>
            <p class="search-meta">« ${query} »</p>
            <div class="search-empty">Aucun résultat.<br><small>Essayez un cépage, un arôme, une région…</small></div>`;
    } else {
        const cards = results.map(r => {
            const { displayName, vintage } = parseWineName(r.wineName);
            const catBadge = r.category
                ? `<span class="vintage-badge" style="background:var(--green-mid);font-size:.68em">${r.category}</span>`
                : '';
            return `
            <div class="search-result-card" role="button" tabindex="0"
                 onclick="openSearchResult('${r.regionId}',${r.domaineIdx},'${r.wineRef}')"
                 onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openSearchResult('${r.regionId}',${r.domaineIdx},'${r.wineRef}')}"
                 aria-label="${displayName}">
                <img src="logo%20vignoble.png" alt="" class="domain-logo" loading="lazy" onerror="this.style.display='none'">
                <div class="search-result-body">
                    <div class="search-result-name">${displayName}</div>
                    <div class="search-result-domaine">${r.domaineName}</div>
                    <div class="search-result-region">${r.regionName}</div>
                </div>
                <div class="search-result-badge">
                    ${vintage ? `<div class="vintage-badge">${vintage}</div>` : ''}
                    ${catBadge}
                </div>
            </div>`;
        }).join('');

        content.innerHTML = `
            <h2>Résultats</h2>
            <p class="search-meta">${results.length} cuvée${results.length > 1 ? 's' : ''} pour « ${query} »</p>
            ${cards}
            <button class="btn btn-secondary" onclick="returnToMap()">← Retour à la carte</button>`;
    }

    showPanel();
    document.getElementById('back-button').classList.remove('hidden');
}

function openSearchResult(regionId, domaineIdx, wineRef) {
    currentRegion  = regionId;
    currentDomaine = domaineIdx;
    const svg = document.getElementById('france-map');
    if (!initialViewBox) initialViewBox = svg.getAttribute('viewBox').split(' ').map(Number);
    const path = svg.querySelector(`path[data-numerodepartement="${regionId}"]`);
    if (path) {
        svg.querySelectorAll('.wine-region.active').forEach(p => p.classList.remove('active'));
        path.classList.add('active');
        animateViewBox(svg.getAttribute('viewBox').split(' ').map(Number), calculateTargetViewBox(path));
        renderMarkers(WINE_DATA[regionId].domaines);
    }
    document.getElementById('back-button').classList.remove('hidden');
    showWineView(wineRef);
}

function initSearch() {
    buildSearchIndex(); // pré-construit l'index dès le chargement

    const input    = document.getElementById('search-input');
    const clearBtn = document.getElementById('search-clear');
    let timer = null;

    input.addEventListener('input', () => {
        const q = input.value.trim();
        clearBtn.classList.toggle('visible', q.length > 0);
        clearTimeout(timer);
        if (!q) { if (currentView === 'search') returnToMap(); return; }
        timer = setTimeout(() => showSearchResults(q, performSearch(q)), 200);
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.classList.remove('visible');
        input.focus();
        if (currentView === 'search') returnToMap();
    });

    input.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            input.value = '';
            clearBtn.classList.remove('visible');
            input.blur();
            if (currentView === 'search') returnToMap();
        }
    });
}

// ============================================================
//  Contrôle du panel
// ============================================================
function showPanel() {
    document.getElementById('info-panel').classList.add('visible');
    document.getElementById('title-overlay').classList.add('hidden');
}

function hidePanel() {
    const panel = document.getElementById('info-panel');
    panel.classList.remove('visible');
    panel.classList.remove('fullscreen');
    document.getElementById('title-overlay').classList.remove('hidden');
}


// ============================================================
//  Initialisation
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('france-map');

    svg.addEventListener('click', handleMapClick);

    // Fermer le popup de l'indicateur de carte au clic en dehors
    document.addEventListener('click', e => {
        if (!e.target.closest('#map-indicator') && !e.target.closest('#map-indicator-popup')) {
            const popup = document.getElementById('map-indicator-popup');
            if (popup) popup.classList.add('hidden');
        }
    });

    // Fermer panel au clic sur le conteneur hors SVG
    document.getElementById('map-container').addEventListener('click', e => {
        if (e.target === document.getElementById('map-container') && currentView !== 'map') {
            returnToMap();
        }
    });

    // Accessibilité clavier sur les régions viticoles
    svg.querySelectorAll('path.wine-region').forEach(path => {
        path.setAttribute('tabindex', '0');
        const num  = path.getAttribute('data-numerodepartement');
        const data = WINE_DATA[num];
        if (data) {
            path.setAttribute('role', 'button');
            path.setAttribute('aria-label', `${data.name} — cliquer pour explorer`);
        }
    });

    svg.addEventListener('keydown', e => {
        if (e.target.classList.contains('wine-region') && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            e.target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
    });

    initSearch();
});


// ============================================================
//  Utilitaires noms de vins
// ============================================================
function parseWineName(name) {
    const match = name.match(/\b(19|20)\d{2}\b/);
    if (match) {
        const vintage = match[0];
        const displayName = name.replace(vintage, '').replace(/\s{2,}/g, ' ').trim();
        return { displayName, vintage };
    }
    return { displayName: name, vintage: null };
}


// ============================================================
//  Gestion du clic sur la carte
// ============================================================
function handleMapClick(e) {
    // Clic sur un marqueur de domaine → ne pas interférer
    if (e.target.closest('#markers-container')) return;

    // En mode Ma Carte : clic sur le fond (hors pastille) → fermer le panneau info
    if (typeof maCarteActive !== 'undefined' && maCarteActive) {
        if (!e.target.closest('.mc-pin')) closeMcInfoPanel();
        return;
    }

    const path = e.target.closest('path.wine-region');
    if (!path) {
        // Clic sur le fond de la carte → retour à l'accueil
        if (currentView !== 'map') returnToMap();
        return;
    }

    const num = path.getAttribute('data-numerodepartement');
    if (!WINE_DATA[num]) return;

    const svg = document.getElementById('france-map');
    if (!initialViewBox) initialViewBox = svg.getAttribute('viewBox').split(' ').map(Number);

    svg.querySelectorAll('.wine-region.active').forEach(p => p.classList.remove('active'));
    path.classList.add('active');

    animateViewBox(
        svg.getAttribute('viewBox').split(' ').map(Number),
        calculateTargetViewBox(path)
    );

    currentRegion = num;
    renderMarkers(WINE_DATA[num].domaines);
    showRegionView(num);
}


// ============================================================
//  Marqueurs SVG des domaines
// ============================================================
function renderMarkers(domaines) {
    const container = document.getElementById('markers-container');
    container.innerHTML = '';

    const labelH   = 7;
    const iconSize  = 4;
    const padX      = 1.4;
    const fontSize  = 3.2;
    const charW     = 1.85; // largeur estimée par caractère (font-size 3.2)

    domaines.forEach((domaine, idx) => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('marker-group');
        g.setAttribute('role', 'button');
        g.setAttribute('tabindex', '0');
        g.setAttribute('aria-label', domaine.name);

        const x = domaine.x;
        const y = domaine.y;

        const displayName = domaine.name.length > 24 ? domaine.name.substring(0, 24) + '…' : domaine.name;
        const textW  = displayName.length * charW;
        const labelW = padX + iconSize + padX + textW + padX;
        const lx     = x - labelW / 2;
        const ly     = y - labelH / 2;
        const r      = labelH / 2; // pill entièrement arrondie

        // Fond blanc en pilule
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', lx);
        rect.setAttribute('y', ly);
        rect.setAttribute('width', labelW);
        rect.setAttribute('height', labelH);
        rect.setAttribute('rx', r);
        rect.setAttribute('ry', r);
        rect.setAttribute('fill', 'white');
        rect.setAttribute('stroke', 'rgba(95,111,82,0.35)');
        rect.setAttribute('stroke-width', '0.5');

        // Icône logo
        const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        img.setAttribute('href', 'logo%20vignoble.png');
        img.setAttribute('x', lx + padX);
        img.setAttribute('y', ly + (labelH - iconSize) / 2);
        img.setAttribute('width', iconSize);
        img.setAttribute('height', iconSize);
        img.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        // Nom du domaine
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.classList.add('marker-text');
        text.setAttribute('x', lx + padX + iconSize + padX);
        text.setAttribute('y', y);
        text.setAttribute('font-size', fontSize);
        text.setAttribute('dominant-baseline', 'middle');
        text.textContent = displayName;

        g.appendChild(rect);
        g.appendChild(img);
        g.appendChild(text);

        g.addEventListener('click', () => {
            currentDomaine = idx;
            showDomaineView(idx);
        });
        g.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentDomaine = idx;
                showDomaineView(idx);
            }
        });

        container.appendChild(g);
    });
}


// ============================================================
//  Vue liste des domaines d'une région
// ============================================================
function showRegionView(regionId) {
    currentView = 'region';
    const region = WINE_DATA[regionId];
    const content = document.getElementById('panel-content');

    const cards = region.domaines.map((domaine, idx) => {
        const wineCount = domaine.wines.reduce((acc, w) => {
            return acc + (w.items ? w.items.length : 1);
        }, 0);
        const _inItin2 = isInItinerary(regionId, idx);
        return `
        <div class="domain-card" role="button" tabindex="0"
             onclick="selectDomaine(${idx})"
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();selectDomaine(${idx})}"
             aria-label="${domaine.name}">
            <img src="logo%20vignoble.png" alt="" class="domain-logo" loading="lazy" onerror="this.style.display='none'">
            <div style="flex:1">
                <div class="domain-name">${domaine.name}</div>
                ${domaine.location_details ? `<div class="domain-sub">${domaine.location_details}</div>` : ''}
            </div>
            <div class="vintage-badge">${wineCount} cuvée${wineCount > 1 ? 's' : ''}</div>
            <button class="itin-card-add ${_inItin2 ? 'itin-card-add--done' : ''}"
                    onclick="event.stopPropagation(); addToItinerary('${regionId}', ${idx})"
                    title="${_inItin2 ? 'Dans l\'itinéraire' : 'Ajouter à l\'itinéraire'}"
                    aria-label="${_inItin2 ? 'Dans l\'itinéraire' : 'Ajouter à l\'itinéraire'}">
                ${_inItin2 ? '✓' : '+'}
            </button>
        </div>`;
    }).join('');

    content.innerHTML = `
        <h2>${region.name}</h2>
        <p class="breadcrumb">${region.domaines.length} domaine${region.domaines.length > 1 ? 's' : ''} viticole${region.domaines.length > 1 ? 's' : ''}</p>
        ${cards}`;

    content.scrollTop = 0;
    showPanel();
    document.getElementById('back-button').classList.remove('hidden');
}

function selectDomaine(idx) {
    currentDomaine = idx;
    showDomaineView(idx);
}


// ============================================================
//  Vue détail d'un domaine
// ============================================================
function showDomaineView(idx) {
    currentView = 'domaine';
    const region = WINE_DATA[currentRegion];
    const domaine = region.domaines[idx];
    const content = document.getElementById('panel-content');

    const hasCategories = domaine.wines.length > 0 && domaine.wines[0].category;

    // Images
    let imagesHtml = '';
    if (domaine.images && domaine.images.length > 0) {
        const imgs = domaine.images.map(src => `<img src="${src}" alt="" loading="lazy" onclick="openLightbox(this.src)">`).join('');
        imagesHtml = `<div class="domain-images">${imgs}</div>`;
    }

    // Barre de filtres
    let filterHtml = '';
    if (hasCategories) {
        const catKeys = [...new Set(domaine.wines.map(c => getCategoryFilterKey(c.category)))];
        const catLabels = { blanc: 'Blancs', rose: 'Rosés', rouge: 'Rouges', bulles: 'Bulles', maceration: 'Macérations', other: 'Autres' };
        const filterBtns = [
            `<button class="filter-btn active" onclick="applyFilter('all',this)">Tout</button>`,
            ...catKeys.map(k => `<button class="filter-btn" onclick="applyFilter('${k}',this)">${catLabels[k] || k}</button>`)
        ].join('');
        filterHtml = `<div class="filter-bar">${filterBtns}</div>`;
    }

    const safeDomN = domaine.name.replace(/'/g, "\\'");
    const safeRegN = region.name.replace(/'/g, "\\'");

    // Liste des vins
    let winesHtml = '';
    if (hasCategories) {
        const sortedCats = [...domaine.wines].sort((a, b) => getCategoryRank(a.category) - getCategoryRank(b.category));
        winesHtml = sortedCats.map(cat => {
            const origIdx = domaine.wines.indexOf(cat);
            const filterKey = getCategoryFilterKey(cat.category);
            const items = (cat.items || []).map((wine, itemIdx) => {
                const { displayName, vintage } = parseWineName(wine.name || '');
                const wineRef = `${origIdx}-${itemIdx}`;
                const kws = extractKeywords(wine.description || '');
                const kwAttr = kws.length ? `data-keywords="${kws.join('|')}"` : '';
                const tagsHtml = kws.length
                    ? `<div class="wine-tags"><span class="wine-tags-label">Mots-clés :</span>${kws.map(k => `<span class="wine-tag" data-keyword="${k}" onclick="filterByKeyword(event,'${k}')">${k}</span>`).join('')}</div>`
                    : '';
                const wFavKey = `${currentRegion}_${idx}_${wineRef}`;
                const isWFav  = typeof userFavorites !== 'undefined' && !!userFavorites[wFavKey];
                const safeWN  = displayName.replace(/'/g, "\\'");
                return `
                <div class="domain-card" ${kwAttr} role="button" tabindex="0"
                     onclick="showWineView('${wineRef}')"
                     onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();showWineView('${wineRef}')}"
                     aria-label="${displayName}">
                    <img src="logo%20vignoble.png" alt="" class="domain-logo" loading="lazy" onerror="this.style.display='none'">
                    <div style="flex:1">
                        <div class="domain-name">${displayName}</div>
                        ${tagsHtml}
                    </div>
                    ${vintage ? `<div class="vintage-badge">${vintage}</div>` : ''}
                    <button class="heart-btn ${isWFav ? 'is-fav' : ''}" data-fav-key="${wFavKey}"
                            onclick="event.stopPropagation();toggleFavorite('${currentRegion}',${idx},'${wineRef}','${safeWN}','${safeDomN}','${safeRegN}')"
                            title="${isWFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
                            aria-label="${isWFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}">${isWFav ? '♥' : '♡'}</button>
                </div>`;
            }).join('');
            return `
            <div class="wine-category-section" data-filter="${filterKey}">
                <div class="wine-category-title">${cat.category}</div>
                ${items}
            </div>`;
        }).join('');
    } else {
        winesHtml = domaine.wines.map((wine, wineIdx) => {
            const { displayName, vintage } = parseWineName(wine.name || '');
            const kws = extractKeywords(wine.description || '');
            const kwAttr = kws.length ? `data-keywords="${kws.join('|')}"` : '';
            const tagsHtml = kws.length
                ? `<div class="wine-tags"><span class="wine-tags-label">Mots-clés :</span>${kws.map(k => `<span class="wine-tag" data-keyword="${k}" onclick="filterByKeyword(event,'${k}')">${k}</span>`).join('')}</div>`
                : '';
            const wFavKey = `${currentRegion}_${idx}_${wineIdx}`;
            const isWFav  = typeof userFavorites !== 'undefined' && !!userFavorites[wFavKey];
            const safeWN  = displayName.replace(/'/g, "\\'");
            return `
            <div class="domain-card" ${kwAttr} role="button" tabindex="0"
                 onclick="showWineView('${wineIdx}')"
                 onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();showWineView('${wineIdx}')}"
                 aria-label="${displayName}">
                <img src="logo%20vignoble.png" alt="" class="domain-logo" loading="lazy" onerror="this.style.display='none'">
                <div style="flex:1">
                    <div class="domain-name">${displayName}</div>
                    ${tagsHtml}
                </div>
                ${vintage ? `<div class="vintage-badge">${vintage}</div>` : ''}
                ${wine.price ? `<div class="vintage-badge" style="background:var(--green-mid)">${wine.price}</div>` : ''}
                <button class="heart-btn ${isWFav ? 'is-fav' : ''}" data-fav-key="${wFavKey}"
                        onclick="event.stopPropagation();toggleFavorite('${currentRegion}',${idx},'${wineIdx}','${safeWN}','${safeDomN}','${safeRegN}')"
                        title="${isWFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
                        aria-label="${isWFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}">${isWFav ? '♥' : '♡'}</button>
            </div>`;
        }).join('');
    }

    // Bouton "Ajouter à mon itinéraire"
    const _inItin    = isInItinerary(currentRegion, idx);
    const itinBtnHtml = `
        <button class="btn-add-to-itin ${_inItin ? 'added' : ''}"
                data-rid="${currentRegion}"
                data-didx="${idx}"
                onclick="addToItinerary('${currentRegion}', ${idx})"
                ${_inItin ? 'disabled' : ''}>
            <span class="btn-add-to-itin-icon">${_inItin ? '✓' : '+'}</span>
            ${_inItin ? 'Dans votre itinéraire' : 'Ajouter à mon itinéraire'}
        </button>`;

    content.innerHTML = `
        <p class="breadcrumb">${region.name}</p>
        <h2>${domaine.name}</h2>
        ${domaine.location_details ? `<p class="domain-location">${domaine.location_details}</p>` : ''}
        ${itinBtnHtml}
        ${imagesHtml}
        ${domaine.description ? `<div class="domain-description">${domaine.description}</div>` : ''}
        ${filterHtml}
        ${winesHtml}`;

    content.scrollTop = 0;
    showPanel();
    document.getElementById('back-button').classList.remove('hidden');
}


// ============================================================
//  Vue détail d'un vin
// ============================================================
function showWineView(wineRef) {
    currentView = 'wine';
    currentWine = wineRef;
    const region = WINE_DATA[currentRegion];
    const domaine = region.domaines[currentDomaine];
    const content = document.getElementById('panel-content');

    const hasCategories = domaine.wines.length > 0 && domaine.wines[0].category;

    let wine = null;
    let categoryName = '';

    if (hasCategories && String(wineRef).includes('-')) {
        const [catIdx, itemIdx] = String(wineRef).split('-').map(Number);
        const cat = domaine.wines[catIdx];
        wine = cat && cat.items ? cat.items[itemIdx] : null;
        categoryName = cat ? cat.category : '';
    } else {
        wine = domaine.wines[parseInt(wineRef)];
    }

    if (!wine) return;

    const { displayName, vintage } = parseWineName(wine.name || '');
    const kws = extractKeywords(wine.description || '');
    const detailTagsHtml = kws.length
        ? `<div class="wine-tags wine-tags-detail"><span class="wine-tags-label">Mots-clés :</span>${kws.map(k => `<span class="wine-tag wine-tag-static">${k}</span>`).join('')}</div>`
        : '';

    content.innerHTML = `
        <p class="breadcrumb">${region.name} · ${domaine.name}</p>
        <h2>${displayName}</h2>
        ${vintage ? `<div class="vintage-badge" style="display:inline-block;margin-bottom:12px">${vintage}</div>` : ''}
        ${categoryName ? `<p class="domain-location">${categoryName}</p>` : ''}
        <div class="wine-details">
            <p>${wine.description || ''}</p>
            ${wine.price ? `<p><strong>Prix :</strong> ${wine.price}</p>` : ''}
        </div>
        ${detailTagsHtml}
        <button class="btn btn-secondary" onclick="showDomaineView(${currentDomaine})">← Retour au domaine</button>`;

    content.scrollTop = 0;
    showPanel();
    document.getElementById('back-button').classList.remove('hidden');
}


// ============================================================
//  Mots-clés automatiques
// ============================================================
const KEYWORD_RULES = [
    { tag: 'Bio',             tests: [/biolog/i, /biodynam/i] },
    { tag: 'Minéral',         tests: [/minéral/i, /pierre à fusil/i, /silex/i] },
    { tag: 'Salin',           tests: [/salin/i, /iodé/i] },
    { tag: 'Frais',           tests: [/fraîch/i, /désaltér/i, /vivacité/i] },
    { tag: 'Floral',          tests: [/floral/i, /fleurs?\s/i] },
    { tag: 'Fruité',          tests: [/\bfruité/i] },
    { tag: 'Épicé',           tests: [/épicé/i, /\bépices\b/i, /\bpoivre\b/i] },
    { tag: 'Gourmand',        tests: [/gourmand/i] },
    { tag: 'Tendu',           tests: [/\btension\b/i, /\btendu\b/i] },
    { tag: 'Boisé',           tests: [/élevage en fût/i, /barrique/i, /fût de chêne/i] },
    { tag: 'Sur Lie',         tests: [/sur lie/i] },
    { tag: 'Oxydatif',        tests: [/oxydati/i, /sous voile/i] },
    { tag: 'Macération',      tests: [/macérati/i, /pelliculair/i, /vin orange/i] },
    { tag: 'Pét-Nat',         tests: [/ancestrale/i, /levures? indigène/i] },
    { tag: 'Bulles',          tests: [/crémant/i, /champagn/i, /mousseux/i, /effervescent/i] },
    { tag: 'Vin Jaune',       tests: [/vin jaune/i] },
    { tag: 'Vieilles Vignes', tests: [/vieilles? vignes?/i, /centenair/i] },
    { tag: 'Garde',           tests: [/potentiel de garde/i, /taillé pour la garde/i] },
    { tag: 'Léger',           tests: [/\binfusion\b/i, /glouglou/i, /\bléger\b/i] },
    { tag: 'Tanins fins',     tests: [/tanins? fins?/i, /tanins? soyeux/i, /tanins? légers?/i] },
    { tag: 'Ample',           tests: [/\bample\b/i, /\bampleur\b/i] },
    { tag: 'Acidulé',         tests: [/acidulé/i] },
    { tag: 'Onctueux',        tests: [/onctueux/i, /onctuosité/i] },
];

function extractKeywords(description) {
    const MAX = 4;
    const found = [];
    for (const rule of KEYWORD_RULES) {
        if (found.length >= MAX) break;
        if (rule.tests.some(re => re.test(description))) {
            found.push(rule.tag);
        }
    }
    return found;
}

function filterByKeyword(event, keyword) {
    event.stopPropagation();
    const panel  = document.getElementById('panel-content');
    const cards  = panel.querySelectorAll('.domain-card[data-keywords]');
    const tag    = event.currentTarget;
    const isActive = tag.classList.contains('tag-active');

    // Reset
    cards.forEach(c => c.classList.remove('tag-match', 'tag-dim'));
    panel.querySelectorAll('.wine-tag').forEach(t => t.classList.remove('tag-active'));

    if (!isActive) {
        cards.forEach(c => {
            const kws = c.dataset.keywords.split('|');
            c.classList.add(kws.includes(keyword) ? 'tag-match' : 'tag-dim');
        });
        panel.querySelectorAll(`.wine-tag[data-keyword="${keyword}"]`).forEach(t => {
            t.classList.add('tag-active');
        });
    }
}


// ============================================================
//  Filtre par couleur (vue domaine)
// ============================================================
function applyFilter(key, btn) {
    activeFilter = key;
    const panel = document.getElementById('panel-content');
    panel.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    panel.querySelectorAll('.wine-category-section').forEach(section => {
        if (key === 'all' || section.dataset.filter === key) {
            section.removeAttribute('data-hidden');
        } else {
            section.dataset.hidden = 'true';
        }
    });
}


// ============================================================
//  Retour à la carte
// ============================================================
function returnToMap() {
    currentView = 'map';
    currentRegion = null;
    currentDomaine = null;
    currentWine = null;
    activeFilter = 'all';
    if (typeof exitFavoritesMode === 'function') exitFavoritesMode();

    const svg = document.getElementById('france-map');
    svg.querySelectorAll('.wine-region.active').forEach(p => p.classList.remove('active'));
    document.getElementById('markers-container').innerHTML = '';

    if (initialViewBox) {
        animateViewBox(svg.getAttribute('viewBox').split(' ').map(Number), initialViewBox);
    }

    hidePanel();
    document.getElementById('back-button').classList.add('hidden');
    const inp = document.getElementById('search-input');
    if (inp) { inp.value = ''; }
    const clr = document.getElementById('search-clear');
    if (clr) { clr.classList.remove('visible'); }
}

// ============================================================
//  PLANIFICATEUR D'ITINÉRAIRE INTELLIGENT
//  Wine Basket · TSP · Google Maps · PDF
// ============================================================

// --- Constantes de conversion SVG → km ---------------------
// Le viewBox SVG couvre la France (~1000 km E-O, ~980 km N-S)
// sur 560 unités horizontales et 555 unités verticales.
const ITIN_KM_PER_X    = 1.79;   // km par unité SVG (axe X)
const ITIN_KM_PER_Y    = 1.77;   // km par unité SVG (axe Y)
const ITIN_ROAD_FACTOR = 1.35;   // vol d'oiseau → route réelle
const ITIN_SPEED_KMH   = 80;     // vitesse moyenne estimée (km/h)

// --- État -----------------------------------------------
let itineraryItems    = [];   // [{id, regionId, domaineIdx, name, location, x, y}]
let itinerarySidebarOpen = false;
let itineraryOptimized   = false;

// --- Utilitaires ----------------------------------------
function itinId(regionId, domaineIdx) {
    return `${regionId}_${domaineIdx}`;
}

function isInItinerary(regionId, domaineIdx) {
    return itineraryItems.some(
        item => item.regionId === regionId && item.domaineIdx === domaineIdx
    );
}

function isInItineraryMc(markerId) {
    return itineraryItems.some(item => item.mcMarkerId === markerId);
}

function addMcMarkerToItinerary(markerId) {
    if (isInItineraryMc(markerId)) {
        itinToast('Déjà dans votre itinéraire 😊');
        return;
    }
    const m = typeof maCarteMarkers !== 'undefined' && maCarteMarkers[markerId];
    if (!m) return;

    itineraryItems.push({
        id:         `mc_${markerId}`,
        mcMarkerId: markerId,
        name:       m.name,
        location:   m.address || m.name,
        x:          m.x,
        y:          m.y
    });
    itineraryOptimized = false;

    renderItinerary();
    updateItinFab();
    itinFabPulse();
    updateMcItinBtn(markerId);

    if (itineraryItems.length === 1) openItinerary();

    itinToast(`📍 ${m.name} ajouté à l'itinéraire !`);
}

function updateMcItinBtn(markerId) {
    const btn = document.querySelector(`.btn-add-to-itin[data-mc-id="${markerId}"]`);
    if (!btn) return;
    const inItin = isInItineraryMc(markerId);
    if (inItin) {
        btn.classList.add('added');
        btn.innerHTML = '<span class="btn-add-to-itin-icon">✓</span> Dans votre itinéraire';
        btn.disabled  = true;
    } else {
        btn.classList.remove('added');
        btn.innerHTML = '<span class="btn-add-to-itin-icon">+</span> Ajouter à mon itinéraire';
        btn.disabled  = false;
    }
}

// Distance crow-fly × facteur route, en km
function itinCalcDistance(a, b) {
    const dx = (a.x - b.x) * ITIN_KM_PER_X;
    const dy = (a.y - b.y) * ITIN_KM_PER_Y;
    return Math.sqrt(dx * dx + dy * dy) * ITIN_ROAD_FACTOR;
}

// Distance totale d'une séquence
function itinTotalKm(items) {
    let total = 0;
    for (let i = 0; i < items.length - 1; i++) {
        total += itinCalcDistance(items[i], items[i + 1]);
    }
    return Math.round(total);
}

// Formater km → durée (hXXmin)
function itinFormatTime(km) {
    const mins  = Math.round((km / ITIN_SPEED_KMH) * 60);
    const h     = Math.floor(mins / 60);
    const m     = mins % 60;
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h}h`;
    return `${h}h${String(m).padStart(2, '0')}`;
}

// Extraire la ville depuis location_details
function itinExtractCity(loc) {
    if (!loc) return null;
    const clean = loc.replace(/<[^>]+>/g, '');          // strip HTML
    const m     = clean.match(/^[AÀ]\s+([^-,]+)/i);
    return m ? m[1].trim() : null;
}

// --- Actions principales --------------------------------

function addToItinerary(regionId, domaineIdx) {
    if (isInItinerary(regionId, domaineIdx)) {
        itinToast('Déjà dans votre itinéraire 😊');
        return;
    }
    const region  = WINE_DATA[regionId];
    const domaine = region.domaines[domaineIdx];

    itineraryItems.push({
        id:        itinId(regionId, domaineIdx),
        regionId,
        domaineIdx,
        name:      domaine.name,
        location:  domaine.location_details || region.name,
        x:         domaine.x,
        y:         domaine.y
    });
    itineraryOptimized = false;

    renderItinerary();
    updateItinFab();
    itinFabPulse();
    updateAddToItinBtn(regionId, domaineIdx);

    // Ouvrir automatiquement la sidebar au 1er ajout
    if (itineraryItems.length === 1) openItinerary();

    itinToast(`🍷 ${domaine.name} ajouté à l'itinéraire !`);
}

function removeFromItinerary(id) {
    const item = itineraryItems.find(i => i.id === id);
    itineraryItems = itineraryItems.filter(i => i.id !== id);
    itineraryOptimized = false;
    renderItinerary();
    updateItinFab();
    if (item && item.mcMarkerId) {
        updateMcItinBtn(item.mcMarkerId);
    } else if (item) {
        updateAddToItinBtn(item.regionId, item.domaineIdx);
    }
}

function clearItinerary() {
    if (!itineraryItems.length) return;
    if (!confirm('Vider tout l\'itinéraire ?')) return;
    itineraryItems     = [];
    itineraryOptimized = false;
    renderItinerary();
    updateItinFab();
}

// --- Algorithme TSP (plus proche voisin) ----------------
function optimizeRoute() {
    if (itineraryItems.length < 3) {
        itinToast('Ajoutez au moins 3 domaines pour optimiser !');
        return;
    }
    const src = [...itineraryItems];
    const n   = src.length;
    const visited = new Array(n).fill(false);
    const route   = [0];
    visited[0]    = true;

    for (let step = 1; step < n; step++) {
        const last = route[route.length - 1];
        let nearest = -1, minDist = Infinity;
        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                const d = itinCalcDistance(src[last], src[i]);
                if (d < minDist) { minDist = d; nearest = i; }
            }
        }
        route.push(nearest);
        visited[nearest] = true;
    }

    itineraryItems     = route.map(i => src[i]);
    itineraryOptimized = true;
    renderItinerary();
    itinToast('✨ Trajet optimisé !');
}

// --- Export Google Maps ---------------------------------
function exportToGoogleMaps() {
    if (!itineraryItems.length) return;

    const places = itineraryItems.map(item => {
        const city = itinExtractCity(item.location);
        return city ? `${city}, France` : `${item.name}, France`;
    });

    if (places.length === 1) {
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(places[0])}`,
            '_blank'
        );
        return;
    }

    const origin      = encodeURIComponent(places[0]);
    const destination = encodeURIComponent(places[places.length - 1]);
    const waypoints   = places.slice(1, -1).map(encodeURIComponent).join('|');

    let url = `https://www.google.com/maps/dir/?api=1`
            + `&origin=${origin}`
            + `&destination=${destination}`
            + `&travelmode=driving`;
    if (waypoints) url += `&waypoints=${waypoints}`;

    window.open(url, '_blank');
}

// --- Export PDF (impression navigateur) -----------------
function exportToPDF() {
    if (!itineraryItems.length) return;

    const overlay  = document.getElementById('itin-print-overlay');
    const dateStr  = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const totalKm   = itinTotalKm(itineraryItems);
    const totalTime = itinFormatTime(totalKm);

    // Construire le HTML des étapes
    const stepsHtml = itineraryItems.map((item, i) => {
        const city = itinExtractCity(item.location) || '';
        let connectorHtml = '';
        if (i < itineraryItems.length - 1) {
            const segKm   = Math.round(itinCalcDistance(item, itineraryItems[i + 1]));
            const segTime = itinFormatTime(segKm);
            connectorHtml = `<div class="itin-print-connector">↓ ${segKm} km · ${segTime}</div>`;
        }
        return `
        <div class="itin-print-step">
            <div class="itin-print-step-num">${i + 1}</div>
            <div>
                <div class="itin-print-step-name">${item.name}</div>
                ${city ? `<div class="itin-print-step-loc">📍 ${city}</div>` : ''}
            </div>
        </div>
        ${connectorHtml}`;
    }).join('');

    overlay.innerHTML = `
        <h1 class="itin-print-title">Route des Vins — Mon Itinéraire</h1>
        <p class="itin-print-subtitle">
            Planifié le ${dateStr}
            ${itineraryOptimized ? ' · ✨ Trajet optimisé automatiquement' : ''}
        </p>
        ${stepsHtml}
        <div class="itin-print-summary">
            <h3>Résumé</h3>
            <p>
                <strong>${itineraryItems.length}</strong> domaine${itineraryItems.length > 1 ? 's' : ''} ·
                <strong>${totalKm} km</strong> estimés ·
                <strong>${totalTime}</strong> de trajet
            </p>
            <p class="itin-print-note">
                * Distances estimées (vol d'oiseau × 1,35). Pour un itinéraire précis,
                utilisez l'export Google Maps.
            </p>
        </div>`;

    overlay.style.display = 'block';
    setTimeout(() => {
        window.print();
        overlay.style.display = 'none';
    }, 150);
}

// --- Rendu de la sidebar --------------------------------
function renderItinerary() {
    const list    = document.getElementById('itin-list');
    const empty   = document.getElementById('itin-empty');
    const summary = document.getElementById('itin-summary');
    const actions = document.getElementById('itin-actions');

    if (!itineraryItems.length) {
        list.innerHTML = '';
        empty.classList.remove('hidden');
        summary.classList.add('hidden');
        actions.classList.add('hidden');
        return;
    }

    empty.classList.add('hidden');
    summary.classList.remove('hidden');
    actions.classList.remove('hidden');

    // Étapes + connecteurs
    let html = '';
    itineraryItems.forEach((item, i) => {
        const city      = itinExtractCity(item.location) || item.location;
        const optBadge  = itineraryOptimized
            ? '<span class="itin-opt-badge">✨ opt.</span>'
            : '';

        html += `
        <div class="itin-step" data-id="${item.id}">
            <div class="itin-step-num">${i + 1}</div>
            <div class="itin-step-body">
                <div class="itin-step-name">${item.name}${optBadge}</div>
                <div class="itin-step-loc">📍 ${city}</div>
            </div>
            <button class="itin-step-remove"
                    onclick="removeFromItinerary('${item.id}')"
                    aria-label="Retirer ${item.name}">×</button>
        </div>`;

        if (i < itineraryItems.length - 1) {
            const dist = Math.round(itinCalcDistance(item, itineraryItems[i + 1]));
            const time = itinFormatTime(dist);
            html += `
        <div class="itin-connector">
            <span>↓ ${dist} km · ${time}</span>
            <div class="itin-connector-line"></div>
        </div>`;
        }
    });

    list.innerHTML = html;

    // Mise à jour du résumé total
    const totalKm = itinTotalKm(itineraryItems);
    document.getElementById('itin-km').textContent   = totalKm;
    document.getElementById('itin-time').textContent = itinFormatTime(totalKm);
}

// --- FAB ------------------------------------------------
function updateItinFab() {
    const badge = document.getElementById('itin-fab-badge');
    const count = itineraryItems.length;
    if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function itinFabPulse() {
    const fab = document.getElementById('itin-fab');
    fab.classList.remove('pulse');
    void fab.offsetWidth; // reset animation
    fab.classList.add('pulse');
    setTimeout(() => fab.classList.remove('pulse'), 700);
}

// --- Toast ----------------------------------------------
let _itinToastTimer = null;
function itinToast(msg) {
    let t = document.getElementById('itin-toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'itin-toast';
        Object.assign(t.style, {
            position:   'fixed',
            bottom:     '90px',
            right:      '28px',
            zIndex:     '700',
            background: 'var(--green-dark)',
            color:      '#fff',
            padding:    '10px 18px',
            borderRadius: '20px',
            fontFamily: 'var(--font-body)',
            fontSize:   '0.85em',
            fontWeight: '500',
            boxShadow:  '0 4px 16px rgba(0,0,0,0.2)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            opacity:    '0',
            transform:  'translateY(8px)',
            pointerEvents: 'none'
        });
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity   = '1';
    t.style.transform = 'translateY(0)';
    clearTimeout(_itinToastTimer);
    _itinToastTimer = setTimeout(() => {
        t.style.opacity   = '0';
        t.style.transform = 'translateY(8px)';
    }, 2800);
}

// --- Sidebar toggle -------------------------------------
function toggleItinerary() {
    itinerarySidebarOpen ? closeItinerary() : openItinerary();
}

function openItinerary() {
    document.getElementById('itin-sidebar').classList.add('open');
    itinerarySidebarOpen = true;
}

function closeItinerary() {
    document.getElementById('itin-sidebar').classList.remove('open');
    itinerarySidebarOpen = false;
}

// --- Mettre à jour le bouton "Ajouter" dans la fiche ----
function updateAddToItinBtn(regionId, domaineIdx) {
    const btn = document.querySelector(
        `.btn-add-to-itin[data-rid="${regionId}"][data-didx="${domaineIdx}"]`
    );
    if (!btn) return;
    const inItin = isInItinerary(regionId, domaineIdx);
    if (inItin) {
        btn.classList.add('added');
        btn.innerHTML = '<span class="btn-add-to-itin-icon">✓</span> Dans votre itinéraire';
        btn.disabled  = true;
    } else {
        btn.classList.remove('added');
        btn.innerHTML = '<span class="btn-add-to-itin-icon">+</span> Ajouter à mon itinéraire';
        btn.disabled  = false;
    }
}

// ============================================================
//  Lightbox
// ============================================================
function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = src;
    lb.classList.add('open');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

/* ============================================================
   LANDING PAGE OVERLAY — Carrousel & Animation
   ============================================================ */

const LANDING_PHOTOS = [
    'images/IMG_8245.JPG',
    'images/IMG_8246.JPG',
    'images/IMG_8247.JPG',
    'images/IMG_8248.JPG',
    'images/IMG_8249.JPG',
    'images/IMG_8250.JPG',
    'images/IMG_8251.JPG',
    'images/IMG_8252.JPG',
    'images/IMG_8253.JPG',
    'images/IMG_8254.JPG',
    'images/IMG_8255.JPG',
    'images/IMG_8256.JPG',
    'images/IMG_8257.JPG',
];

let landingSlideIndex = 0;
let landingSlideTimer = null;

function initLanding() {
    const carousel = document.getElementById('landing-carousel');
    const dotsEl   = document.getElementById('landing-dots');
    if (!carousel || !dotsEl) return;

    // Build slides
    LANDING_PHOTOS.forEach((src, i) => {
        const slide = document.createElement('div');
        slide.className = 'landing-slide' + (i === 0 ? ' active' : '');
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Photo vignoble ' + (i + 1);
        img.loading = i === 0 ? 'eager' : 'lazy';
        slide.appendChild(img);
        carousel.appendChild(slide);
    });

    // Build dots
    LANDING_PHOTOS.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'landing-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Photo ' + (i + 1));
        dot.addEventListener('click', () => goToLandingSlide(i));
        dotsEl.appendChild(dot);
    });

    // Click on photo → next slide
    carousel.style.cursor = 'pointer';
    carousel.addEventListener('click', () => {
        clearInterval(landingSlideTimer);
        nextLandingSlide();
        landingSlideTimer = setInterval(nextLandingSlide, 4000);
    });

    // Auto-advance
    landingSlideTimer = setInterval(nextLandingSlide, 4000);

    // Scroll nav blur effect
    const nav = document.getElementById('landing-nav');
    if (nav) {
        const overlay = document.getElementById('landing-overlay');
        overlay && overlay.addEventListener('scroll', () => {
            nav.style.backdropFilter = 'none';
        });
    }
}

function goToLandingSlide(idx) {
    const slides = document.querySelectorAll('.landing-slide');
    const dots   = document.querySelectorAll('.landing-dot');
    if (!slides.length) return;

    slides[landingSlideIndex].classList.remove('active');
    dots[landingSlideIndex] && dots[landingSlideIndex].classList.remove('active');

    landingSlideIndex = (idx + slides.length) % slides.length;

    slides[landingSlideIndex].classList.add('active');
    dots[landingSlideIndex] && dots[landingSlideIndex].classList.add('active');
}

function nextLandingSlide() {
    goToLandingSlide(landingSlideIndex + 1);
}

function goToDomaine(regionId, domaineIdx) {
    dismissLanding();
    setTimeout(() => {
        const svg = document.getElementById('france-map');
        if (!svg || !WINE_DATA[regionId]) return;
        if (!initialViewBox) initialViewBox = svg.getAttribute('viewBox').split(' ').map(Number);
        const path = svg.querySelector(`path[data-numerodepartement="${regionId}"]`);
        if (path) {
            svg.querySelectorAll('.wine-region.active').forEach(p => p.classList.remove('active'));
            path.classList.add('active');
            animateViewBox(svg.getAttribute('viewBox').split(' ').map(Number), calculateTargetViewBox(path));
            renderMarkers(WINE_DATA[regionId].domaines);
        }
        currentRegion = regionId;
        currentDomaine = domaineIdx;
        document.getElementById('info-panel').classList.add('fullscreen');
        document.getElementById('back-button').classList.remove('hidden');
        showDomaineView(domaineIdx);
    }, 600);
}

function goToRegion(deptId) {
    dismissLanding();
    setTimeout(() => {
        const svg = document.getElementById('france-map');
        if (!svg) return;
        if (!WINE_DATA[deptId]) return;
        if (!initialViewBox) initialViewBox = svg.getAttribute('viewBox').split(' ').map(Number);
        const path = svg.querySelector(`path[data-numerodepartement="${deptId}"]`);
        if (!path) return;
        svg.querySelectorAll('.wine-region.active').forEach(p => p.classList.remove('active'));
        path.classList.add('active');
        animateViewBox(
            svg.getAttribute('viewBox').split(' ').map(Number),
            calculateTargetViewBox(path)
        );
        currentRegion = deptId;
        renderMarkers(WINE_DATA[deptId].domaines);
        showRegionView(deptId);
    }, 600);
}

// ── Zoom carte (via viewBox, cohérent avec animateViewBox) ──
window.mapZoomIn = function() {
  const svg = document.getElementById('france-map');
  if (!svg) return;
  const vb = svg.getAttribute('viewBox').split(' ').map(Number);
  const cx = vb[0] + vb[2] / 2, cy = vb[1] + vb[3] / 2;
  const nW = vb[2] * 0.75, nH = vb[3] * 0.75;
  animateViewBox(vb, [cx - nW/2, cy - nH/2, nW, nH], 300);
};
window.mapZoomOut = function() {
  const svg = document.getElementById('france-map');
  if (!svg) return;
  const vb = svg.getAttribute('viewBox').split(' ').map(Number);
  const base = (initialViewBox || [105, 18, 568, 567]);
  const nW = Math.min(vb[2] / 0.75, base[2]);
  const nH = Math.min(vb[3] / 0.75, base[3]);
  const cx = vb[0] + vb[2] / 2, cy = vb[1] + vb[3] / 2;
  const x = Math.max(base[0], Math.min(cx - nW/2, base[0] + base[2] - nW));
  const y = Math.max(base[1], Math.min(cy - nH/2, base[1] + base[3] - nH));
  animateViewBox(vb, [x, y, nW, nH], 300);
};
window.mapZoomReset = function() {
  const svg = document.getElementById('france-map');
  if (!svg || !initialViewBox) return;
  animateViewBox(svg.getAttribute('viewBox').split(' ').map(Number), initialViewBox, 400);
};

// ── Pan (drag) carte ─────────────────────────────────────────
(function() {
  let dragging = false, hasDragged = false, startX, startY, startVB;
  const BASE_VB = [105, 18, 568, 567];

  function getVB() {
    const svg = document.getElementById('france-map');
    return svg ? svg.getAttribute('viewBox').split(' ').map(Number) : null;
  }

  function isZoomed() {
    const vb = getVB();
    return vb && vb[2] < BASE_VB[2] - 1;
  }

  function onDown(e) {
    dragging = true; hasDragged = false;
    startX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
    startY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
    startVB = getVB();
    document.getElementById('france-map').style.cursor = 'grabbing';
    e.preventDefault();
  }

  function onMove(e) {
    if (!dragging) return;
    const svg = document.getElementById('france-map');
    if (!svg) return;
    const cx = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
    const cy = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
    const dx = startX - cx, dy = startY - cy;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDragged = true;
    const rect = svg.getBoundingClientRect();
    const sx = startVB[2] / rect.width, sy = startVB[3] / rect.height;
    const base = initialViewBox || BASE_VB;
    const x = Math.max(base[0], Math.min(startVB[0] + dx * sx, base[0] + base[2] - startVB[2]));
    const y = Math.max(base[1], Math.min(startVB[1] + dy * sy, base[1] + base[3] - startVB[3]));
    svg.setAttribute('viewBox', `${x} ${y} ${startVB[2]} ${startVB[3]}`);
    e.preventDefault();
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;
    const svg = document.getElementById('france-map');
    if (svg) svg.style.cursor = isZoomed() ? 'grab' : '';
  }

  function setupPan() {
    const svg = document.getElementById('france-map');
    if (!svg) return;
    svg.addEventListener('mousedown', onDown);
    svg.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    // Bloquer le click sur le SVG si on vient de dragger
    svg.addEventListener('click', function(e) {
      if (hasDragged) { e.stopImmediatePropagation(); hasDragged = false; }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPan);
  } else {
    setupPan();
  }

  // Curseur grab quand zoomé
  window.addEventListener('mousemove', function() {
    const svg = document.getElementById('france-map');
    if (svg && !dragging) svg.style.cursor = isZoomed() ? 'grab' : '';
  });
})();

function showLanding() {
    const overlay = document.getElementById('landing-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden', 'is-leaving');
}

function dismissLanding() {
    const overlay = document.getElementById('landing-overlay');
    if (!overlay) return;

    // Stop carousel timer
    if (landingSlideTimer) {
        clearInterval(landingSlideTimer);
        landingSlideTimer = null;
    }

    // Animate out
    overlay.classList.add('is-leaving');

    // Remove after animation
    overlay.addEventListener('transitionend', () => {
        overlay.classList.add('hidden');
    }, { once: true });
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', initLanding);
