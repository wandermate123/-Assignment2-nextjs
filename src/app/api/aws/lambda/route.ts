import { NextRequest, NextResponse } from 'next/server';
import { createLambdaFunction, deleteLambdaFunction, lambdaCodeTemplate } from '@/lib/aws-utils';

export async function POST(request: NextRequest) {
  try {
    const { action, functionName, code } = await request.json();

    switch (action) {
      case 'create':
        const createResult = await createLambdaFunction(functionName, code || lambdaCodeTemplate);
        if (createResult.success) {
          return NextResponse.json({
            success: true,
            message: 'Lambda function created successfully',
            functionName,
            functionArn: createResult.data?.FunctionArn
          });
        } else {
          return NextResponse.json({
            success: false,
            error: createResult.error
          }, { status: 400 });
        }

      case 'delete':
        const deleteResult = await deleteLambdaFunction(functionName);
        if (deleteResult.success) {
          return NextResponse.json({
            success: true,
            message: 'Lambda function deleted successfully',
            functionName
          });
        } else {
          return NextResponse.json({
            success: false,
            error: deleteResult.error
          }, { status: 400 });
        }

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
