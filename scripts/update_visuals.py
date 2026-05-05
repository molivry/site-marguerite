import re
import sys

# Configuration
NEW_COLOR_PRIMARY = "#1C4220" # Pantone 2411 C
NEW_COLOR_DARK = "#5F6F52"    # Dark Olive Green
NEW_COLOR_LIGHT = "#A9B388"   # Laurel Green
NEW_SHADOW_COLOR = "95, 111, 82" # RGB of Dark Olive Green

def update_css(content):
    # Update colors
    content = content.replace("#800020", NEW_COLOR_PRIMARY)
    content = content.replace("#9d1b30", NEW_COLOR_PRIMARY)
    content = content.replace("#600018", NEW_COLOR_DARK)
    content = content.replace("#c72a43", NEW_COLOR_LIGHT)
    content = content.replace("157, 27, 48", NEW_SHADOW_COLOR)
    content = content.replace("128, 0, 32", NEW_SHADOW_COLOR)
    content = content.replace("96, 0, 24", "7, 74, 53") # Darker gradient end
    
    # Update stroke width
    content = content.replace("stroke-width: 1.5;", "stroke-width: 0.5;")
    
    # Update text
    content = content.replace("(bordeaux)", "(vert)")
    
    return content

def get_start_point(d_str, current_pen_x=0, current_pen_y=0):
    # Find the first M or m command and its coordinates
    # Robust regex to find M/m followed by two numbers
    match = re.search(r'([mM])\s*([-\d.]+)[,\s]\s*([-\d.]+)', d_str)
    if not match:
        # Try with space separator only if comma match failed
        match = re.search(r'([mM])\s*([-\d.]+)\s+([-\d.]+)', d_str)
        
    if not match:
        return None
    
    cmd, x, y = match.groups()
    x, y = float(x), float(y)
    
    if cmd == 'm':
        return current_pen_x + x, current_pen_y + y
    else:
        return x, y

def process_idf_paths(content):
    # Departments to check for insets
    idf_depts = ['75', '92', '93', '94', '95', '77', '78', '91']
    
    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        if '<path' in line and 'data-numerodepartement="' in line:
            # Extract department number
            dept_match = re.search(r'data-numerodepartement="(\d+)"', line)
            if dept_match and dept_match.group(1) in idf_depts:
                # Extract d attribute
                d_match = re.search(r'd="([^"]+)"', line)
                if d_match:
                    d_original = d_match.group(1)
                    
                    # Split into subpaths manually to handle z/Z correctly
                    subpaths = []
                    cursor = 0
                    length = len(d_original)
                    current_start = 0
                    
                    while cursor < length:
                        if d_original[cursor].lower() == 'z':
                            # Check if next char is m/M (ignoring space)
                            peek = cursor + 1
                            while peek < length and d_original[peek].isspace():
                                peek += 1
                            
                            if peek < length and d_original[peek].lower() == 'm':
                                # Found split point
                                subpaths.append(d_original[current_start:cursor+1])
                                current_start = peek # Start next from 'm'
                                cursor = peek
                            else:
                                cursor += 1
                        else:
                            cursor += 1
                    subpaths.append(d_original[current_start:])
                    
                    # Calculate absolute starts
                    abs_starts = []
                    prev_subpath_start_x, prev_subpath_start_y = 0, 0
                    
                    for i, sp in enumerate(subpaths):
                        # Find start coordinates
                        match = re.search(r'([mM])\s*([-\d.]+)[,\s]\s*([-\d.]+)', sp)
                        if not match:
                             match = re.search(r'([mM])\s*([-\d.]+)\s+([-\d.]+)', sp)
                             
                        if match:
                            cmd, x, y = match.groups()
                            x, y = float(x), float(y)
                            
                            if i == 0:
                                start_x, start_y = x, y
                            else:
                                if cmd == 'm':
                                    start_x = prev_subpath_start_x + x
                                    start_y = prev_subpath_start_y + y
                                else:
                                    start_x, start_y = x, y
                            
                            abs_starts.append((start_x, start_y))
                            prev_subpath_start_x, prev_subpath_start_y = start_x, start_y
                        else:
                            # Fallback
                            abs_starts.append((0,0))
                    
                    # Filter
                    kept_indices = []
                    for i, (sx, sy) in enumerate(abs_starts):
                        # Heuristic: Inset is top-right (X > 580)
                        if sx < 580: 
                            kept_indices.append(i)
                            
                    if kept_indices:
                        new_d = ""
                        for idx in kept_indices:
                            sp = subpaths[idx]
                            sx, sy = abs_starts[idx]
                            
                            # Reconstruct with absolute move command
                            # Find where the move command ends
                            match = re.search(r'([mM])\s*([-\d.]+)[,\s]\s*([-\d.]+)', sp)
                            if not match:
                                match = re.search(r'([mM])\s*([-\d.]+)\s+([-\d.]+)', sp)
                                
                            if match:
                                move_end = match.end()
                                rest_of_path = sp[move_end:]
                                new_start = f"M{sx:.1f} {sy:.1f}"
                                new_d += new_start + rest_of_path + " "
                            else:
                                new_d += sp + " "
                            
                        line = line.replace(d_original, new_d.strip())
            
            new_lines.append(line)
        else:
            new_lines.append(line)
            
    return '\n'.join(new_lines)

# Execution
try:
    with open('../website/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    content = update_css(content)
    content = process_idf_paths(content)

    with open('../website/index.html', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Successfully updated index.html")
    
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
