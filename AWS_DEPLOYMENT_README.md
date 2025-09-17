# AWS Deployment Guide

This guide covers deploying your Next.js application to AWS using S3, Lambda, and API Gateway.

## 🚀 Prerequisites

### 1. AWS Account Setup
- Create an AWS account
- Set up AWS CLI or use AWS Console
- Configure IAM permissions

### 2. Environment Variables
Create a `.env.local` file with your AWS credentials:

```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_LAMBDA_ROLE_ARN=arn:aws:iam::account:role/lambda-execution-role
```

## 📦 S3 Static Website Hosting

### Step 1: Create S3 Bucket
1. Login to AWS Console
2. Navigate to S3 service
3. Click "Create bucket"
4. Enter bucket name (must be globally unique)
5. Choose region
6. Uncheck "Block all public access"
7. Create bucket

### Step 2: Configure Bucket Policy
Apply the following policy for public access:

```json
{
  "Version": "2025-07-20",
  "Id": "GetObjPolicy",
  "Statement": [{
    "Sid": "s3AllowPublicAccess",
    "Principal": "*",
    "Effect": "Allow",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::your-bucket-name/*"
  }]
}
```

### Step 3: Enable Static Website Hosting
1. Go to bucket Properties
2. Scroll to "Static website hosting"
3. Enable it
4. Set index document to `index.html`
5. Set error document to `error.html`

### Step 4: Upload Files
1. Build your Next.js app: `npm run build`
2. Upload the `out` folder contents to S3
3. Test the website URL

### Step 5: Cleanup
- Delete all objects in the bucket
- Delete the bucket

## ⚡ Lambda Functions

### Step 1: Create IAM Role
1. Go to IAM service
2. Create role for Lambda
3. Attach `AWSLambdaBasicExecutionRole` policy
4. Note the role ARN

### Step 2: Create Lambda Function
1. Go to Lambda service
2. Click "Create function"
3. Choose "Author from scratch"
4. Set function name
5. Choose Node.js runtime
6. Select the IAM role created above
7. Create function

### Step 3: Add Function Code
Use the provided template or create custom code:

```javascript
exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify({
      message: 'Hello from Lambda!',
      timestamp: new Date().toISOString(),
      event: event
    })
  };
};
```

### Step 4: Test Function
1. Go to Test tab
2. Create test event
3. Run test
4. Check execution results

### Step 5: Cleanup
- Delete the Lambda function

## 🌐 API Gateway

### Step 1: Create HTTP API
1. Go to API Gateway service
2. Click "Create API"
3. Choose "HTTP API"
4. Click "Build"
5. Set API name
6. Create API

### Step 2: Configure CORS
1. Go to API settings
2. Set CORS configuration:
   - Allow Origins: `*`
   - Allow Methods: `GET, POST, PUT, DELETE`
   - Allow Headers: `Content-Type, Authorization`

### Step 3: Create Routes
1. Click "Create" under Routes
2. Set method (GET, POST, etc.)
3. Set resource path (e.g., `/api/hello`)
4. Set integration type to Lambda
5. Select your Lambda function
6. Create route

### Step 4: Deploy API
1. Click "Deploy"
2. Create new stage (e.g., "prod")
3. Deploy
4. Note the API endpoint URL

### Step 5: Test API
```bash
curl https://your-api-id.execute-api.region.amazonaws.com/prod/api/hello
```

### Step 6: Cleanup
- Delete the API Gateway

## 🔧 Using the AWS Deployment Page

### Access the Page
Visit: http://localhost:3000/aws-deployment

### Features
1. **S3 Tab**: Create and manage S3 buckets
2. **Lambda Tab**: Create and manage Lambda functions
3. **API Gateway Tab**: Create and manage API Gateways

### Interactive Elements
- Form inputs for resource names
- One-click deployment buttons
- Real-time status updates
- Policy and code templates
- Step-by-step instructions

## 📋 Lab Instructions

### Lab 1: S3 Bucket
1. Use the AWS Deployment page
2. Go to S3 tab
3. Enter bucket name
4. Click "Create S3 Bucket"
5. Follow the instructions
6. Test the external S3 link
7. Delete the bucket when finished

### Lab 2: Lambda + API Gateway
1. Go to Lambda tab
2. Create Lambda function
3. Go to API Gateway tab
4. Create HTTP API
5. Connect Lambda to API Gateway
6. Test the external API link
7. Delete both resources when finished

## 🛠️ Troubleshooting

### Common Issues

#### S3 Access Denied
- Check bucket policy
- Ensure public access is allowed
- Verify CORS configuration

#### Lambda Execution Errors
- Check IAM role permissions
- Verify function code syntax
- Check CloudWatch logs

#### API Gateway 500 Errors
- Check Lambda function integration
- Verify CORS settings
- Check API Gateway logs

### Debugging Steps
1. Check AWS CloudWatch logs
2. Verify IAM permissions
3. Test individual components
4. Check network connectivity
5. Review error messages

## 💰 Cost Management

### Free Tier Limits
- S3: 5GB storage, 20,000 GET requests
- Lambda: 1M requests, 400,000 GB-seconds
- API Gateway: 1M API calls

### Cost Optimization
- Delete resources after testing
- Use appropriate instance sizes
- Monitor usage in AWS Cost Explorer
- Set up billing alerts

## 🔒 Security Best Practices

### IAM Permissions
- Use least privilege principle
- Create specific roles for each service
- Regularly review and rotate keys

### S3 Security
- Enable versioning for important data
- Use bucket policies carefully
- Consider encryption at rest

### Lambda Security
- Use environment variables for secrets
- Implement proper error handling
- Monitor function execution

## 📚 Additional Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [AWS API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)
- [AWS IAM Documentation](https://docs.aws.amazon.com/iam/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

## 🎯 Assignment Requirements

This setup fulfills the AWS deployment requirements:
- ✅ S3 bucket creation and management
- ✅ Lambda function deployment
- ✅ API Gateway integration
- ✅ Interactive deployment interface
- ✅ Comprehensive documentation
- ✅ Cost management and cleanup procedures
