"""Add avatar paths to data.ts for all 27 personalities"""
import re

path = r"C:\Users\高\Desktop\SBTI人格测试\src\data.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# All 27 personality IDs
ids = [
    "ctrl", "atmer", "diors", "boss", "thank", "ohno", "gogo", "sexy", "lover",
    "mum", "fake", "ojbk", "malo", "joker", "woc", "think", "shit", "zzzz",
    "poor", "monk", "imsb", "solo", "fuck", "dead", "imfw", "hhhh", "drunk"
]

# For each personality, find the line "color: ... bgGradient: ..." and add avatar after it
for pid in ids:
    # Match the pattern: id: "xxx", ... color: "...", bgGradient: "..."
    # We need to add avatar: "/avatars/xxx.png" after bgGradient
    pattern = rf'(id: "{pid}".*?bgGradient: "[^"]*")'
    
    def add_avatar(match):
        text = match.group(1)
        # Check if avatar already exists
        if "avatar:" in text:
            return text
        return text + f',\n    avatar: "/avatars/{pid}.png"'
    
    content = re.sub(pattern, add_avatar, content, flags=re.DOTALL)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done! Added avatar paths to all 27 personalities.")

# Verify
count = content.count("avatar:")
print(f"Total avatar entries: {count}")
