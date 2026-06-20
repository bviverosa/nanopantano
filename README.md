# NANOPANTANO

### setup
```mermaid
graph LR
    A(git clone) --> B(npm install)
    B --> C(npm run build @ frontend)
    C --> D(npm run start @ backend)
    D --> E(deployed @ localhost:8080/)
