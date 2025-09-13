import os
import subprocess
from py2puml.py2puml import py2puml

# Configure Module
MODULE = "pandas.io"

CURRENT_DIRECTORY = os.path.dirname(__file__)
APP_PATH = os.path.abspath(os.path.join(CURRENT_DIRECTORY, "..", *MODULE.split(".")))
UML_PATH = os.path.abspath(
    os.path.join(
        CURRENT_DIRECTORY,
        f"{MODULE}.puml",
    )
)

PLANTUML_JAR_PATH = os.path.join(CURRENT_DIRECTORY, "plantuml-mit-1.2024.6.jar")


def convert_plantuml_to_png(destination_directory):
    """Converts plantuml file to png."""
    command = [
        "java",
        "-DPLANTUML_LIMIT_SIZE=100000",
        "-jar",
        PLANTUML_JAR_PATH,
        UML_PATH,
        "-o",
        destination_directory,
    ]
    subprocess.run(command, check=True)


def generate_uml_diagram(destination_path):
    """Generates UML diagram for server and saves it as png."""
    # Generate PUML diagram
    print(f"Generating UML diagram for {MODULE}...")
    puml_content = "".join(
        py2puml(
            APP_PATH,
            MODULE
        )
    )

    # Write PUML content to file
    os.makedirs(os.path.dirname(destination_path), exist_ok=True)
    with open(destination_path, "w") as f:
        f.write(puml_content)

    # Generate PNG from PUML
    print("Generating PNG from PUML")
    convert_plantuml_to_png(os.path.dirname(destination_path))


if __name__ == "__main__":
    generate_uml_diagram(UML_PATH)
