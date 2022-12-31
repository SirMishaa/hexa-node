import 'reflect-metadata'
import { container } from '@/infrastructure/core/depedencyContainer'
import { BaseLoggerInterface } from '@/interface'
import { TYPES } from '@/types'
import { fastify, FastifyInstance, FastifyServerOptions, RouteOptions } from 'fastify'
import { HomeController } from './infrastructure/controller/HomeController'
import { UnhandledInfrastructureError } from './infrastructure/exception/exception'

export type AppConfiguration = {
	httpServerConfiguration: FastifyServerOptions
	routes: Array<RouteOptions>
	logger: BaseLoggerInterface
}

const logger = container.get<BaseLoggerInterface>(TYPES.BaseLogger)

export function routes(): RouteOptions[] {
	return [
		{
			method: 'GET',
			url: '/',
			handler: (...parameters) => container.resolve(HomeController).handle(...parameters),
		},
	]
}

try {
	logger.info('Starting server...')
	const httpServer = container.get<FastifyInstance>(TYPES.BaseHttpServer.toString())
	logger.info(httpServer)
} catch (error) {
	if (error instanceof UnhandledInfrastructureError) {
		logger.fatal(`Unhandled infrastructure error, requesting restart server in 5 seconds`)
		/** Todo: Implement fatal recovery strategy */
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1)
	}
	logger.fatal(error)
}

/**
 * Creates a new Fastify instance with the given configuration, bind routes and return the instance.
 * @param {AppConfiguration} appConfiguration
 */
export function createHttpServer(appConfiguration: AppConfiguration): FastifyInstance {
	const fastifyInstance = fastify(appConfiguration.httpServerConfiguration)
	bindRoutes(appConfiguration, fastifyInstance)
	return fastifyInstance
}

/**
 * This function mutates the fastify instance by adding routes to it depending on the given configuration.
 * @param {AppConfiguration} appConfiguration
 * @param {FastifyInstance} fastifyInstance
 */
export function bindRoutes(
	appConfiguration: AppConfiguration,
	fastifyInstance: FastifyInstance,
) {
	const startTime = performance.now()
	for (const routeOptions of appConfiguration.routes) {
		appConfiguration.logger.debug(
			`Registering route ${routeOptions.method} for ${routeOptions.url}, bound to ${routeOptions.handler.name}`,
		)
		fastifyInstance.route(routeOptions)
	}
	const endTime = performance.now()
	appConfiguration.logger.info(
		`Registered ${appConfiguration.routes.length} routes in ${Math.floor(endTime - startTime)}ms`,
	)
}
