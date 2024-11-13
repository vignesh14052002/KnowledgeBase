# Architecture

## Microservices
Refer to this [blog](https://dev.to/anthony_hagi/you-dont-need-microservices-a-real-world-perspective-1kck) for more information.

- ROO (record of origin) microservices
- Gateway microservice forwards JWT tokens
- What are business logics?
- DDD Pattern
- Challenges
    - Interaction
    - Code re-use
    - Debuggability
    - Race conditions
    - Orchestration
    - Testing

## Resources
- [Byte-byte go YouTube channel](https://www.youtube.com/c/ByteByteGo)

## Incidence Matrix
- [NDC Conference: Residuality Theory](https://youtu.be/1KHXAWLSMqE?si=vG7K3Ddg5UrH8P3g)
- construct a boolean matrix with rows as incidents and columns as microservices
- 1 if incident i affects microservice j else 0
- Max of sum of rows indicates the most critical incident
- Max of sum of columns indicates the most critical microservice
- if two columns looks similar, then they are tightly coupled
