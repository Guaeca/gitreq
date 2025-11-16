# GitReq Setup Guide

## Prerequisites

### Required Software
- Node.js 18+ ([Download](https://nodejs.org/))
- PostgreSQL 15+ ([Download](https://www.postgresql.org/download/))
- npm 9+ (comes with Node.js)
- Git ([Download](https://git-scm.com/))

### Optional (for Docker deployment)
- Docker ([Download](https://www.docker.com/))
- Docker Compose

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd gitreq
```

### 2. Database Setup

#### Install PostgreSQL
Follow the installation instructions for your operating system.

#### Create Database
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE gitreq;

# Exit PostgreSQL
\q
```

#### Initialize Schema
The schema will be automatically initialized when you start the backend for the first time.

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your settings
nano .env
```

#### Configure Environment Variables (.env)
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=gitreq
DB_USER=postgres
DB_PASSWORD=your_postgres_password

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

#### Start Backend
```bash
npm run dev
```

Backend will run on `http://localhost:3000`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env if needed
nano .env
```

#### Configure Environment Variables (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

#### Start Frontend
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### 5. Access the Application

Open your browser and navigate to:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`
- Health Check: `http://localhost:3000/health`

## Docker Setup (Alternative)

### Using Docker Compose

```bash
# From the root directory
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

This will start:
- PostgreSQL on port 5432
- Backend on port 3000
- Frontend on port 80

Access the application at `http://localhost`

## Database Initialization

The database schema is automatically initialized when the backend starts. You can also manually initialize it:

```bash
cd backend
node -e "import('./src/database/init.js').then(m => m.initDatabase())"
```

## Testing the Installation

### 1. Test Backend Health
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-16T...",
  "environment": "development"
}
```

### 2. Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Common Issues

### Port Already in Use
If port 3000 or 5173 is already in use:
- Change the PORT in backend/.env
- Vite will automatically use next available port

### Database Connection Error
- Ensure PostgreSQL is running
- Check credentials in .env
- Verify database exists

### Module Not Found Errors
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

## Development Workflow

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite with hot reload
```

### Building for Production

#### Backend
```bash
cd backend
npm run start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview  # Preview production build
```

## Next Steps

1. Read the [Architecture Documentation](./ARCHITECTURE.md)
2. Review the [Deployment Guide](./DEPLOYMENT.md)
3. Check out the [API Documentation](./API.md)
4. Explore the code structure

## Support

For issues or questions:
- Check existing documentation in `/docs`
- Review code comments
- Contact: eduardo@guaeca.fr
