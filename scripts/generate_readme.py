import os

README_PATH = os.path.join(os.path.dirname(__file__), "..", "README.md")

with open(README_PATH, "r") as file:
    readme = file.read()

# Update the README.md file with the latest content
with open(README_PATH, "w") as file:
    file.write(readme + "\n" + "This is a new line added by the script.")
