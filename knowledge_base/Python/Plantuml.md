# Automatically convert your code base into class diagrams
The following example uses python, but this is language agnostic

## Steps
1. Install py2puml `pip install py2puml`
2. Copy [generate_uml_diagram.py](./scripts/generate_uml_diagram.py) to target codebase
3. [Optional] to convert puml code to png image offline
    
    3.1 Install Java
    
    3.2 Download [plantuml-mit-1.2025.7.jar](https://github.com/plantuml/plantuml/releases/download/v1.2025.7/plantuml-mit-1.2025.7.jar)
4. Configure module_name in `generate_uml_diagram` script and run it
5. The Output puml code and png diagram will be stored in the specified directory

## Purpose
- Helps Understand opensource projects
- class diagrams will be in sync with codebase always
- It is better to make class diagrams undergo PR review process
  - comments can be included and changes can be easily made on the text representation
- Enforces clean code and clean architecture
- version control helps visualize, how our class changes over time

# Related Tools
## py2puml
- [repo](https://github.com/lucsorel/py2puml)
- python library that parses our python project and convert into PlantUML representation

### Working
- uses ast (Abstract Syntax trees) to parse our code and construct a architecture diagram using
  - folder structure
  - class names
  - class relations (inheritance)
  - type hints

### Pros
- Get architecture diagram of your entire application quickly with a single command
- Enforces best practices (naming conventions, type hints) to get better architecture diagram

## plantuml
- python library that converts plantuml text into png, so that it can be viewed in unsupported platforms like azdo

## swagger_to_uml
- [repo](https://github.com/nlohmann/swagger_to_uml)
- converts fastapi swagger documentation into plantuml representation

# tplant
- [repo](https://github.com/bafolts/tplant)
- typescript to plantuml

