import { metrics, diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import * as dotenv from 'dotenv';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { HostMetrics } from '@opentelemetry/host-metrics';
import logger from './winstonlog/logger.js';

// 0. HARD-LOAD Environment variables before anything else
dotenv.config();

// Enable diagnostics for now to troubleshoot the "Unauthorized" issue
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const API_KEY = process.env.HONEYCOMB_API_KEY || "";
const SERVICE_NAME = process.env.OTEL_SERVICE_NAME || "cimessinvest-backend-dev";
const ENV = process.env.NODE_ENV || "development";

if (!API_KEY) {
  logger.warn("⚠️ HONEYCOMB_API_KEY missing from environment. Monitoring will be limited.");
} else {
  logger.info(`🔍 OTel Auth: Found key starting with "${API_KEY.substring(0, 4)}..."`);
}

// 1. Define the Identity
const resource = new Resource({
  'service.name': SERVICE_NAME,
  'service.version': "1.0.0",
  'deployment.environment': ENV
});

// 2. The All-in-One Monitoring SDK
const sdk = new NodeSDK({
  resource,
  traceExporter: new OTLPTraceExporter({
    url: 'https://api.honeycomb.io/v1/traces',
    headers: {
      'x-honeycomb-team': API_KEY
    }
  }),
  // ONLY start the MetricReader if the Key exists, to avoid 'Unauthorized' spam
  metricReader: API_KEY ? new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'https://api.honeycomb.io/v1/metrics',
      headers: {
        'x-honeycomb-team': API_KEY
      }
    }),
    exportIntervalMillis: 60000 
  }) as any : undefined,
  instrumentations: [getNodeAutoInstrumentations()]
});

// 3. Start the Engine
sdk.start();

// 4. Start the Hardware Sensors ONLY if metrics are enabled
if (API_KEY) {
  const hostMetrics = new HostMetrics({ 
    meterProvider: metrics.getMeterProvider(),
    name: 'cimess-host-stats'
  });
  hostMetrics.start();
  logger.info("🚀 All-in-One Tracing & Metrics initialized (Direct to Honeycomb)");
} else {
  logger.info("🚀 Tracing only (Metrics disabled due to missing Key)");
}

export default sdk;
