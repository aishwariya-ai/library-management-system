import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Logger {

  public async handle(
    { request }: HttpContextContract,
    next: () => Promise<void>
  ) {

    console.log('-----------------------')
    console.log('Method:', request.method())
    console.log('URL:', request.url())
    console.log('Time:', new Date())

    await next()

    console.log('Request Finished')
    console.log('-----------------------')
  }
}