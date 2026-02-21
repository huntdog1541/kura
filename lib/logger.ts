// lib/logger.ts
/**
 * Simple logger utility for the Kura application
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const isDevelopment = process.env.NODE_ENV === 'development';

const logColors = {
  debug: '\x1b[36m',   // Cyan
  info: '\x1b[32m',    // Green
  warn: '\x1b[33m',    // Yellow
  error: '\x1b[31m',   // Red
  reset: '\x1b[0m',    // Reset
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function formatLog(level: LogLevel, message: string, _data?: unknown): string {
  const timestamp = new Date().toISOString();
  const levelUpper = level.toUpperCase().padEnd(5);

  if (typeof window !== 'undefined') {
    // Browser environment
    return `[${timestamp}] ${levelUpper} ${message}`;
  }

  // Node environment
  const color = logColors[level];
  return `${color}[${timestamp}] ${levelUpper}${logColors.reset} ${message}`;
}

export const logger = {
  debug: (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.log(formatLog('debug', message, data), data);
    }
  },

  info: (message: string, data?: unknown) => {
    console.log(formatLog('info', message, data), data);
  },

  warn: (message: string, data?: unknown) => {
    console.warn(formatLog('warn', message, data), data);
  },

  error: (message: string, error?: unknown) => {
    console.error(formatLog('error', message, error), error);
  },
};

