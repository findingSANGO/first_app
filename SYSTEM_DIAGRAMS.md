# System Architecture and Flow Diagrams

## System Architecture
```mermaid
graph TB
    subgraph Client Layer
        Web[Web Application]
        Mobile[Mobile Application]
        Guard[Guard Station]
    end

    subgraph Application Layer
        API[API Gateway]
        Auth[Authentication Service]
        Entry[Entry Management Service]
        Notify[Notification Service]
    end

    subgraph AI Layer
        Face[Face Recognition]
        OCR[Document OCR]
        Analytics[Analytics Engine]
    end

    subgraph Data Layer
        DB[(PostgreSQL Database)]
        Cache[(Redis Cache)]
        Storage[(File Storage)]
    end

    Web --> API
    Mobile --> API
    Guard --> API
    
    API --> Auth
    API --> Entry
    API --> Notify
    
    Entry --> Face
    Entry --> OCR
    Entry --> Analytics
    
    Auth --> DB
    Entry --> DB
    Notify --> Cache
    
    Face --> Storage
    OCR --> Storage
    Analytics --> DB
```

## Authentication Flow
```mermaid
sequenceDiagram
    participant U as User
    participant App as Mobile/Web App
    participant API as API Gateway
    participant Auth as Auth Service
    participant DB as Database

    U->>App: Enter Credentials
    App->>API: Login Request
    API->>Auth: Validate Credentials
    Auth->>DB: Check User
    DB-->>Auth: User Data
    Auth-->>API: Generate JWT
    API-->>App: Return Token
    App->>App: Store Token
    App-->>U: Show Dashboard
```

## Entry Request Flow
```mermaid
sequenceDiagram
    participant E as Employee
    participant App as Mobile App
    participant API as API Gateway
    participant M as Manager
    participant N as Notification Service

    E->>App: Create Entry Request
    App->>API: Submit Request
    API->>N: Notify Manager
    N->>M: Push Notification
    M->>App: Review Request
    App->>API: Approve/Reject
    API->>N: Notify Employee
    N->>E: Push Notification
```

## Guard Verification Flow
```mermaid
sequenceDiagram
    participant G as Guard
    participant App as Guard App
    participant API as API Gateway
    participant AI as AI Services
    participant DB as Database

    G->>App: Scan Entry Pass
    App->>API: Verify Request
    API->>AI: Process Verification
    AI->>DB: Check Authorization
    DB-->>AI: Verification Result
    AI-->>API: Verification Status
    API-->>App: Entry Decision
    App-->>G: Show Result
```

## Data Flow Architecture
```mermaid
flowchart LR
    subgraph Input
        QR[QR Code]
        Face[Face Scan]
        Form[Entry Form]
    end

    subgraph Processing
        VS[Verification Service]
        AI[AI Processing]
        Rules[Rules Engine]
    end

    subgraph Storage
        DB[(Database)]
        Cache[(Cache)]
        Files[(File Storage)]
    end

    QR --> VS
    Face --> AI
    Form --> Rules

    VS --> DB
    AI --> Files
    Rules --> Cache

    DB <--> Cache
```

## Role-Based Access Control
```mermaid
graph TD
    subgraph Roles
        SA[Super Admin]
        A[Admin]
        M[Manager]
        G[Guard]
        E[Employee]
    end

    subgraph Permissions
        L[Location Management]
        U[User Management]
        R[Reports]
        AP[Approvals]
        EN[Entry Management]
        RQ[Request Management]
    end

    SA --> L
    SA --> U
    SA --> R
    A --> U
    A --> R
    M --> AP
    M --> R
    G --> EN
    E --> RQ
```

## Mobile App Navigation
```mermaid
graph TD
    Login --> Role{Role Check}
    Role -->|Employee| ED[Employee Dashboard]
    Role -->|Manager| MD[Manager Dashboard]
    
    ED --> ER[Entry Request]
    ED --> EH[Request History]
    ED --> EP[Profile]
    
    MD --> MA[Approvals]
    MD --> MH[History]
    MD --> MT[Team View]
    MD --> MP[Profile]
```

## AI Processing Pipeline
```mermaid
graph LR
    subgraph Input
        I1[Face Image]
        I2[Document]
        I3[QR Code]
    end

    subgraph Processing
        P1[Face Detection]
        P2[Feature Extraction]
        P3[OCR Processing]
        P4[QR Decoding]
    end

    subgraph Verification
        V1[Face Matching]
        V2[Document Validation]
        V3[Code Verification]
    end

    I1 --> P1 --> P2 --> V1
    I2 --> P3 --> V2
    I3 --> P4 --> V3
```

## Notification System
```mermaid
graph TD
    subgraph Events
        E1[Entry Request]
        E2[Approval]
        E3[Rejection]
        E4[System Alert]
    end

    subgraph Processing
        NQ[Notification Queue]
        NP[Notification Processor]
    end

    subgraph Delivery
        P[Push Notification]
        E[Email]
        S[SMS]
    end

    E1 & E2 & E3 & E4 --> NQ --> NP
    NP --> P & E & S
```

These diagrams provide a visual representation of the Entry Management System's architecture and various workflows. They help in understanding:

1. Overall system architecture and component interactions
2. Authentication and authorization flows
3. Entry request and verification processes
4. Data flow between different system components
5. Role-based access control structure
6. Mobile app navigation structure
7. AI processing pipeline
8. Notification system architecture

The diagrams are created using Mermaid markdown syntax, which can be rendered by many modern documentation tools and Git platforms. To view these diagrams properly, ensure your markdown viewer supports Mermaid syntax. 