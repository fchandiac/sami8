import { NestFactory } from '@nestjs/core';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { parse } from 'url';
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import {envs} from '../../../libs/config/envs';
const next = require('next');

async function bootstrap() {
  const logger = new Logger('Next.js Server');

  // Configuración de Next.js
  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = next({ dev, dir: './apps/sami8/next' });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  // Configuración del servidor HTTP para Next.js
  const port = envs.next.port;

  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url!, true);
    const { pathname } = parsedUrl;

    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname);
      nextApp.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  server.listen(port, () => {
    logger.log(
      `> Next.js server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`,
    );
  });

}

bootstrap();
