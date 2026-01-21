# File Uploader

This project is a simple file uploader application that allows users to upload files to a server. It supports multiple file types and provides a user-friendly interface for managing uploads.

This project is part of [The Odin Project's Node.js curriculum](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs).

## Features
- Upload multiple files at once
- Support for various file types (images, documents, etc.)
- Error handling for failed uploads
- Responsive design for mobile and desktop

## Technologies Used
- Backend: Node.js, Express.js
- Frontend: [EJS templates](https://ejs.co/), [express-ejs-layouts](https://www.npmjs.com/package/express-ejs-layouts), CSS, JavaScript
- Authentication: [Passport.js](http://www.passportjs.org/)
- File Storage: [Multer](https://github.com/expressjs/multer), [Cloudinary](https://cloudinary.com/)
- Database: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- Validation: express-validator
- Password Hashing: bcryptjs
- Session Management: [prisma-session-store](https://github.com/kleydon/prisma-session-store)

## Architecture

### System Architecture
```mermaid
graph TB
    Client[Browser Client]
    Server[Express.js Server]
    DB[(PostgreSQL Database)]
    Cloud[Cloudinary Storage]
    Multer[Multer Middleware]
    Passport[Passport.js Auth]
    Prisma[Prisma ORM]
    
    Client -->|HTTP Requests| Server
    Server -->|Session Management| Passport
    Passport -->|Read/Write Sessions| Prisma
    Server -->|File Upload| Multer
    Multer -->|Store Files| Cloud
    Server -->|Database Queries| Prisma
    Prisma -->|SQL Queries| DB
    Cloud -->|File URLs| Server
    Server -->|HTTP Responses| Client
```

### Database Schema
```mermaid
erDiagram
    User ||--o{ Entry : owns
    Entry ||--o{ Entry : "parent/child"
    Entry ||--o| Folder : "is a"
    Entry ||--o| File : "is a"
    
    User {
        int id PK
        string email UK
        string password
        string name
        string lastname
        datetime createdAt
        datetime updatedAt
    }
    
    Entry {
        int id PK
        string name
        int ownerId FK
        int parentId FK
        datetime createdAt
        datetime updatedAt
    }
    
    Folder {
        int id PK,FK
    }
    
    File {
        int id PK,FK
        int size
        string mime
        string url
        string publicId
        string resourceType
        datetime uploadedAt
    }
    
    Session {
        string id PK
        string sid UK
        string data
        datetime expiresAt
    }
```

## Installation

### Prerequisites
- Node.js (v24.13.0 or later)
- PostgreSQL database
- Cloudinary account for file storage
- pnpm package manager

### Monorepo Setup
This project is part of a pnpm workspace monorepo. To set up the monorepo, follow these steps:

```bash
# Navigate to the package
cd NodeJS/FileUploader

# Install dependencies
pnpm install

# Run package scripts
pnpm dev
```

### Environment Variables
Create a `.env` file in the project root:
```bash
cp .env.example .env
```

Required environment variables:
```env
# Database connection (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/fileuploader?schema=public"

# Session secret (use a strong random string)
SESSION_SECRET="your_secure_random_secret_here"

# Server port
PORT=3000

# Cloudinary credentials (from your Cloudinary dashboard)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Optional: Seed data admin password (bcrypt hashed)
SEED_ADMIN_PASSWORD="$2a$10$your_hashed_password"
```

### Database Setup
```bash
# Run migrations to create database schema
pnpm prisma migrate dev

# Generate Prisma Client
pnpm prisma generate

# (Optional) Seed the database with sample data
pnpm prisma db seed
```

### Running the Application
```bash
# Development mode with auto-reload
pnpm dev
```

The application will be available at `http://localhost:3000` (or your configured PORT).

## Usage
- Navigate to `http://localhost:3000` in your web browser.
- Register a new account or log in if you already have one.
- Use the upload interface to select and upload files.
- Manage your uploaded files through the provided interface.

## API Routes

### Authentication
- `GET /auth` - Login and registration page
- `POST /sign-up` - Register a new user
- `POST /login` - Authenticate user
- `GET /logout` - End user session (requires auth)

### Main Interface
- `GET /` - Main dashboard/file browser (requires auth)

### File Management
- `POST /files/upload` - Upload files (requires auth, max 5MB per file)
- `GET /files/:id` - View file details (requires auth + ownership)
- `GET /files/:id/download` - Download a file (requires auth + ownership)

### Folder Management
- `POST /folders/create` - Create a new folder (requires auth)
- `GET /folders/:id` - View folder contents (requires auth + ownership)
- `GET /folders/:id/download` - Download folder as ZIP (requires auth + ownership)

### Entry Operations
- `POST /entries/:id/rename` - Rename a file or folder (requires auth + ownership)
- `POST /entries/:id/delete` - Delete a file or folder (requires auth + ownership)

## Development

### Available Scripts
- `pnpm dev` - Start development server with nodemon (auto-reload on changes)
- `pnpm prisma migrate dev` - Create and apply database migrations
- `pnpm prisma generate` - Generate Prisma Client
- `pnpm prisma db seed` - Seed database with sample data
- `pnpm prisma studio` - Open Prisma Studio (database GUI)

### Development Tools
- **Nodemon**: Auto-restarts server on file changes
- **Prisma Studio**: Visual database editor at `http://localhost:5555`
- **Express Validator**: Request validation and sanitization
- **Rate Limiting**: 100 requests per 15 minutes per IP

### Key Features Implementation
- **Authentication**: Passport.js with Local Strategy and bcrypt password hashing
- **Session Management**: Prisma-backed sessions with 2-day expiration
- **File Upload**: Multer for parsing multipart/form-data, Cloudinary for storage
- **Ownership Middleware**: Ensures users can only access their own files/folders
- **Hierarchical Structure**: Self-referencing Entry model for folder trees

## Project Structure
```
FileUploader
├── lib
│   ├── cloudinary.js
│   └── prisma.js
├── prisma
│   ├── migrations
│   │   ├── 20260104173458_init
│   │   │   └── migration.sql
│   │   ├── 20260106171710_add_folder_files_models
│   │   │   └── migration.sql
│   │   ├── 20260110172555_add_entry_folder_file_structure
│   │   │   └── migration.sql
│   │   ├── 20260121003914_add_public_id_and_resource_type_fields_to_file_model
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.js
├── public
│   ├── assets
│   │   └── icons.svg
│   ├── css
│   │   ├── layouts
│   │   │   └── base.css
│   │   ├── pages
│   │   │   ├── auth.css
│   │   │   ├── file.css
│   │   │   └── index.css
│   │   ├── partials
│   │   │   ├── errors.css
│   │   │   └── header.css
│   │   └── reset.css
│   └── js
│       ├── lib
│       │   └── utils.js
│       ├── pages
│       │   ├── auth.js
│       │   └── index.js
│       └── partials
│           └── errors.js
├── scripts
│   ├── mycommit.cjs
│   ├── printDirTree.cjs
│   └── printHashedPassword.cjs
├── src
│   ├── controllers
│   │   ├── entriesController.js
│   │   ├── filesController.js
│   │   ├── foldersController.js
│   │   └── indexController.js
│   ├── middlewares
│   │   ├── auth.js
│   │   └── ownership.js
│   ├── routes
│   │   ├── entriesRouter.js
│   │   ├── filesRouter.js
│   │   ├── foldersRouter.js
│   │   └── indexRouter.js
│   ├── services
│   │   ├── entriesService.js
│   │   ├── filesService.js
│   │   ├── foldersService.js
│   │   └── usersService.js
│   ├── views
│   │   ├── layouts
│   │   │   └── base.ejs
│   │   ├── pages
│   │   │   ├── auth.ejs
│   │   │   ├── file.ejs
│   │   │   └── index.ejs
│   │   └── partials
│   │       ├── errors.ejs
│   │       └── header.ejs
│   └── app.js
├── .env
├── .env.example
├── .gitignore
├── jsconfig.json
├── package.json
├── pnpm-lock.yaml
├── prisma.config.js
└── README.md
```

## Acknowledgements
- [The Odin Project](https://www.theodinproject.com/) for the curriculum and guidance.
- The open-source community for their invaluable contributions.

## License
This project is Open Source and available for educational purposes.