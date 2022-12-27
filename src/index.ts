import { PrismaClient } from '@prisma/client'
import { RouteOptions } from 'fastify'
import Pino from 'pino'
import { HomeController } from './infrastructure/controller/HomeController'
import { UnhandledInfrastructureError } from './infrastructure/exception/exception'
import { bootServer } from './infrastructure/server'

const logger = Pino({ level: 'debug' })
const prismaInstance = new PrismaClient()
const routes: RouteOptions[] = [
	{
		method: 'GET',
		url: '/',
		handler: new HomeController().handle,
	},
]

try {
	await bootServer({
		port: 3000,
		httpServerConfiguration: {
			logger: true,
		},
		routes: routes,
		logger,
		prismaInstance,
	})
} catch (error) {
	if (error instanceof UnhandledInfrastructureError) {
		logger.fatal(`Unhandled infrastructure error, requesting restart server in 5 seconds`)
		/** Todo: Implement fatal recovery strategy */
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1)
	}
}
