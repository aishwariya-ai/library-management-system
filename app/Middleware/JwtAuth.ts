import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class JwtAuth {

  public async handle(
    { request }: HttpContextContract,
    next: () => Promise<void>
  ) {

    const authHeader = request.header('Authorization')

    if (!authHeader) {
      throw new Error('Token missing')
    }

    //const token = authHeader.replace('Bearer ', '')

    const decoded = jwt.verify(
     authHeader,
      Env.get('JWT_SECRET')
    )

    ;(request as any).user = decoded

    await next()
  }
}