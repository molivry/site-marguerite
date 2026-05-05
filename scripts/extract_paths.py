import xml.etree.ElementTree as ET

# Parse SVG file
tree = ET.parse('../website/france-region-departement-metropolitaine-svg.svg')
root = tree.getroot()

# Extract all paths with department numbers
paths = root.findall('.//{http://www.w3.org/2000/svg}path[@data-numerodepartement]')

print(f"<!-- Found {len(paths)} departments -->")

# Wine regions
wine_regions = ['33', '39', '49']

for path in paths:
    dept_num = path.get('data-numerodepartement')
    dept_name = path.get('data-nom')
    d_attr = path.get('d')
    
    # Add wine-region class if it's one of our regions
    class_attr = ' class="wine-region"' if dept_num in wine_regions else ''
    
    print(f'            <path data-numerodepartement="{dept_num}" data-nom="{dept_name}"{class_attr} d="{d_attr}"/>')

print("\n<!-- Done -->")
