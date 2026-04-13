/*instrumentation.ts*/
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { RuntimeNodeInstrumentation } from '@opentelemetry/instrumentation-runtime-node';
import { HostMetrics } from '@opentelemetry/host-metrics';
import { CompressionAlgorithm } from '@opentelemetry/otlp-exporter-base';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import * as dotenv from 'dotenv';
dotenv.config();

import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';




// We no longer disable metrics
// process.env.OTEL_METRICS_EXPORTER = 'none';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// Configure the Metric Exporter specifically for Honeycomb
const metricExporter = new OTLPMetricExporter({
  url: 'https://api.honeycomb.io/v1/metrics', // Separate endpoint for metrics
  headers: {
    'x-honeycomb-team': process.env.HONEYCOMB_API_KEY || '',
     'x-honeycomb-dataset': process.env.NODE_ENV === 'production' ? 'backend-metrics-prod' : 'backend-metrics-dev' 
  },
  timeoutMillis: 30000,
  compression: CompressionAlgorithm.GZIP
});

const logExporter = new OTLPLogExporter({
  url: 'https://api.honeycomb.io/v1/logs',
  headers: {
    'x-honeycomb-team': process.env.HONEYCOMB_API_KEY || '',
  },
  timeoutMillis: 30000,
  compression: CompressionAlgorithm.GZIP
});

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'https://api.honeycomb.io/v1/traces',
    headers: {
      'x-honeycomb-team': process.env.HONEYCOMB_API_KEY || '',
    },
    timeoutMillis:30000,
    compression:CompressionAlgorithm.GZIP
  }),
  metricReaders: [new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 60000, // Export metrics every 60 seconds
  })],
  logRecordProcessors: [new BatchLogRecordProcessor(logExporter)],
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-http': { enabled: true },
      '@opentelemetry/instrumentation-ioredis': { enabled: true }
    }),
    new PrismaInstrumentation(),
    new RuntimeNodeInstrumentation(),
    new WinstonInstrumentation()
  ],
});

try {
  sdk.start();
  
  const hostMetrics = new HostMetrics({
    name:"backend-host-metric-dev"
  });
  hostMetrics.start()
  console.log("✅ Tracing & Metrics started successfully");
} catch (err) {
  console.error("❌ Tracing/Metrics failed to start", err);
}

const shutDown = () => {
  sdk.shutdown()
    .then(() => console.log('Tracing/Metrics terminated'))
    .catch((error) => console.log('Error terminating', error))
    .finally(() => process.exit(0));
};
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);