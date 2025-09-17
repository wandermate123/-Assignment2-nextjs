# Next.js Assignment 2 - CSE3CWA/CSE5006

A comprehensive Next.js application built for Assignment 2, featuring dynamic pages, database integration, monitoring, and AWS deployment capabilities.

## 🚀 Features

### Core Application
- **Next.js 15** with TypeScript and App Router
- **Tailwind CSS** for responsive design
- **Dark/Light Mode** theming with cookies
- **Accessibility** compliance (WCAG 2.1 AA)
- **Student Information** display (Student Number: 91704)

### Dynamic Blog System
- **Blog Creation** with Bootstrap integration
- **Dynamic Routing** for individual blog posts
- **Search Functionality** with real-time filtering
- **LocalStorage Persistence** for blog data
- **Responsive Design** with mobile-first approach

### Database Integration
- **Sequelize ORM** with SQLite database
- **User Management** with CRUD operations
- **Database Migrations** and seeding
- **API Routes** for data management
- **CORS Support** for cross-origin requests

### GitHub Automation
- **Git Command Execution** using execSync
- **README.md Updates** with automated commits
- **GitHub API Integration** for repository management
- **Batch Operations** for multiple commands

### Docker & Containerization
- **Multi-service Setup** with Docker Compose
- **Frontend & API Services** separation
- **SQLite Volume** management
- **Development & Production** configurations

### Monitoring & Observability
- **OpenTelemetry** instrumentation
- **Jaeger** distributed tracing
- **Zipkin** alternative tracing
- **Prometheus** metrics collection
- **Real-time Monitoring** dashboard

### AWS Deployment
- **S3 Static Hosting** for website deployment
- **Lambda Functions** for serverless backend
- **API Gateway** for RESTful APIs
- **Interactive Deployment** interface
- **Cost Management** and cleanup procedures

### Testing
- **Playwright** end-to-end testing
- **Cross-browser Testing** support
- **Automated Test Suites** for all features
- **Test Reports** and documentation

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── Components/         # React components
│   │   ├── api/               # API routes
│   │   └── [pages]/           # Application pages
│   ├── components/            # Shared components
│   └── lib/                   # Utility libraries
├── tests/                     # Playwright test suites
├── migrations/                # Database migrations
├── scripts/                   # Build and deployment scripts
├── docker-compose.yml         # Docker services
├── instrumentation.ts         # OpenTelemetry setup
└── README.md                  # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (for containerization)
- AWS CLI (for deployment)

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd assignment-2

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Initialize database
npm run db:init

# Start development server
npm run dev
```

### Docker Setup
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Monitoring Setup
```bash
# Start monitoring services
npm run monitoring:start

# Start instrumented app
npm run dev:instrumented
```

## 🧪 Testing

### Run All Tests
```bash
npm run test
```

### Run Specific Tests
```bash
# Playwright tests
npx playwright test

# With UI
npx playwright test --ui

# Specific test file
npx playwright test tests/createpost.spec.tsx
```

### Test Reports
```bash
# Show test report
npx playwright show-report
```

## 🚀 Deployment

### AWS Deployment
```bash
# Configure AWS credentials
aws configure

# Run deployment script
./deploy-aws.sh  # Linux/Mac
deploy-aws.bat   # Windows

# Access deployment dashboard
# Visit: http://localhost:3000/aws-deployment
```

### Docker Deployment
```bash
# Build and run
docker-compose up --build

# Production build
docker-compose -f docker-compose.prod.yml up
```

## 📊 Available Pages

- **Home** (`/`) - Blog listing with search
- **About** (`/about`) - Student information
- **Create Blog** (`/createblog`) - Blog creation form
- **Users** (`/users`) - User management
- **Database** (`/database`) - Database operations
- **Docker** (`/docker`) - Containerization tools
- **GitHub** (`/github`) - Git automation
- **Monitoring** (`/monitoring`) - Observability dashboard
- **AWS Deployment** (`/aws-deployment`) - Cloud deployment
- **API Test** (`/api-test`) - API testing
- **API Docs** (`/api-docs`) - API documentation

## 🔧 API Endpoints

### User Management
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PATCH /api/users?id={id}` - Update user
- `DELETE /api/users?id={id}` - Delete user

### Testing
- `GET /api/test` - Test endpoint
- `POST /api/test` - Hash generation

### AWS Services
- `POST /api/aws/s3` - S3 operations
- `POST /api/aws/lambda` - Lambda operations
- `POST /api/aws/apigateway` - API Gateway operations

## 📚 Documentation

- [Assignment Summary](ASSIGNMENT_SUMMARY.md)
- [AWS Deployment Guide](AWS_DEPLOYMENT_README.md)
- [Monitoring Setup](MONITORING_README.md)

## 🎯 Assignment Requirements

### Part 1 ✅
- [x] Next.js application with create-next-app
- [x] Student number in top left corner
- [x] Header with hamburger menu
- [x] Dark/Light mode themes
- [x] Footer with copyright and student info
- [x] Accessibility compliance
- [x] Cookie-based navigation memory
- [x] About page with student details
- [x] GitHub integration with execSync

### Part 2 ✅
- [x] Sequelize and Prisma integration
- [x] Docker containerization
- [x] CRUD API implementation
- [x] Database save functionality
- [x] Playwright testing (2x tests)
- [x] User feedback survey integration
- [x] Application instrumentation
- [x] Cloud deployment (AWS)
- [x] Lambda function integration

## 🏗️ Architecture

### Frontend
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Bootstrap** for additional components

### Backend
- **Next.js API Routes** for serverless functions
- **Sequelize ORM** for database operations
- **SQLite** for data persistence
- **CORS** for cross-origin requests

### Infrastructure
- **Docker** for containerization
- **OpenTelemetry** for observability
- **AWS Services** for cloud deployment
- **Playwright** for testing

## 🔒 Security

- **Input Validation** on all forms
- **SQL Injection** prevention with ORM
- **CORS** configuration
- **Environment Variables** for secrets
- **IAM Roles** for AWS permissions

## 📈 Performance

- **Static Generation** where possible
- **Image Optimization** with Next.js
- **Code Splitting** and lazy loading
- **Database Indexing** for queries
- **Caching** strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of CSE3CWA/CSE5006 assignment.

## 👨‍💻 Author

**Student Number:** 91704  
**Course:** CSE3CWA/CSE5006  
**Institution:** La Trobe University

## 🎉 Acknowledgments

- La Trobe University for the assignment requirements
- Next.js team for the excellent framework
- OpenTelemetry community for monitoring tools
- AWS for cloud services
- All open-source contributors

---

**Note:** This application demonstrates full-stack development skills including frontend, backend, database, testing, monitoring, and cloud deployment capabilities as required for Assignment 2.