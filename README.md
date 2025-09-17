# GitHub Automation App - Assignment 2

A Next.js application for automating GitHub operations with Docker, Prisma/Sequelize integration, and comprehensive testing.

## Student Information

- **Name**: Your Name
- **Student Number**: 12345678
- **Subject**: CSE3CWA/CSE5006
- **Assignment**: 2
- **Date**: 2025

## Features

### Core Functionality
- ✅ GitHub repository automation
- ✅ Docker containerization
- ✅ Database integration (Prisma & Sequelize)
- ✅ Dark/Light theme support
- ✅ Accessibility compliance
- ✅ Cookie-based navigation state
- ✅ Responsive design
- ✅ Automated testing with Playwright

### Pages
- **Home**: GitHub integration form with command generation
- **About**: Student information and project description
- **GitHub**: Advanced GitHub operations
- **Database**: Prisma/Sequelize CRUD operations
- **Docker**: Containerization configuration

## Technology Stack

### Frontend
- Next.js 15 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Lucide React Icons

### Backend
- Node.js
- Prisma ORM
- Sequelize ORM
- SQLite Database

### DevOps
- Docker
- Docker Compose
- GitHub Actions (ready)
- Playwright Testing

## Getting Started

### Prerequisites
- Node.js 18+
- Docker (optional)
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd assignment-2
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Setup

1. Build the Docker image:
```bash
docker build -t git-automation-app .
```

2. Run with Docker Compose:
```bash
docker-compose up -d
```

3. Access the application at [http://localhost:3000](http://localhost:3000)

## Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run specific test file
npx playwright test tests/homepage.spec.ts
```

### Test Coverage
- Homepage functionality and accessibility
- Database operations and CRUD functionality
- Theme switching and responsive design
- Navigation and user interactions

## API Endpoints

### Git Operations
- `POST /api/git/execute` - Execute single git commands
- `POST /api/git/execute-batch` - Execute multiple git commands

### Database Operations
- `POST /api/database/save` - Save commands to database

### System
- `GET /api/health` - Health check endpoint
- `POST /api/analytics` - Analytics tracking
- `POST /api/errors` - Error tracking

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── about/         # About page
│   ├── database/      # Database page
│   ├── docker/        # Docker page
│   ├── github/        # GitHub page
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page
├── components/        # React components
├── lib/              # Utility libraries
└── types/            # TypeScript types

tests/                # Playwright tests
prisma/              # Database schema
```

## Accessibility Features

- Skip links for keyboard navigation
- Proper heading structure
- ARIA labels and roles
- Focus management
- High contrast support
- Screen reader compatibility

## Performance Features

- Analytics and performance monitoring
- Error tracking and logging
- Optimized images and assets
- Lazy loading
- Code splitting

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Docker
1. Build the image: `docker build -t git-automation-app .`
2. Run: `docker run -p 3000:3000 git-automation-app`

### Other Platforms
- AWS Elastic Beanstalk
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is part of CSE3CWA/CSE5006 Assignment 2 at La Trobe University.

## Acknowledgments

- La Trobe University for the assignment requirements
- Next.js team for the excellent framework
- Playwright team for the testing framework
- All open-source contributors

---

**Note**: This is a student project for educational purposes. The git command execution is simulated for safety reasons.
