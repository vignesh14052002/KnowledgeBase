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
        - pg 203: sessions, tokens, JWT
        - pg 219: system design algorithms
        - pg 224: how password managers work?
        - pg 228: REST API design
        - pg 233: Payments ecosystem
        - pg 249: event sourcing
        - pg 284: 10 principles for building resilient payment systems (by Shopify).
        - pg 286: kubernetis periodic table
        - pg 289: where do we cache data?
        - pg 291: distributed system patterns
        - pg 296: most used algorithms
        - pg 307: HTTP header details
        - pg 311: choosing the right DB
        - pg 316: design effective API's
        - pg 318: data processing models
        - pg 320: architectural characteristics
        - pg 325: How does Twitter recommend “For You” Timeline in 1.5 seconds
        - pg 331: Possible Experiment Platform Architecture
    - doubts
        - url, urn, uri?
        - service discovery, service mesh
        - when to use time series database?
        - pg 265 : how seperate db for read and write
        - federated gateway
        - db
          - wide column
          - time series
          - serverless : amazon aurora serverless
## Explore
- OWASP api security risks
- kafka
- redis
- rust
- [cloud diagram as code](https://github.com/mingrammer/diagrams)
- git sub module
- microfrontend
- apbit bayani youtube channel
- [practical TLS](https://www.youtube.com/playlist?list=PLIFyRwBY_4bTwRX__Zn4-letrtpSj1mzY)

## Cryptography        
- [how public key private key works?](https://youtu.be/_zyKvPvh808?si=3iPbs3GOSwp4dhkb)


## Microservices
### Explore
- Service Discovery
- Service Mesh
- Router on HTTP layer
- sidecar pattern
