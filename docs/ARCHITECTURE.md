# GitReq Architecture Documentation

## Overview

GitReq is a full-stack requirements management system built with a modern, modular architecture. The application is split into two main components: a backend API and a frontend web application.

## Architecture Principles

1. **Separation of Concerns**: Backend and frontend are completely separate
2. **Modularity**: Each feature is organized into self-contained modules
3. **Scalability**: Designed to scale horizontally on GCP
4. **Maintainability**: Clear structure makes code easy to understand and modify
5. **Security**: Authentication, authorization, and input validation built-in

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │ Design System│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Services    │  │   Contexts   │  │    Hooks     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Backend (Node.js/Express)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Auth      │  │   Projects   │  │    Files     │      │
│  │   Module     │  │    Module    │  │   Module     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  Each module contains:                                       │
│  - Routes       - Controllers      - Services                │
│  - Models       - Validators                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Database (PostgreSQL)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Users     │  │   Projects   │  │    Files     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Backend Architecture

### Directory Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.js   # Database connection
│   │   └── index.js      # App configuration
│   ├── middleware/       # Express middleware
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── modules/          # Feature modules
│   │   ├── auth/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── routes/
│   │   │   └── models/
│   │   ├── projects/
│   │   └── files/
│   ├── database/         # Database files
│   │   ├── schema.sql
│   │   └── init.js
│   └── server.js         # Entry point
├── package.json
└── Dockerfile
```

### Module Pattern

Each module follows a consistent structure:

- **Routes**: Define API endpoints
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic
- **Models**: Database operations

### Data Flow

```
Request → Route → Controller → Service → Model → Database
                      ↓
Response ← Controller ← Service ← Model ← Database
```

## Frontend Architecture

### Directory Structure

```
frontend/
├── src/
│   ├── design-system/    # Separate design system
│   │   ├── tokens/       # Design tokens (colors, spacing, etc.)
│   │   └── components/   # Base UI components
│   ├── components/       # Feature components
│   │   ├── auth/
│   │   ├── projects/
│   │   ├── files/
│   │   ├── common/
│   │   └── layout/
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom hooks
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
├── package.json
└── Dockerfile
```

### Design System

The design system is **completely separate** from components:

- **Tokens**: Define design values (colors, spacing, typography)
- **Base Components**: Button, Input, Card, etc.
- **Feature Components**: Built using design system components

This separation ensures:
- Consistent design across the app
- Easy theme changes
- Reusable components
- Clear design-code separation

## Database Schema

### Tables

#### users
- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `password_hash` (VARCHAR)
- `name` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### projects
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `description` (TEXT)
- `owner_id` (UUID, Foreign Key → users.id)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### files
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `content` (TEXT)
- `type` (VARCHAR: markdown, csv, json)
- `project_id` (UUID, Foreign Key → projects.id)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Security

### Authentication
- JWT-based authentication
- Tokens stored in localStorage
- Token included in Authorization header

### Authorization
- Route-level protection
- Resource ownership verification
- User can only access their own projects/files

### Input Validation
- Express-validator for request validation
- SQL injection prevention via parameterized queries
- XSS prevention via React's built-in escaping

## Deployment (GCP)

### Components
- **Backend**: Google App Engine (Node.js 18)
- **Frontend**: Cloud Storage + Cloud CDN
- **Database**: Cloud SQL (PostgreSQL)

### Scaling
- Backend: Automatic scaling (1-10 instances)
- Frontend: Static files served via CDN
- Database: Managed scaling via Cloud SQL

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Projects
- `POST /api/projects` - Create project (protected)
- `GET /api/projects` - List user projects (protected)
- `GET /api/projects/:id` - Get project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Files
- `POST /api/files` - Create file (protected)
- `GET /api/files/project/:projectId` - List project files (protected)
- `GET /api/files/:id` - Get file (protected)
- `PUT /api/files/:id` - Update file (protected)
- `DELETE /api/files/:id` - Delete file (protected)

## Future Enhancements

1. **Collaboration**: Multi-user project access
2. **Version Control**: File versioning
3. **Import/Export**: Bulk operations
4. **Templates**: Predefined requirement templates
5. **Search**: Full-text search across files
6. **Analytics**: Usage metrics and insights
