# PlantUML
A tool that can render text as diagram - [example](https://www.plantuml.com/plantuml/uml/SoWkIImgAStDuNBCoKnELT2rKt3AJx9IS2mjoKZDAybCJYp9pCzJ24ejB4qjBk42oYde0jM05MDHLLoGdrUSoeLkM5u-K5sHGY9MGw6ARNHryQb66EwGcfS2T300)

## Purpose
- It is better to make architecture diagrams undergo PR review process
  - comments can be included and changes can be easily made on the text representation
- version control helps visualize, how our architecture changes over time

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
- Enforces best practices (namin conventions, type hints) to get better architecture diagram

## plantuml
- python library that converts plantuml text into png, so that it can be viewed in unsupported platforms like azdo

## swagger_to_uml
- [repo](https://github.com/nlohmann/swagger_to_uml)
- converts fastapi swagger documentation into plantuml representation

# tplant
- [repo](https://github.com/bafolts/tplant)
- typescript to plantuml