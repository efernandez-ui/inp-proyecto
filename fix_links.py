import os
import re

directories = ['client/src/components/layout', 'client/src/components/home']
for directory in directories:
    for filename in os.listdir(directory):
        if not filename.endswith('.tsx'): continue
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Replace <Link ...> <a className="..."> ... </a> </Link>
        # with <Link ... className="..."> ... </Link>
        
        # We need to handle attributes on Link as well.
        # It's easier to just match <Link href="X">\s*<a className="Y">(.*?)</a>\s*</Link>
        # However, some might span multiple lines and have complex contents.
        # Let's use re.sub with re.DOTALL
        
        pattern = r'<Link([^>]*)>\s*<a([^>]*)>(.*?)</a>\s*</Link>'
        def repl(match):
            link_attrs = match.group(1)
            a_attrs = match.group(2)
            inner_content = match.group(3)
            
            # Combine attributes, but prefer className from <a> if it exists
            return f'<Link{link_attrs}{a_attrs}>{inner_content}</Link>'
            
        new_content = re.sub(pattern, repl, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Fixed {filepath}")

