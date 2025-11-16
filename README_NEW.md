# GitReq - Requirements Management Platform

**A modern, full-stack web application for managing engineering requirements**

Built with React, Node.js, Express, and PostgreSQL. Designed for scalability and deployed on Google Cloud Platform.

---

## Overview

GitReq is a centralized platform for organizing and managing structured engineering requirements. It provides a complete web-based solution for creating, storing, and collaborating on project requirements following industry standards like ISO and EARS.

### Vision

As LLMs and Agents evolve, the key is to clearly describe our requirements and provide them to agents, robots, and machines for development. GitReq bridges this gap by providing well-structured, natural language requirements that serve as the foundation for automated workflows.

---

## Features

- **User Authentication**: Secure JWT-based authentication system
- **Project Management**: Create and organize multiple projects
- **File Management**: Store requirements in Markdown, CSV, or JSON formats
- **Clean Design**: Modular design system (no Tailwind, custom components)
- **Responsive UI**: Built with React and Vite for optimal performance
- **RESTful API**: Well-documented backend API
- **Cloud-Ready**: Configured for Google Cloud Platform deployment
- **Docker Support**: Complete Docker Compose setup for local development

---

## Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 15+
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Security**: bcryptjs for password hashing

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Router**: React Router 6
- **HTTP Client**: Axios
- **Styling**: Custom design system (no CSS frameworks)

### Infrastructure
- **Hosting**: Google Cloud Platform
  - Backend: App Engine
  - Frontend: Cloud Storage + CDN
  - Database: Cloud SQL (PostgreSQL)
- **Containers**: Docker & Docker Compose

---

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- npm 9+

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gitreq
   ```

2. **Setup Database**
   ```bash
   # Create PostgreSQL database
   createdb gitreq
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm run dev
   ```

4. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

### Docker Setup (Alternative)

```bash
# Start all services
docker-compose up -d

# Access at http://localhost
```

---

## Project Structure

```
gitreq/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── middleware/     # Express middleware
│   │   ├── modules/        # Feature modules
│   │   │   ├── auth/       # Authentication
│   │   │   ├── projects/   # Project management
│   │   │   └── files/      # File management
│   │   ├── database/       # Database schema
│   │   └── server.js       # Entry point
│   ├── package.json
│   └── Dockerfile
├── frontend/                # React/Vite application
│   ├── src/
│   │   ├── design-system/  # Design tokens & base components
│   │   ├── components/     # Feature components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── contexts/       # React contexts
│   │   └── App.jsx         # Main app
│   ├── package.json
│   └── Dockerfile
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md     # System architecture
│   ├── SETUP.md            # Setup guide
│   ├── DEPLOYMENT.md       # Deployment guide
│   └── DEVELOPMENT.md      # Development guide
├── docker-compose.yml       # Docker Compose config
└── README.md               # This file
```

---

## Architecture Highlights

### Modular Backend

Each feature is organized into self-contained modules:
- **Routes**: API endpoints
- **Controllers**: Request handlers
- **Services**: Business logic
- **Models**: Database operations

### Design System (Frontend)

Separate design system from components:
- **Tokens**: Design values (colors, spacing, typography)
- **Base Components**: Reusable UI components
- **Feature Components**: Built with base components

**No Tailwind CSS** - Uses custom design tokens and inline styles.

### Security

- JWT authentication
- Password hashing with bcrypt
- Input validation
- SQL injection prevention
- CORS configuration

---

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - List user projects
- `GET /api/projects/:id` - Get project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Files
- `POST /api/files` - Create file
- `GET /api/files/project/:projectId` - List project files
- `GET /api/files/:id` - Get file
- `PUT /api/files/:id` - Update file
- `DELETE /api/files/:id` - Delete file

---

## Documentation

- **[Setup Guide](docs/SETUP.md)**: Detailed installation instructions
- **[Architecture](docs/ARCHITECTURE.md)**: System design and patterns
- **[Deployment](docs/DEPLOYMENT.md)**: GCP deployment guide
- **[Development](DEVELOPMENT.md)**: Development guidelines

---

## Development

### Code Style

- ES6+ JavaScript
- Functional React components with hooks
- Modular architecture
- Comprehensive error handling
- Inline documentation

### Adding Features

1. Create module in `backend/src/modules/`
2. Create components in `frontend/src/components/`
3. Use design system tokens for styling
4. Add API service in `frontend/src/services/`
5. Update documentation

---

## Deployment

### Google Cloud Platform

Configured for GCP deployment:
- **Backend**: App Engine
- **Frontend**: Cloud Storage + Cloud CDN
- **Database**: Cloud SQL (PostgreSQL)

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

### Estimated Costs

Starting from ~$12-22/month for minimal usage.

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## License

MIT License - Copyright (c) 2025 Guaeca

---

## Support

- **Email**: eduardo@guaeca.fr
- **GReq Platform**: https://greq.guaeca.com
- **Documentation**: See `/docs` folder

---

## Roadmap

- [x] User authentication
- [x] Project management
- [x] File management
- [x] Design system
- [x] GCP deployment setup
- [ ] Collaboration features
- [ ] File versioning
- [ ] Template library
- [ ] Search functionality
- [ ] GReq integration
- [ ] Community features

---

**Built with ❤️ by Guaeca**
