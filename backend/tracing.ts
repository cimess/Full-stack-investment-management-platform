import { metrics, diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import * as dotenv from 'dotenv';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { Resource } from '@opentelemetry/resources';
import { HostMetrics } from '@opentelemetry/host-metrics';

// 0. Load Environment variables
dotenv.config();

// Standard OTel diagnostics (Can be disabled later)
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const API_KEY = process.env.HONEYCOMB_API_KEY || "";
const SERVICE_NAME = process.env.OTEL_SERVICE_NAME || "cimessinvest-backend-dev";
const ENV = process.env.NODE_ENV || "development";

if (API_KEY) {
  console.log(`🔍 OTel Auth: Found key "${API_KEY.substring(0, 4)}..." for service "${SERVICE_NAME}"`);
}

// 1. Define Identity
const resource = new Resource({
  'service.name': SERVICE_NAME,
  'service.version': "1.0.0",
  'deployment.environment': ENV
});

// 2. Monitoring SDK
const sdk = new NodeSDK({
  resource,
  traceExporter: new OTLPTraceExporter({
    url: 'https://api.honeycomb.io/v1/traces',
    headers: { 'x-honeycomb-team': API_KEY, 'x-honeycomb-dataset': SERVICE_NAME },
    concurrencyLimit: 1, 
    timeoutMillis: 10000 
  }),
  metricReader: API_KEY ? new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'https://api.honeycomb.io/v1/metrics', 
      headers: { 'x-honeycomb-team': API_KEY, 'x-honeycomb-dataset': SERVICE_NAME },
      concurrencyLimit: 1,
      timeoutMillis: 10000
    }),
    exportIntervalMillis: 60000 
  }) as any : undefined,
  logRecordProcessor: API_KEY ? new BatchLogRecordProcessor(
    new OTLPLogExporter({
      url: 'https://api.honeycomb.io/v1/logs',
      headers: { 'x-honeycomb-team': API_KEY, 'x-honeycomb-dataset': SERVICE_NAME },
    })
  ) as any : undefined,
  instrumentations: [getNodeAutoInstrumentations()]
});

// 3. Start
sdk.start();

// 4. Hardware Sensors
if (API_KEY) {
  const hostMetrics = new HostMetrics({ 
    meterProvider: metrics.getMeterProvider(),
    name: 'cimess-host-stats'
  });
  hostMetrics.start();
}

console.log("🚀 All-in-One Tracing & Metrics initialized (Stabilized)");

export default sdk;
