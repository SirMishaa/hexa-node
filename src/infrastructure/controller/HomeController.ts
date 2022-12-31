import type { BaseLoggerInterface } from '@/interface'
import { TYPES } from '@/types'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { inject, injectable } from 'inversify'

@injectable()
export class HomeController {
	constructor(@inject(TYPES.BaseLogger) private readonly logger: BaseLoggerInterface) {}

	handle(request: FastifyRequest, response: FastifyReply) {
		this.logger.info('HomeController has been called, and logger has been injected')
		response.send({ message: 'Hello World!' })
	}
}
