import { FastifyReply, FastifyRequest } from 'fastify'

export class HomeController {
	handle(request: FastifyRequest, response: FastifyReply) {
		response.send({ message: 'Hello World!' })
	}
}
