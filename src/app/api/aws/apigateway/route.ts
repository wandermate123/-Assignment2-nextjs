import { NextRequest, NextResponse } from 'next/server';
import { createAPIGateway, deleteAPIGateway } from '@/lib/aws-utils';

export async function POST(request: NextRequest) {
  try {
    const { action, apiName, apiId } = await request.json();

    switch (action) {
      case 'create':
        const createResult = await createAPIGateway(apiName);
        if (createResult.success) {
          return NextResponse.json({
            success: true,
            message: 'API Gateway created successfully',
            apiName,
            apiId: createResult.data?.ApiId,
            apiEndpoint: createResult.data?.ApiEndpoint
          });
        } else {
          return NextResponse.json({
            success: false,
            error: createResult.error
          }, { status: 400 });
        }

      case 'delete':
        const deleteResult = await deleteAPIGateway(apiId);
        if (deleteResult.success) {
          return NextResponse.json({
            success: true,
            message: 'API Gateway deleted successfully',
            apiId
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
