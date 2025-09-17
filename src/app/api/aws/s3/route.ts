import { NextRequest, NextResponse } from 'next/server';
import { createS3Bucket, setS3BucketPolicy, deleteS3Bucket, s3PolicyTemplate } from '@/lib/aws-utils';

export async function POST(request: NextRequest) {
  try {
    const { action, bucketName } = await request.json();

    switch (action) {
      case 'create':
        const createResult = await createS3Bucket(bucketName);
        if (createResult.success) {
          // Set bucket policy for public access
          const policyResult = await setS3BucketPolicy(bucketName, s3PolicyTemplate(bucketName));
          return NextResponse.json({
            success: true,
            message: 'S3 bucket created successfully',
            bucketName,
            policySet: policyResult.success
          });
        } else {
          return NextResponse.json({
            success: false,
            error: createResult.error
          }, { status: 400 });
        }

      case 'delete':
        const deleteResult = await deleteS3Bucket(bucketName);
        if (deleteResult.success) {
          return NextResponse.json({
            success: true,
            message: 'S3 bucket deleted successfully',
            bucketName
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
