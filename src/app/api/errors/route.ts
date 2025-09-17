import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const errorData = await request.json()
    
    // Log error for monitoring
    console.error('Error Tracked:', {
      message: errorData.error?.message,
      stack: errorData.error?.stack,
      context: errorData.context,
      timestamp: errorData.timestamp,
      userAgent: request.headers.get('user-agent'),
      ip: request.ip || request.headers.get('x-forwarded-for')
    })

    // In a real implementation, you would:
    // 1. Store the error in a database
    // 2. Send to error tracking service (Sentry, Bugsnag, etc.)
    // 3. Alert the development team for critical errors

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing error tracking:', error)
    return NextResponse.json(
      { error: 'Failed to process error tracking' },
      { status: 500 }
    )
  }
}
