# Express + Prisma Template

A full-featured starter template for building Node.js web applications with Express, Prisma ORM, authentication, and EJS templating.

## Features

- ✅ **Express 5** - Modern web framework
- ✅ **Prisma ORM** - Type-safe database access with PostgreSQL
- ✅ **Authentication** - Passport.js with Local Strategy
- ✅ **Password Hashing** - bcryptjs for secure password storage
- ✅ **Session Management** - express-session with Prisma Session Store
- ✅ **Validation** - express-validator for input validation
- ✅ **EJS Templates** - Server-side rendering with express-ejs-layouts
- ✅ **Clean Architecture** - Organized into controllers, routes, services, and views
- ✅ **Static Files** - Public directory for CSS, images, and client-side JavaScript

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- pnpm (or npm/yarn)

## Quick Start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
SESSION_SECRET="your_random_secret_key"
PORT=3000
```

### 3. Set up the database

Run Prisma migrations to create the database tables:

```bash
pnpm exec prisma migrate dev --name init
```

Generate Prisma Client:

```bash
pnpm exec prisma generate
```

### 4. Start the development server

```bash
pnpm dev
```

The server will start at `http://localhost:3000` (or the PORT you specified).

## Project Structure

```
express-prisma/
├── lib/
│   └── prisma.js              # Prisma Client initialization
├── prisma/
│   ├── migrations/            # Database migrations
│   └── schema.prisma          # Database schema
├── public/
│   └── css/
│       └── reset.css          # CSS reset
├── scripts/
│   ├── mycommit.cjs           # Custom commit script
│   ├── printDirTree.cjs       # Directory tree generator
│   └── printHashedPassword.cjs # Password hash generator
├── src/
│   ├── controllers/
│   │   └── indexController.js # Route handlers
│   ├── routes/
│   │   └── indexRouter.js     # Route definitions
│   ├── services/
│   │   └── usersService.js    # Database operations
│   ├── views/
│   │   ├── layouts/
│   │   │   └── base.ejs       # Base layout template
│   │   ├── pages/
│   │   │   └── index.ejs      # Home page
│   │   └── partials/
│   │       └── errors.ejs     # Error messages partial
│   └── app.js                 # Express app configuration
├── .env                       # Environment variables (not in git)
├── .env.example               # Environment variables template
├── package.json
└── prisma.config.js           # Prisma configuration
```

## Available Routes

- `GET /` - Home page
- `POST /sign-up` - User registration
- `POST /login` - User login
- `GET /logout` - User logout

## Database Schema

The template includes two models:

### User Model
- `id` - Auto-incrementing primary key
- `email` - Unique email address
- `name` - Optional first name
- `lastname` - Optional last name
- `password` - Hashed password

### Session Model
- `id` - Session ID
- `sid` - Unique session identifier
- `data` - Session data
- `expiresAt` - Session expiration timestamp

## Scripts

- `pnpm dev` - Start development server with nodemon
- `pnpm exec prisma migrate dev --name <name>` - Create and apply a new migration
- `pnpm exec prisma generate` - Generate Prisma Client
- `pnpm exec prisma studio --config ./prisma.config.js` - Open Prisma Studio

## Adding Type Hints (JSDoc)

Since this is a JavaScript project, you can add type hints using JSDoc comments:

```javascript
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const myHandler = (req, res, next) => {
  // Your code here
}
```

## Utilities

### Generate Password Hash

Use the included script to generate a bcrypt hash for testing:

```bash
node scripts/printHashedPassword.cjs yourpassword
```

### View Project Tree

Generate a clean directory tree:

```bash
node scripts/printDirTree.cjs
```

## Learn More

- [Express Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Passport.js Documentation](http://www.passportjs.org/)
- [EJS Documentation](https://ejs.co/)
- [express-validator Documentation](https://express-validator.github.io/docs/)
