import "./tracing.js"; // This must be very first
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import logger from './winstonlog/logger.js';

// Clean, simple SDK setup. 
// Uses standard ENV vars: 
// - OTEL_SERVICE_NAME
// - OTEL_RESOURCE_ATTRIBUTES (for environment and version)
const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'https://api.honeycomb.io/v1/traces',
    headers: {
      'x-honeycomb-team': process.env.HONEYCOMB_API_KEY,
    }
  }),
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();

logger.info("OpenTelemetry Tracing initialized");

export default sdk;
