'use client';

import React, { useState } from 'react';
import { Upload, Server, Database, Cloud, Trash2, Play, CheckCircle, AlertCircle } from 'lucide-react';

const AWSDeployment = () => {
  const [activeTab, setActiveTab] = useState<'s3' | 'lambda' | 'api'>('s3');
  const [s3BucketName, setS3BucketName] = useState('');
  const [lambdaFunctionName, setLambdaFunctionName] = useState('');
  const [apiName, setApiName] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState<string>('');

  const handleS3Deployment = async () => {
    setDeploymentStatus('Creating S3 bucket...');
    // Simulate S3 bucket creation
    setTimeout(() => {
      setDeploymentStatus('S3 bucket created successfully!');
    }, 2000);
  };

  const handleLambdaDeployment = async () => {
    setDeploymentStatus('Creating Lambda function...');
    // Simulate Lambda function creation
    setTimeout(() => {
      setDeploymentStatus('Lambda function created successfully!');
    }, 3000);
  };

  const handleAPIDeployment = async () => {
    setDeploymentStatus('Creating API Gateway...');
    // Simulate API Gateway creation
    setTimeout(() => {
      setDeploymentStatus('API Gateway created successfully!');
    }, 2500);
  };

  const s3Policy = {
    "Version": "2025-07-20",
    "Id": "GetObjPolicy",
    "Statement": [{
      "Sid": "s3AllowPublicAccess",
      "Principal": "*",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": `arn:aws:s3:::${s3BucketName || 'amzn-s3-demo-bucket'}/*`
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AWS Deployment Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Deploy your Next.js application to AWS S3, Lambda, and API Gateway
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('s3')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 's3'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600'
              }`}
            >
              <Upload className="w-5 h-5 inline mr-2" />
              S3 Storage
            </button>
            <button
              onClick={() => setActiveTab('lambda')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'lambda'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600'
              }`}
            >
              <Server className="w-5 h-5 inline mr-2" />
              Lambda Functions
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'api'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600'
              }`}
            >
              <Cloud className="w-5 h-5 inline mr-2" />
              API Gateway
            </button>
          </div>
        </div>

        {/* S3 Tab */}
        {activeTab === 's3' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Amazon S3 Bucket Deployment
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Create S3 Bucket
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bucket Name
                    </label>
                    <input
                      type="text"
                      value={s3BucketName}
                      onChange={(e) => setS3BucketName(e.target.value)}
                      placeholder="amzn-s3-demo-bucket"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <button
                    onClick={handleS3Deployment}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Create S3 Bucket
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  S3 Bucket Policy
                </h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{JSON.stringify(s3Policy, null, 2)}</pre>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Login to AWS Console</li>
                <li>Navigate to S3 service</li>
                <li>Create a new bucket with the name above</li>
                <li>Apply the bucket policy for public access</li>
                <li>Upload your Next.js build files</li>
                <li>Enable static website hosting</li>
                <li>Test the external S3 link in your browser</li>
                <li>Delete the bucket when finished (cleanup)</li>
              </ol>
            </div>
          </div>
        )}

        {/* Lambda Tab */}
        {activeTab === 'lambda' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              AWS Lambda Function Deployment
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Create Lambda Function
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Function Name
                    </label>
                    <input
                      type="text"
                      value={lambdaFunctionName}
                      onChange={(e) => setLambdaFunctionName(e.target.value)}
                      placeholder="nextjs-lambda-function"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <button
                    onClick={handleLambdaDeployment}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Server className="w-5 h-5 mr-2" />
                    Create Lambda Function
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Lambda Function Code
                </h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{`exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Hello from Lambda!',
      timestamp: new Date().toISOString()
    })
  };
};`}</pre>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Login to AWS Console</li>
                <li>Navigate to Lambda service</li>
                <li>Create a new function with Node.js runtime</li>
                <li>Use the provided code template</li>
                <li>Configure environment variables if needed</li>
                <li>Set up IAM roles and permissions</li>
                <li>Test the function</li>
                <li>Delete the function when finished (cleanup)</li>
              </ol>
            </div>
          </div>
        )}

        {/* API Gateway Tab */}
        {activeTab === 'api' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              API Gateway Deployment
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Create HTTP API
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      API Name
                    </label>
                    <input
                      type="text"
                      value={apiName}
                      onChange={(e) => setApiName(e.target.value)}
                      placeholder="nextjs-api-gateway"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <button
                    onClick={handleAPIDeployment}
                    className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    <Cloud className="w-5 h-5 mr-2" />
                    Create API Gateway
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  API Configuration
                </h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "name": "nextjs-api-gateway",
  "protocolType": "HTTP",
  "corsConfiguration": {
    "allowOrigins": ["*"],
    "allowMethods": ["GET", "POST", "PUT", "DELETE"],
    "allowHeaders": ["Content-Type", "Authorization"]
  },
  "routes": [
    {
      "path": "/api/hello",
      "method": "GET",
      "target": "lambda-function-arn"
    }
  ]
}`}</pre>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Login to AWS Console</li>
                <li>Navigate to API Gateway service</li>
                <li>Create a new HTTP API</li>
                <li>Configure CORS settings</li>
                <li>Create routes and integrate with Lambda</li>
                <li>Deploy the API</li>
                <li>Test the external API link</li>
                <li>Delete the API Gateway when finished (cleanup)</li>
              </ol>
            </div>
          </div>
        )}

        {/* Deployment Status */}
        {deploymentStatus && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-800 dark:text-blue-200">{deploymentStatus}</span>
            </div>
          </div>
        )}

        {/* AWS Services Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              S3 Storage
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Host static websites and store application assets
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Server className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Lambda Functions
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Run serverless functions for dynamic content
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Cloud className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              API Gateway
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create RESTful APIs and manage endpoints
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AWSDeployment;
