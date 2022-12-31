import { createHttpServer, routes } from '@/index'
import { BaseLoggerInterface } from '@/interface'
import { TYPES } from '@/types'
import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { Container } from 'inversify'
import Pino from 'pino'

const container = new Container()

container.bind<BaseLoggerInterface>(TYPES.BaseLogger).toConstantValue(Pino({ level: 'debug' }))
container.bind<PrismaClient>(TYPES.EntityManager).toConstantValue(new PrismaClient())

const logger = container.get<BaseLoggerInterface>(TYPES.BaseLogger)

container.bind<FastifyInstance>(TYPES.BaseHttpServer.toString()).toConstantValue(createHttpServer({
	httpServerConfiguration: {
		logger,
	},
	routes: routes(),
	logger,
}))

export { container }
