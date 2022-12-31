import { container } from '@/infrastructure/core/depedencyContainer'
import { AppConfiguration, bindRoutes } from '@/infrastructure/server'
import { BaseLoggerInterface } from '@/interface'
import { TYPES } from '@/types'
import fastify, { RouteOptions } from 'fastify'
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
		const configuration: Omit<AppConfiguration, 'prismaInstance'> = {
			port: 3000,
			httpServerConfiguration: {},
			routes,
			logger: container.get<BaseLoggerInterface>(TYPES.BaseLogger),
		}
		bindRoutes(configuration, fastifyInstance)

		for (const { url, method } of routes) {
			expect(fastifyInstance.hasRoute({ url, method })).toBe(true)
		}
	})
})
