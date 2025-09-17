# Deployment Guide - Next.js Assignment 2

This guide covers deploying your Next.js application to various platforms.

## 🚀 Vercel Deployment (Recommended)

### Automatic Deployment
Your repository is already configured for Vercel deployment:

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import `wandermate123/-Assignment2-nextjs`

2. **Deployment Settings:**
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run verify:build && npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables (if needed):**
   ```
   NODE_ENV=production
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   ```

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

## 🐳 Docker Deployment

### Local Docker
```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d
```

### Production Docker
```bash
# Build production image
docker build -t assignment2-nextjs .

# Run production container
docker run -p 3000:3000 assignment2-nextjs
```

## ☁️ AWS Deployment

### S3 Static Hosting
```bash
# Build the application
npm run build

# Upload to S3
aws s3 sync out/ s3://your-bucket-name --delete

# Enable static website hosting
aws s3 website s3://your-bucket-name --index-document index.html
```

### Lambda + API Gateway
```bash
# Use the AWS deployment page
# Visit: http://localhost:3000/aws-deployment

# Or use the deployment script
./deploy-aws.sh  # Linux/Mac
deploy-aws.bat   # Windows
```

## 🔧 Build Verification

Before deploying, always run the verification script:

```bash
npm run verify:build
```

This checks for:
- ✅ Import path issues
- ✅ Missing required files
- ✅ Package.json script validation
- ✅ Common build problems

## 📊 Monitoring Deployment

### OpenTelemetry Setup
```bash
# Start monitoring services
npm run monitoring:start

# Start instrumented app
npm run dev:instrumented
```

### Access Monitoring Dashboards
- **Jaeger:** http://localhost:16686
- **Zipkin:** http://localhost:9411
- **Prometheus:** http://localhost:9090

## 🧪 Testing Deployment

### Run All Tests
```bash
# Playwright tests
npm run test

# With UI
npm run test:ui

# Show test report
npx playwright show-report
```

### Test Specific Features
```bash
# Test blog functionality
npx playwright test tests/createpost.spec.tsx

# Test database operations
npx playwright test tests/database.spec.ts

# Test homepage
npx playwright test tests/homepage.spec.ts
```

## 🚨 Troubleshooting

### Common Build Issues

#### 1. Module Not Found Errors
```bash
# Check import paths
npm run verify:build

# Fix relative imports
# Change: import Navbar from '@/Components/Navbar'
# To: import Navbar from '../../Components/Navbar'
```

#### 2. TypeScript Errors
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Fix type issues
# Add proper type definitions
```

#### 3. Missing Dependencies
```bash
# Install all dependencies
npm install

# Check for missing packages
npm ls
```

### Vercel-Specific Issues

#### 1. Build Timeout
- Optimize build process
- Remove unnecessary dependencies
- Use build caching

#### 2. Memory Issues
- Increase memory in vercel.json
- Optimize bundle size
- Use dynamic imports

#### 3. Environment Variables
- Set all required env vars in Vercel dashboard
- Use Vercel CLI: `vercel env add`

## 📈 Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

### Image Optimization
- Use Next.js Image component
- Optimize image formats (WebP, AVIF)
- Implement lazy loading

### Code Splitting
- Use dynamic imports
- Implement route-based splitting
- Optimize component loading

## 🔒 Security Considerations

### Environment Variables
- Never commit secrets to Git
- Use Vercel environment variables
- Rotate keys regularly

### CORS Configuration
- Configure proper CORS headers
- Limit allowed origins
- Use HTTPS in production

### Database Security
- Use connection pooling
- Implement proper authentication
- Regular security updates

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Run `npm run verify:build`
- [ ] All tests passing
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] Security review completed

### Post-Deployment
- [ ] Verify all pages load correctly
- [ ] Test API endpoints
- [ ] Check monitoring dashboards
- [ ] Verify database connections
- [ ] Test user workflows

### Monitoring
- [ ] Set up error tracking
- [ ] Configure performance monitoring
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation

## 🎯 Production URLs

After successful deployment, your application will be available at:

- **Vercel:** `https://assignment2-nextjs.vercel.app`
- **Custom Domain:** `https://your-domain.com`
- **AWS S3:** `https://your-bucket.s3-website.region.amazonaws.com`

## 📚 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [AWS Documentation](https://docs.aws.amazon.com/)

---

**Note:** This deployment guide ensures your Assignment 2 application is properly deployed and monitored across all platforms.
