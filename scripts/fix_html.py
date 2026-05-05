
import os

file_path = '../website/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix syntax error at the end
if '</script></body></html>' in content and '});' not in content[-50:]:
    content = content.replace('</script></body></html>', '});\n    </script>\n</body>\n</html>')

# Fix image href
content = content.replace('image.setAttributeNS(null, "href", "logo vignoble.png");', 'image.setAttribute("href", "logo%20vignoble.png");')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed index.html")
