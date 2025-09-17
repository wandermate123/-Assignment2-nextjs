// Analytics and instrumentation utilities
export class Analytics {
  private static instance: Analytics
  private events: Array<{ event: string; data: any; timestamp: Date }> = []

  private constructor() {}

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  public track(event: string, data: any = {}) {
    const eventData = {
      event,
      data,
      timestamp: new Date()
    }
    
    this.events.push(eventData)
    
    // In a real implementation, you would send this to an analytics service
    console.log('Analytics Event:', eventData)
    
    // Send to external analytics service (mock)
    this.sendToAnalytics(eventData)
  }

  private async sendToAnalytics(eventData: any) {
    try {
      // Mock analytics service call
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
      })
    } catch (error) {
      console.error('Failed to send analytics event:', error)
    }
  }

  public getEvents() {
    return this.events
  }

  public clearEvents() {
    this.events = []
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  private constructor() {}

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  public startTiming(label: string) {
    this.metrics.set(label, performance.now())
  }

  public endTiming(label: string): number {
    const startTime = this.metrics.get(label)
    if (startTime) {
      const duration = performance.now() - startTime
      this.metrics.delete(label)
      return duration
    }
    return 0
  }

  public measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.startTiming(label)
    return fn().finally(() => {
      const duration = this.endTiming(label)
      console.log(`Performance: ${label} took ${duration.toFixed(2)}ms`)
    })
  }

  public getMetrics() {
    return Object.fromEntries(this.metrics)
  }
}

// Error tracking
export class ErrorTracker {
  private static instance: ErrorTracker
  private errors: Array<{ error: Error; context: any; timestamp: Date }> = []

  private constructor() {}

  public static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker()
    }
    return ErrorTracker.instance
  }

  public trackError(error: Error, context: any = {}) {
    const errorData = {
      error,
      context,
      timestamp: new Date()
    }
    
    this.errors.push(errorData)
    
    console.error('Error tracked:', errorData)
    
    // Send to error tracking service (mock)
    this.sendToErrorService(errorData)
  }

  private async sendToErrorService(errorData: any) {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData)
      })
    } catch (error) {
      console.error('Failed to send error to tracking service:', error)
    }
  }

  public getErrors() {
    return this.errors
  }

  public clearErrors() {
    this.errors = []
  }
}

// Export singleton instances
export const analytics = Analytics.getInstance()
export const performanceMonitor = PerformanceMonitor.getInstance()
export const errorTracker = ErrorTracker.getInstance()
