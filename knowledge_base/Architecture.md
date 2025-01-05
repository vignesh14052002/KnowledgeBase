# Architecture

## Resources
- [Byte-byte go YouTube channel](https://www.youtube.com/c/ByteByteGo)

## Incidence Matrix
- [NDC Conference: Residuality Theory](https://youtu.be/1KHXAWLSMqE?si=vG7K3Ddg5UrH8P3g)
- construct a boolean matrix with rows as incidents and columns as microservices
- 1 if incident i affects microservice j else 0
- Max of sum of rows indicates the most critical incident
- Max of sum of columns indicates the most critical microservice
- if two columns looks similar, then they are tightly coupled

## [ByteByteGo 2023 System Design PDF](https://blog.bytebytego.com/p/free-system-design-pdf-158-pages)
    - progress pg 131/344
    - Explore
        - pg 25: software architecture styles
        - pg 31: api protocols
        - pg 38: SOLID, BASE, CAP
        - pg 61: system design blueprint
        - pg 63: database sharding
        - pg 65: cloud monitoring
        - pg 80: api gateway
            - examples with azure and fastapi?
        - pg 82: code review pyramid
            - PR checklist based on code changes?
        - pg 83: microservice best practices
        - pg 93: monorepo vs microrepo
            - can't understand scalablity and tooling
        - pg 95: datastructures used in daily life
        - pg 97: amazon saved 90% cost by moving from lambda to ec2
        - pg 105: 18 design patterns
        - pg 125: cookies vs sessions
        - pg 129: process vs threads
    - immediate
        - url, urn, uri?
        

## Explore
- OWASP api security risks
- kafka
- redis
- rust
- [cloud diagram as code](https://github.com/mingrammer/diagrams)
- git sub module
- microfrontend