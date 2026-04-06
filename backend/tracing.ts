import dotenv from 'dotenv';
dotenv.config();

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import logger from './winstonlog/logger.js';

// The SDK needs to be initialized before any other instrumented library (express, prisma, ioredis) is imported.
const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'https://api.honeycomb.io/v1/traces',
    headers: {
      'x-honeycomb-team': process.env.HONEYCOMB_API_KEY || 'REPLACE_WITH_YOUR_KEY',
    },
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      // We can disable specific instrumentations if they're too noisy
      '@opentelemetry/instrumentation-fs': { enabled: false },
    }),
  ],
});

try {
  sdk.start();
  logger.info('[Tracing] OpenTelemetry initialized successfully.');
} catch (error) {
  logger.error('[Tracing] Error initializing OpenTelemetry:', error);
}

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => logger.info('[Tracing] OpenTelemetry terminated.'))
    .catch((error) => logger.error('[Tracing] Error terminating OpenTelemetry:', error))
    .finally(() => process.exit(0));
});

export default sdk;
