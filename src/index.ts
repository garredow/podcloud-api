import { config } from './lib/config';
require('newrelic');
import { configureServer } from './server';

const server = configureServer({
  logger: {
    name: 'podcloud-api',
    enabled: config.logger.enabled,
    level: config.logger.level,
    file: config.logger.file,
    formatters: {
      level(label: any, number: any) {
        return { level: label };
      },
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  },
});

server.listen({ port: config.meta.serverPort, host: '0.0.0.0' }, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
