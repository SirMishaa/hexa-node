import { PrismaClient } from '@prisma/client'
import fastify, { FastifyInstance, FastifyServerOptions, RouteOptions } from 'fastify'
import Pino from 'pino'
import { UnhandledInfrastructureError } from './exception/exception'

export type AppConfiguration = {
	port: number
	httpServerConfiguration: FastifyServerOptions
	routes: Array<RouteOptions>
	logger: Pino.Logger
	prismaInstance: PrismaClient
}

/**
 * Creates a new Fastify instance with the given configuration, bind routes and starts the server.
 * @param {AppConfiguration} appConfiguration
 */
export async function bootServer(appConfiguration: AppConfiguration): Promise<FastifyInstance> {
	const fastifyInstance = fastify(appConfiguration.httpServerConfiguration)

	bindRoutes(appConfiguration, fastifyInstance)

	try {
		await fastifyInstance.listen(appConfiguration.port)
	} catch (error) {
		appConfiguration.logger.error((error as Error)?.message)
		throw new UnhandledInfrastructureError((error as Error)?.message)
	}

	return fastifyInstance
}

/**
 * This function mutates the fastify instance by adding routes to it depending on the given configuration.
 * @param {AppConfiguration} appConfiguration
 * @param {FastifyInstance} fastifyInstance
 */
export function bindRoutes(
	appConfiguration: Omit<AppConfiguration, 'prismaInstance'>,
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
