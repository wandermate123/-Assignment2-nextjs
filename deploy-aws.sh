#!/bin/bash

echo "🚀 AWS Deployment Script for Next.js Application"
echo "================================================"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    echo "   Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ AWS CLI is configured"

# Get AWS account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION=$(aws configure get region)
echo "📋 AWS Account ID: $ACCOUNT_ID"
echo "🌍 AWS Region: $REGION"

# Create IAM role for Lambda
echo "🔧 Creating IAM role for Lambda..."
ROLE_NAME="NextJSLambdaExecutionRole"
TRUST_POLICY='{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'

# Create role if it doesn't exist
if ! aws iam get-role --role-name $ROLE_NAME &> /dev/null; then
    aws iam create-role \
        --role-name $ROLE_NAME \
        --assume-role-policy-document "$TRUST_POLICY" \
        --description "Execution role for Next.js Lambda functions"
    
    aws iam attach-role-policy \
        --role-name $ROLE_NAME \
        --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    
    echo "✅ IAM role created: $ROLE_NAME"
else
    echo "✅ IAM role already exists: $ROLE_NAME"
fi

ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}"

# Create environment file
echo "📝 Creating environment configuration..."
cat > .env.aws << EOF
AWS_REGION=$REGION
AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)
AWS_LAMBDA_ROLE_ARN=$ROLE_ARN
EOF

echo "✅ Environment file created: .env.aws"

# Build Next.js application
echo "🏗️  Building Next.js application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Next.js application built successfully"
else
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

# Create deployment package
echo "📦 Creating deployment package..."
mkdir -p dist
cp -r out/* dist/
cp package.json dist/
cp package-lock.json dist/

echo "✅ Deployment package created in dist/"

# Display next steps
echo ""
echo "🎉 AWS Deployment Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Start your Next.js app: npm run dev"
echo "2. Visit: http://localhost:3000/aws-deployment"
echo "3. Use the interactive interface to deploy to AWS"
echo ""
echo "Available AWS services:"
echo "- S3: Static website hosting"
echo "- Lambda: Serverless functions"
echo "- API Gateway: RESTful APIs"
echo ""
echo "Remember to:"
echo "- Test your deployments"
echo "- Clean up resources when finished"
echo "- Monitor costs in AWS Console"
echo ""
echo "Happy deploying! 🚀"
