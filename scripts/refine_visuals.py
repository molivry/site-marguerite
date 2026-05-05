import re
import sys

def get_first_two_numbers(s):
    # Find all numbers in the string
    # SVG numbers can be:
    # - integer: 123
    # - float: 123.456
    # - scientific: 1.23e-4
    # - negative: -123
    # Regex for SVG number: [+-]?(\d*\.\d+|\d+)([eE][+-]?\d+)?
    
    # We only care about the first two numbers after the command
    # The command is the first character (M or m)
    
    # Strip command
    s_nums = s[1:]
    
    # Find all numbers
    nums = re.findall(r'[+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?', s_nums)
    
    if len(nums) >= 2:
        return float(nums[0]), float(nums[1])
    return None

def process_content(content):
    # 1. Center subtitle
    if '#title-overlay {' in content:
        # Check if text-align is already there
        if 'text-align: center;' not in content:
            content = content.replace('#title-overlay {', '#title-overlay {\n            text-align: center;')
            
    # 2. Remove IDF insets
    idf_depts = ['75', '92', '93', '94', '95', '77', '78', '91']
    
    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        if '<path' in line and 'data-numerodepartement="' in line:
            dept_match = re.search(r'data-numerodepartement="(\d+)"', line)
            if dept_match and dept_match.group(1) in idf_depts:
                d_match = re.search(r'd="([^"]+)"', line)
                if d_match:
                    d_original = d_match.group(1)
                    
                    # Split subpaths
                    subpaths = []
                    cursor = 0
                    length = len(d_original)
                    current_start = 0
                    
                    while cursor < length:
                        if d_original[cursor].lower() == 'z':
                            peek = cursor + 1
                            while peek < length and d_original[peek].isspace():
                                peek += 1
                            
                            if peek < length and d_original[peek].lower() == 'm':
                                subpaths.append(d_original[current_start:cursor+1])
                                current_start = peek
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
                        coords = get_first_two_numbers(sp)
                        
                        if coords:
                            x, y = coords
                            cmd = sp[0] # M or m
                            
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
                            # Should not happen if regex is good
                            print(f"Warning: Could not parse coords for {sp[:20]}...")
                            abs_starts.append((0,0))
                    
                    # Filter
                    kept_indices = []
                    for i, (sx, sy) in enumerate(abs_starts):
                        # Heuristic: Inset is top-right (X > 580)
                        if sx < 580: 
                            kept_indices.append(i)
                        else:
                            print(f"Removing inset for Dept {dept_match.group(1)} at x={sx:.1f}")
                            
                    if kept_indices:
                        new_d = ""
                        for idx in kept_indices:
                            sp = subpaths[idx]
                            sx, sy = abs_starts[idx]
                            
                            # Reconstruct with absolute move command
                            # Find where the numbers end to preserve the rest of the path
                            # We can just replace the start command and coords with new absolute M x y
                            
                            # Get coords again to know what to replace
                            coords = get_first_two_numbers(sp)
                            if coords:
                                # We need to find the string length of the command + 2 numbers
                                # Regex to match command + whitespace + num + separator + num
                                match = re.match(r'([mM])\s*([+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?)\s*([, ]?)\s*([+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?)', sp)
                                
                                # If standard regex fails (e.g. negative separator), try finding numbers directly
                                if not match:
                                    # Just find the end of the second number
                                    nums = list(re.finditer(r'[+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?', sp))
                                    if len(nums) >= 2:
                                        end_pos = nums[1].end()
                                        rest_of_path = sp[end_pos:]
                                        new_start = f"M{sx:.1f} {sy:.1f}"
                                        new_d += new_start + rest_of_path + " "
                                    else:
                                        new_d += sp + " "
                                else:
                                    end_pos = match.end()
                                    rest_of_path = sp[end_pos:]
                                    new_start = f"M{sx:.1f} {sy:.1f}"
                                    new_d += new_start + rest_of_path + " "
                            else:
                                new_d += sp + " "
                            
                        line = line.replace(d_original, new_d.strip())
            
            new_lines.append(line)
        else:
            new_lines.append(line)
            
    return '\n'.join(new_lines)

try:
    with open('../website/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    content = process_content(content)

    with open('../website/index.html', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Successfully refined visuals")
    
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
