#!/bin/bash

echo "Starting OpenTelemetry Monitoring Services..."

# Start Docker Compose services
echo "Starting Docker Compose services..."
docker-compose -f docker-compose-monitoring.yml up -d

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "Checking service status..."
docker-compose -f docker-compose-monitoring.yml ps

echo ""
echo "Monitoring services started!"
echo ""
echo "Available services:"
echo "- Jaeger: http://localhost:16686"
echo "- Zipkin: http://localhost:9411"
echo "- Prometheus: http://localhost:9090"
echo "- OpenTelemetry Collector Metrics: http://localhost:8888/metrics"
echo "- OpenTelemetry Collector Exporter Metrics: http://localhost:8889/metrics"
echo ""
echo "Now start your Next.js app with: npm run dev"
echo "Then visit: http://localhost:3000/monitoring"
