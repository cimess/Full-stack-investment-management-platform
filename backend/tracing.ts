import { metrics, diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import 'dotenv/config';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { HostMetrics } from '@opentelemetry/host-metrics';
import logger from './winstonlog/logger.js';

// Optional: Enable internal OTel diagnostics to see errors in the console
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// 1. Define the Identity (Environment / Version)
const resource = new Resource({
  'service.name': process.env.OTEL_SERVICE_NAME || "cimessinvest-backend",
  'service.version': "1.0.0",
  'deployment.environment': process.env.NODE_ENV || "development"
});

// 2. The All-in-One Monitoring SDK
const sdk = new NodeSDK({
  resource,
  traceExporter: new OTLPTraceExporter({
    url: 'https://api.honeycomb.io/v1/traces',
    headers: {
      'x-honeycomb-team': process.env.HONEYCOMB_API_KEY || ""
    }
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'https://api.honeycomb.io/v1/metrics',
      headers: {
        'x-honeycomb-team': process.env.HONEYCOMB_API_KEY || ""
      }
    }),
    exportIntervalMillis: 60000 
  }) as any,
  instrumentations: [getNodeAutoInstrumentations()]
});

// 3. Start the Engine
sdk.start();

// 4. Start the Hardware Sensors (CPU, RAM, etc.)
// Using the global metrics provider to ensure 100% compatibility
const hostMetrics = new HostMetrics({ 
  meterProvider: metrics.getMeterProvider(),
  name: 'cimess-host-stats'
});
hostMetrics.start();

logger.info("🚀 All-in-One Tracing & Metrics initialized (Direct to Honeycomb)");

export default sdk;
