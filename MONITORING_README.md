# OpenTelemetry Monitoring Setup

This project includes comprehensive monitoring and observability using OpenTelemetry, Jaeger, Zipkin, and Prometheus.

## 🚀 Quick Start

### 1. Start Monitoring Services

**Windows:**
```bash
start-monitoring.bat
```

**Linux/Mac:**
```bash
chmod +x start-monitoring.sh
./start-monitoring.sh
```

**Or manually:**
```bash
npm run monitoring:start
```

### 2. Start the Instrumented Next.js App

```bash
npm run dev:instrumented
```

### 3. Access the Monitoring Dashboard

Visit: http://localhost:3000/monitoring

## 📊 Available Monitoring Tools

### Jaeger (Distributed Tracing)
- **URL:** http://localhost:16686
- **Purpose:** Trace requests across services
- **Setup:** Set Service to 'next-app', Time Range to 'last hour', click "Find"

### Zipkin (Distributed Tracing)
- **URL:** http://localhost:9411
- **Purpose:** Alternative tracing visualization
- **Setup:** Set ServiceName to 'Next-app', Time Range to 'last hour', click "Run Query"

### Prometheus (Metrics)
- **URL:** http://localhost:9090
- **Purpose:** Metrics collection and querying
- **Queries to try:**
  - `otelcol_exporter_enqueue_failed_metric_points`
  - `otelcol_exporter_sent_spans`
  - `http_requests_total`

### OpenTelemetry Collector Metrics
- **URLs:** 
  - http://localhost:8888/metrics
  - http://localhost:8889/metrics
- **Purpose:** Raw metrics from the collector

## 🔧 Configuration Files

### OpenTelemetry Collector (`otel-collector-config.yaml`)
- Configures data collection from the Next.js app
- Exports traces to Jaeger and Zipkin
- Exports metrics to Prometheus

### Prometheus (`prometheus.yaml`)
- Scrapes metrics from the OpenTelemetry collector
- Provides query interface for metrics

### Docker Compose (`docker-compose-monitoring.yml`)
- Orchestrates all monitoring services
- Includes Jaeger, Zipkin, Prometheus, and OpenTelemetry Collector

## 🧪 Testing the Instrumentation

### 1. Generate Traffic
```bash
# Test the API endpoint
curl http://localhost:3000/api/hello

# Test with errors (will generate error traces)
curl http://localhost:3000/api/hello1
```

### 2. Check Traces
- Visit Jaeger: http://localhost:16686
- Look for traces from the 'next-app' service
- Click on traces to see detailed spans

### 3. Check Metrics
- Visit Prometheus: http://localhost:9090
- Query for `otelcol_exporter_sent_spans`
- Set time range to last hour

## 📈 What You'll See

### Traces
- HTTP requests to your Next.js app
- Database queries (if using Sequelize)
- External API calls
- Error traces for failed requests

### Metrics
- Request counts and durations
- Error rates
- Database connection metrics
- Memory and CPU usage

### Logs
- Structured logging from the OpenTelemetry collector
- Error logs and warnings

## 🛠️ Troubleshooting

### Services Not Starting
```bash
# Check Docker Compose status
docker-compose -f docker-compose-monitoring.yml ps

# View logs
npm run monitoring:logs
```

### No Traces Appearing
1. Ensure the instrumented app is running: `npm run dev:instrumented`
2. Generate some traffic by visiting the app
3. Wait a few minutes for traces to appear
4. Check the OpenTelemetry collector logs

### Prometheus Queries Not Working
1. Ensure Prometheus is scraping the collector
2. Check the time range (set to last hour)
3. Try different queries like `up` or `prometheus_build_info`

## 🔍 Advanced Usage

### Custom Metrics
Add custom metrics to your Next.js app:
```javascript
import { metrics } from '@opentelemetry/api';

const requestCounter = metrics.createCounter('http_requests_total', {
  description: 'Total HTTP requests'
});
```

### Custom Traces
Add custom spans:
```javascript
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('my-app');
const span = tracer.startSpan('custom-operation');
// ... do work ...
span.end();
```

## 📚 Resources

- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Jaeger Documentation](https://www.jaegertracing.io/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Zipkin Documentation](https://zipkin.io/)

## 🎯 Assignment Requirements

This setup fulfills the Week 9 instrumentation requirements:
- ✅ OpenTelemetry integration
- ✅ Distributed tracing with Jaeger and Zipkin
- ✅ Metrics collection with Prometheus
- ✅ Comprehensive monitoring dashboard
- ✅ Error tracking and debugging capabilities
