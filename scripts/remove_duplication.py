
import os

file_path = 'index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# We want to delete lines 278 to 471 (1-based index).
# In 0-based index, this is 277 to 471.
# line 278 is index 277.
# line 472 is index 471.
# So we want to keep 0 to 276, and 471 to end.

# Verify the content to be sure
print(f"Line 278: {lines[277]}")
print(f"Line 472: {lines[471]}")

if "function showRegionView" in lines[277] and "function showRegionView" in lines[471]:
    new_lines = lines[:277] + lines[471:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Removed duplicated block.")
else:
    print("Verification failed. Did not modify file.")
