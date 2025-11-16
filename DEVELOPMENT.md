# GitReq Development Guide

## Project Structure

GitReq follows a modular architecture with clear separation between backend and frontend.

```
gitreq/
├── backend/              # Node.js/Express API
├── frontend/             # React/Vite application
├── docs/                 # Documentation
├── docker-compose.yml    # Docker setup
└── README.md            # Project overview
```

## Code Organization

### Backend Structure

```
backend/src/
├── config/              # Configuration files
│   ├── database.js      # Database connection
│   └── index.js         # App configuration
├── middleware/          # Express middleware
│   ├── authMiddleware.js    # JWT authentication
│   └── errorHandler.js      # Error handling
├── modules/             # Feature modules (modular architecture)
│   ├── auth/            # Authentication module
│   │   ├── controllers/ # HTTP request handlers
│   │   ├── services/    # Business logic
│   │   ├── routes/      # API endpoints
│   │   └── models/      # Database operations
│   ├── projects/        # Project management module
│   └── files/           # File management module
├── database/            # Database setup
│   ├── schema.sql       # Database schema
│   └── init.js          # Schema initialization
└── server.js            # Application entry point
```

### Frontend Structure

```
frontend/src/
├── design-system/       # Separate design system (NO Tailwind)
│   ├── tokens/          # Design tokens
│   │   ├── colors.js    # Color palette
│   │   ├── spacing.js   # Spacing scale
│   │   └── typography.js # Typography system
│   └── components/      # Base UI components
│       ├── Button.jsx   # Button component
│       ├── Input.jsx    # Input component
│       └── Card.jsx     # Card component
├── components/          # Feature components
│   ├── auth/            # Authentication components
│   ├── projects/        # Project components
│   ├── files/           # File components
│   └── layout/          # Layout components
├── pages/               # Page components
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   └── ProjectPage.jsx
├── services/            # API services
│   ├── api.js           # Axios instance
│   ├── authService.js   # Auth API calls
│   ├── projectService.js # Project API calls
│   └── fileService.js   # File API calls
├── contexts/            # React contexts
│   └── AuthContext.jsx  # Authentication context
├── hooks/               # Custom React hooks
├── styles/              # Global styles
│   └── global.css       # Global CSS
└── utils/               # Utility functions
```

## Design System Philosophy

### Separation of Design and Code

GitReq uses a **design system separate from components**:

1. **Design Tokens** (`design-system/tokens/`)
   - Define raw design values (colors, spacing, typography)
   - Single source of truth for design decisions
   - Easy to update and maintain

2. **Base Components** (`design-system/components/`)
   - Built using design tokens
   - No business logic
   - Highly reusable

3. **Feature Components** (`components/`)
   - Built using base components and tokens
   - Contain business logic
   - Specific to features

### Example

```jsx
// Design Token (design-system/tokens/colors.js)
export const colors = {
  primary: { 500: '#2196f3' }
};

// Base Component (design-system/components/Button.jsx)
import { colors } from '../tokens';
const Button = () => <button style={{ backgroundColor: colors.primary[500] }} />;

// Feature Component (components/auth/LoginForm.jsx)
import { Button } from '../../design-system/components';
const LoginForm = () => <Button>Login</Button>;
```

## Module Pattern (Backend)

Each backend module is self-contained:

### Creating a New Module

1. Create module directory structure:
```bash
mkdir -p backend/src/modules/newmodule/{controllers,services,routes,models}
```

2. Create Model (`models/NewModel.js`):
```javascript
export class NewModel {
  static async create(data) {
    // Database operations
  }
}
```

3. Create Service (`services/newService.js`):
```javascript
export class NewService {
  static async createItem(data) {
    // Business logic
    return await NewModel.create(data);
  }
}
```

4. Create Controller (`controllers/newController.js`):
```javascript
export class NewController {
  static async createItem(req, res, next) {
    try {
      const result = await NewService.createItem(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
```

5. Create Routes (`routes/newRoutes.js`):
```javascript
import express from 'express';
const router = express.Router();
router.post('/', NewController.createItem);
export default router;
```

6. Register routes in `server.js`:
```javascript
import newRoutes from './modules/newmodule/routes/newRoutes.js';
app.use('/api/items', newRoutes);
```

## Component Pattern (Frontend)

### Creating a New Component

1. Create component file:
```jsx
// components/feature/MyComponent.jsx
import React from 'react';
import { Button, Card } from '../../design-system/components';
import { spacing, colors } from '../../design-system/tokens';

const MyComponent = ({ title, onAction }) => {
  const styles = {
    container: {
      padding: spacing[4],
      backgroundColor: colors.neutral[50],
    },
  };

  return (
    <Card>
      <h2>{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </Card>
  );
};

export default MyComponent;
```

2. Use inline styles with design tokens (NO CSS-in-JS libraries, NO Tailwind)

## Coding Standards

### JavaScript/React

- Use ES6+ features
- Functional components with hooks
- Descriptive variable names
- Comments for complex logic
- PropTypes or TypeScript for type checking

### File Naming

- Components: `PascalCase.jsx`
- Services: `camelCase.js`
- Utilities: `camelCase.js`
- Constants: `UPPER_CASE.js`

### Code Style

```javascript
// Good
const fetchUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

// Avoid
const f = (id) => api.get('/users/' + id).then(r => r.data);
```

## API Design

### RESTful Conventions

- `GET /api/resource` - List resources
- `GET /api/resource/:id` - Get single resource
- `POST /api/resource` - Create resource
- `PUT /api/resource/:id` - Update resource
- `DELETE /api/resource/:id` - Delete resource

### Response Format

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Format

```json
{
  "code": 400,
  "message": "Error message"
}
```

## Testing

### Backend Tests (to be implemented)

```bash
cd backend
npm test
```

### Frontend Tests (to be implemented)

```bash
cd frontend
npm test
```

## Common Tasks

### Adding a New Page

1. Create page component in `frontend/src/pages/`
2. Add route in `App.jsx`
3. Add navigation link in `Header.jsx`

### Adding a New API Endpoint

1. Add route in module's `routes/` file
2. Add controller method
3. Add service method if needed
4. Add model method for database operations

### Updating Design Tokens

1. Modify values in `design-system/tokens/`
2. Changes propagate to all components automatically

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat: add new feature"

# Push changes
git push origin feature/new-feature

# Create pull request
```

## Debugging

### Backend Debugging

```bash
# View logs
cd backend
npm run dev  # Shows console.log output
```

### Frontend Debugging

- Use React DevTools browser extension
- Check browser console for errors
- Use `console.log()` for debugging

### Database Debugging

```bash
# Connect to local database
psql -U postgres -d gitreq

# View tables
\dt

# Query data
SELECT * FROM users;
```

## Performance Tips

### Backend
- Use database indexes
- Implement pagination
- Cache frequently accessed data
- Use connection pooling

### Frontend
- Lazy load components
- Memoize expensive computations
- Optimize images
- Use production build for deployment

## Best Practices

1. **Keep it Simple**: Write clear, understandable code
2. **Modular Design**: Each module/component has single responsibility
3. **Consistent Style**: Follow project conventions
4. **Document Code**: Add comments for complex logic
5. **Error Handling**: Always handle errors gracefully
6. **Security First**: Validate inputs, sanitize outputs
7. **Test Coverage**: Write tests for critical paths

## Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Vite Docs](https://vitejs.dev/)

## Getting Help

1. Check existing documentation in `/docs`
2. Review code comments
3. Search for similar patterns in codebase
4. Contact: eduardo@guaeca.fr
