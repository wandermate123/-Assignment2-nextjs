import { S3Client, CreateBucketCommand, PutBucketPolicyCommand, DeleteBucketCommand } from '@aws-sdk/client-s3';
import { LambdaClient, CreateFunctionCommand, DeleteFunctionCommand } from '@aws-sdk/client-lambda';
import { ApiGatewayV2Client, CreateApiCommand, DeleteApiCommand } from '@aws-sdk/client-apigatewayv2';

// AWS Configuration
const awsConfig = {
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
};

// S3 Client
export const s3Client = new S3Client(awsConfig);

// Lambda Client
export const lambdaClient = new LambdaClient(awsConfig);

// API Gateway Client
export const apiGatewayClient = new ApiGatewayV2Client(awsConfig);

// S3 Functions
export const createS3Bucket = async (bucketName: string) => {
  try {
    const command = new CreateBucketCommand({
      Bucket: bucketName,
    });
    const result = await s3Client.send(command);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const setS3BucketPolicy = async (bucketName: string, policy: object) => {
  try {
    const command = new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify(policy),
    });
    const result = await s3Client.send(command);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteS3Bucket = async (bucketName: string) => {
  try {
    const command = new DeleteBucketCommand({
      Bucket: bucketName,
    });
    const result = await s3Client.send(command);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Lambda Functions
export const createLambdaFunction = async (functionName: string, code: string) => {
  try {
    const command = new CreateFunctionCommand({
      FunctionName: functionName,
      Runtime: 'nodejs18.x',
      Role: process.env.AWS_LAMBDA_ROLE_ARN || '',
      Handler: 'index.handler',
      Code: {
        ZipFile: Buffer.from(code),
      },
    });
    const result = await lambdaClient.send(command);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteLambdaFunction = async (functionName: string) => {
  try {
    const command = new DeleteFunctionCommand({
      FunctionName: functionName,
    });
    const result = await lambdaClient.send(command);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// API Gateway Functions
export const createAPIGateway = async (apiName: string) => {
  try {
    const command = new CreateApiCommand({
      Name: apiName,
      ProtocolType: 'HTTP',
      CorsConfiguration: {
        AllowOrigins: ['*'],
        AllowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
        AllowHeaders: ['Content-Type', 'Authorization'],
      },
    });
    const result = await apiGatewayClient.send(command);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteAPIGateway = async (apiId: string) => {
  try {
    const command = new DeleteApiCommand({
      ApiId: apiId,
    });
    const result = await apiGatewayClient.send(command);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Policy Templates
export const s3PolicyTemplate = (bucketName: string) => ({
  Version: '2025-07-20',
  Id: 'GetObjPolicy',
  Statement: [{
    Sid: 's3AllowPublicAccess',
    Principal: '*',
    Effect: 'Allow',
    Action: 's3:GetObject',
    Resource: `arn:aws:s3:::${bucketName}/*`
  }]
});

export const lambdaCodeTemplate = `exports.handler = async (event) => {
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
};`;
