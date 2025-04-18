# Entry Management System - API Documentation

## Base URL
```
Development: http://localhost:3000/api
Production: https://api.entrymanagement.com/api
```

## Authentication

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}

Response 200:
{
  "token": "string",
  "refreshToken": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer {refresh_token}

Response 200:
{
  "token": "string",
  "refreshToken": "string"
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer {token}

Response 200:
{
  "message": "Logged out successfully"
}
```

## User Management

### Get Users
```http
GET /users
Authorization: Bearer {token}
Query Parameters:
- page: number
- limit: number
- role?: string
- location?: string
- search?: string

Response 200:
{
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "status": "string",
      "location_id": "string",
      "created_at": "string",
      "last_login": "string"
    }
  ],
  "total": number,
  "page": number,
  "limit": number
}
```

### Create User
```http
POST /users
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "location_id": "string",
  "team_id": "string"
}

Response 201:
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "status": "active"
}
```

### Update User
```http
PUT /users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "role": "string",
  "status": "string",
  "location_id": "string",
  "team_id": "string"
}

Response 200:
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "status": "string"
}
```

## Location Management

### Get Locations
```http
GET /locations
Authorization: Bearer {token}
Query Parameters:
- page: number
- limit: number
- search?: string

Response 200:
{
  "locations": [
    {
      "id": "string",
      "name": "string",
      "address": "string",
      "city": "string",
      "type": "string",
      "capacity": number,
      "entry_points": string[]
    }
  ],
  "total": number,
  "page": number,
  "limit": number
}
```

### Create Location
```http
POST /locations
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "string",
  "address": "string",
  "city": "string",
  "type": "string",
  "capacity": number,
  "entry_points": string[]
}

Response 201:
{
  "id": "string",
  "name": "string",
  "address": "string",
  "city": "string",
  "type": "string",
  "capacity": number,
  "entry_points": string[]
}
```

## Entry Management

### Create Entry
```http
POST /entries
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "employee | visitor | material",
  "person_id": "string",
  "person_name": "string",
  "purpose": "string",
  "material_id": "string",
  "description": "string",
  "quantity": number,
  "entry_point": "string",
  "attachments": [
    {
      "type": "string",
      "url": "string"
    }
  ]
}

Response 201:
{
  "id": "string",
  "type": "string",
  "status": "pending",
  "entry_time": "string",
  "created_by": "string"
}
```

### Get Entries
```http
GET /entries
Authorization: Bearer {token}
Query Parameters:
- page: number
- limit: number
- type?: string
- status?: string
- start_date?: string
- end_date?: string
- location_id?: string

Response 200:
{
  "entries": [
    {
      "id": "string",
      "type": "string",
      "person_id": "string",
      "person_name": "string",
      "purpose": "string",
      "material_id": "string",
      "description": "string",
      "quantity": number,
      "entry_point": "string",
      "entry_time": "string",
      "exit_time": "string",
      "status": "string",
      "created_by": "string",
      "approved_by": "string",
      "attachments": [
        {
          "type": "string",
          "url": "string"
        }
      ]
    }
  ],
  "total": number,
  "page": number,
  "limit": number
}
```

### Update Entry Status
```http
PUT /entries/{id}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "approved | rejected",
  "remarks": "string"
}

Response 200:
{
  "id": "string",
  "status": "string",
  "updated_at": "string",
  "updated_by": "string"
}
```

## Team Management

### Get Teams
```http
GET /teams
Authorization: Bearer {token}
Query Parameters:
- page: number
- limit: number
- location_id?: string
- manager_id?: string

Response 200:
{
  "teams": [
    {
      "id": "string",
      "name": "string",
      "manager_id": "string",
      "location_id": "string",
      "member_count": number,
      "created_at": "string"
    }
  ],
  "total": number,
  "page": number,
  "limit": number
}
```

### Create Team
```http
POST /teams
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "string",
  "manager_id": "string",
  "location_id": "string",
  "members": string[]
}

Response 201:
{
  "id": "string",
  "name": "string",
  "manager_id": "string",
  "location_id": "string",
  "member_count": number
}
```

## Access Card Management

### Get Access Cards
```http
GET /access-cards
Authorization: Bearer {token}
Query Parameters:
- page: number
- limit: number
- status?: string
- location_id?: string

Response 200:
{
  "cards": [
    {
      "id": "string",
      "card_number": "string",
      "assigned_to": {
        "id": "string",
        "name": "string"
      },
      "access_level": "string",
      "valid_from": "string",
      "valid_until": "string",
      "status": "string",
      "access_points": string[]
    }
  ],
  "total": number,
  "page": number,
  "limit": number
}
```

### Issue Access Card
```http
POST /access-cards
Authorization: Bearer {token}
Content-Type: application/json

{
  "employee_id": "string",
  "access_level": "string",
  "valid_from": "string",
  "valid_until": "string",
  "access_points": string[]
}

Response 201:
{
  "id": "string",
  "card_number": "string",
  "status": "active",
  "issued_at": "string",
  "issued_by": "string"
}
```

## Reports

### Generate Entry Report
```http
GET /reports/entries
Authorization: Bearer {token}
Query Parameters:
- start_date: string
- end_date: string
- type?: string
- location_id?: string
- format?: "pdf" | "csv"

Response 200:
{
  "url": "string",
  "generated_at": "string",
  "parameters": {
    "start_date": "string",
    "end_date": "string",
    "type": "string",
    "location_id": "string"
  }
}
```

### Generate Attendance Report
```http
GET /reports/attendance
Authorization: Bearer {token}
Query Parameters:
- start_date: string
- end_date: string
- team_id?: string
- location_id?: string
- format?: "pdf" | "csv"

Response 200:
{
  "url": "string",
  "generated_at": "string",
  "parameters": {
    "start_date": "string",
    "end_date": "string",
    "team_id": "string",
    "location_id": "string"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid request parameters",
  "details": {
    "field": ["error message"]
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

- Rate limit: 100 requests per 15 minutes per IP
- Headers:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time until limit resets (Unix timestamp)

## Pagination

All list endpoints support pagination with the following parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

Response includes:
- `total`: Total number of items
- `page`: Current page number
- `limit`: Items per page
- `has_more`: Boolean indicating if more items exist

## Filtering

Common filter parameters:
- `search`: Search term for text fields
- `start_date`: Start date for date range (ISO 8601)
- `end_date`: End date for date range (ISO 8601)
- `status`: Resource status
- `type`: Resource type
- `location_id`: Location identifier

## Sorting

Add `sort` parameter to list endpoints:
- Format: `field:direction`
- Example: `sort=created_at:desc`
- Multiple sorts: `sort=status:asc,created_at:desc`

## Versioning

API versioning is handled through the URL:
- Current version: `/api/v1`
- Legacy support: Maintained for one year after deprecation
- Version sunset notices: Provided 6 months in advance 