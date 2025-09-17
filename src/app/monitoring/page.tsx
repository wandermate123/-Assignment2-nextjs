'use client';

import React, { useEffect, useState } from 'react';

const getPathUrl = () => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    // Remove port from origin
    return `${url.protocol}//${url.hostname}`;
  }
  return '';
};

const MonitoringDashboard: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(getPathUrl());
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Inject heading styles */}
      <style>{`
        h1 { font-size: 2em; font-weight: bold; margin-bottom: 0.5em; }
        h2 { font-size: 1.5em; font-weight: bold; margin-top: 1.2em; }
        h3 { font-size: 1.2em; font-weight: bold; margin-top: 1em; }
        .link-box {
          background: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          margin: 10px 0;
        }
        .link-box a {
          color: #0066cc;
          text-decoration: none;
          font-weight: bold;
        }
        .link-box a:hover {
          text-decoration: underline;
        }
        .code-block {
          background: #f8f8f8;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          padding: 10px;
          font-family: 'Courier New', monospace;
          margin: 10px 0;
        }
      `}</style>

      <h1>Week 9: Monitoring Instrumentation Dashboard Links</h1>

      <div className="link-box">
        <h2>Go to:</h2>
        <p>
          <a href={`${baseUrl}:3000/`} target="_blank" rel="noopener noreferrer">
            {baseUrl}:3000/
          </a>
        </p>
      </div>

      <div className="link-box">
        <h2>Check the API:</h2>
        <p>
          <a href={`${baseUrl}:3000/api/hello`} target="_blank" rel="noopener noreferrer">
            {baseUrl}:3000/api/hello
          </a>
        </p>
        <br />
        <h3>Try with curl:</h3>
        <div className="code-block">
          <code>curl {baseUrl}:3000/api/hello</code>
        </div>
      </div>

      <div className="link-box">
        <h2>Open Jaeger:</h2>
        <p>
          Set Services to <strong>'next-app'</strong>, Loopback - <strong>'last hour'</strong>, then click "find"
        </p>
        <p>
          <a href={`${baseUrl}:16686/`} target="_blank" rel="noopener noreferrer">
            {baseUrl}:16686/
          </a>
        </p>
      </div>

      <div className="link-box">
        <h2>Open Prometheus:</h2>
        <p>
          Search for: <strong>otelcol_exporter_enqueue_failed_metric_points</strong>
          <br />
          Remember to set the date/time (typically today).
        </p>
        <p>
          <a href={`${baseUrl}:9090/`} target="_blank" rel="noopener noreferrer">
            {baseUrl}:9090/
          </a>
        </p>
      </div>

      <div className="link-box">
        <h2>Open Zipkin:</h2>
        <p>
          Set <strong>'ServiceName'</strong> to <strong>Next-app</strong>
          <br />
          Set <strong>'loopback'</strong> to the last hour, then click 'Run Query'
        </p>
        <p>
          <a href={`${baseUrl}:9411/`} target="_blank" rel="noopener noreferrer">
            {baseUrl}:9411/
          </a>
        </p>
      </div>

      <div className="link-box">
        <h2>Open Metrics - OpenTelemetry Logs:</h2>
        <p>
          <a href={`${baseUrl}:8888/metrics`} target="_blank" rel="noopener noreferrer">
            {baseUrl}:8888/metrics
          </a>
          <br />
          <a href={`${baseUrl}:8889/metrics`} target="_blank" rel="noopener noreferrer">
            {baseUrl}:8889/metrics
          </a>
        </p>
      </div>

      <div className="link-box">
        <h2>Instructions:</h2>
        <ul>
          <li>It takes a while for data to be loaded, so try curls on the command line, local and remote</li>
          <li>Try a wrong API (e.g. /api/hello1) to generate errors</li>
          <li><strong>Jaeger</strong> - Service - select Nextjs (make sure you select last hour) and you should see some spans</li>
          <li><strong>Zipkin</strong> - Service - select Nextjs (make sure you select last hour) and you should be able to see logs</li>
          <li><strong>Prometheus</strong> - Query - "otelcol_exporter_sent_spans" - this takes a while to populate, before getting the results. Might need to set the day and the last 12 hours</li>
          <li>If your dashboards are getting results you have successfully Instrumented your Next.JS app!</li>
          <li>Explore other queries. You can introduce bugs into your code and try and capture them and debug them</li>
        </ul>
      </div>
    </div>
  );
};

export default MonitoringDashboard;
