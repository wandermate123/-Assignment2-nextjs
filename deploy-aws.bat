@echo off
echo 🚀 AWS Deployment Script for Next.js Application
echo ================================================

REM Check if AWS CLI is installed
aws --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ AWS CLI is not installed. Please install it first.
    echo    Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
    pause
    exit /b 1
)

REM Check if AWS credentials are configured
aws sts get-caller-identity >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ AWS credentials not configured. Please run 'aws configure' first.
    pause
    exit /b 1
)

echo ✅ AWS CLI is configured

REM Get AWS account ID and region
for /f "tokens=*" %%i in ('aws sts get-caller-identity --query Account --output text') do set ACCOUNT_ID=%%i
for /f "tokens=*" %%i in ('aws configure get region') do set REGION=%%i

echo 📋 AWS Account ID: %ACCOUNT_ID%
echo 🌍 AWS Region: %REGION%

REM Create IAM role for Lambda
echo 🔧 Creating IAM role for Lambda...
set ROLE_NAME=NextJSLambdaExecutionRole

REM Check if role exists
aws iam get-role --role-name %ROLE_NAME% >nul 2>&1
if %errorlevel% neq 0 (
    echo Creating new IAM role...
    aws iam create-role --role-name %ROLE_NAME% --assume-role-policy-document "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}" --description "Execution role for Next.js Lambda functions"
    
    aws iam attach-role-policy --role-name %ROLE_NAME% --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    
    echo ✅ IAM role created: %ROLE_NAME%
) else (
    echo ✅ IAM role already exists: %ROLE_NAME%
)

set ROLE_ARN=arn:aws:iam::%ACCOUNT_ID%:role/%ROLE_NAME%

REM Create environment file
echo 📝 Creating environment configuration...
(
echo AWS_REGION=%REGION%
echo AWS_ACCESS_KEY_ID=
echo AWS_SECRET_ACCESS_KEY=
echo AWS_LAMBDA_ROLE_ARN=%ROLE_ARN%
) > .env.aws

echo ✅ Environment file created: .env.aws

REM Build Next.js application
echo 🏗️  Building Next.js application...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Next.js application built successfully
) else (
    echo ❌ Build failed. Please check for errors.
    pause
    exit /b 1
)

REM Create deployment package
echo 📦 Creating deployment package...
if not exist dist mkdir dist
xcopy /E /I out dist
copy package.json dist\
copy package-lock.json dist\

echo ✅ Deployment package created in dist/

REM Display next steps
echo.
echo 🎉 AWS Deployment Setup Complete!
echo ================================
echo.
echo Next steps:
echo 1. Start your Next.js app: npm run dev
echo 2. Visit: http://localhost:3000/aws-deployment
echo 3. Use the interactive interface to deploy to AWS
echo.
echo Available AWS services:
echo - S3: Static website hosting
echo - Lambda: Serverless functions
echo - API Gateway: RESTful APIs
echo.
echo Remember to:
echo - Test your deployments
echo - Clean up resources when finished
echo - Monitor costs in AWS Console
echo.
echo Happy deploying! 🚀
pause
