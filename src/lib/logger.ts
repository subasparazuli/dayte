/**
 * Structured logging for Dayte
 * In production, integrate with Sentry/OpenTelemetry/cloud logging.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  requestId?: string;
  userId?: string;
  [key: string]: unknown;
}

function createLogEntry(level: LogLevel, message: string, meta?: Record<string, unknown>): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };
}

function formatLog(entry: LogEntry): string {
  if (process.env.NODE_ENV === 'development') {
    const { level, message, timestamp, ...rest } = entry;
    const metaStr = Object.keys(rest).length > 0 ? ` ${JSON.stringify(rest)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  }
  return JSON.stringify(entry);
}

export const logger = {
  debug(message: string, meta?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(formatLog(createLogEntry('debug', message, meta)));
    }
  },

  info(message: string, meta?: Record<string, unknown>) {
    console.info(formatLog(createLogEntry('info', message, meta)));
  },

  warn(message: string, meta?: Record<string, unknown>) {
    console.warn(formatLog(createLogEntry('warn', message, meta)));
  },

  error(message: string, meta?: Record<string, unknown>) {
    console.error(formatLog(createLogEntry('error', message, meta)));
  },

  /** Log an audit event for sensitive operations */
  audit(action: string, meta: Record<string, unknown>) {
    console.info(formatLog(createLogEntry('info', `[AUDIT] ${action}`, meta)));
  },

  /** Log a payment event */
  payment(event: string, meta: Record<string, unknown>) {
    console.info(formatLog(createLogEntry('info', `[PAYMENT] ${event}`, meta)));
  },

  /** Log a booking event */
  booking(event: string, meta: Record<string, unknown>) {
    console.info(formatLog(createLogEntry('info', `[BOOKING] ${event}`, meta)));
  },
};
