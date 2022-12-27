import { AppConfiguration, bindRoutes } from '@/infrastructure/server'
import fastify, { RouteOptions } from 'fastify'
import Pino from 'pino'
import { describe, expect, it } from 'vitest'

describe('Server functions', () => {
	it('should bind routes to fastify instance', () => {
		const fastifyInstance = fastify()
		const routes: Array<RouteOptions> = [
			{
				method: 'GET',
				url: '/test',
				handler: () => {
					console.log('Handler has been called')
				},
			},
		]
		const configuration: AppConfiguration = {
			port: 3000,
			httpServerConfiguration: {},
			routes,
			logger: Pino(),
		}
		bindRoutes(configuration, fastifyInstance)

		for (const { url, method } of routes) {
			expect(fastifyInstance.hasRoute({ url, method })).toBe(true)
		}
	})
})
