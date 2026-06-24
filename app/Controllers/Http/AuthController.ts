import Member from 'App/Models/Member'
import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import CreateMemberValidator from 'App/Validators/CreateMemberValidator'

export default class AuthController {

  
public async register({ request }: HttpContextContract) {

  const data = await request.validate(
    CreateMemberValidator
  )

  const member = await Member.create(data)

  return member
}

  
  public async login({
    request,
    response
  }: HttpContextContract) {

    const { email, password } =
      request.only(['email', 'password'])

    const member = await Member.findBy('email', email)
console.log(member)
    if (!member) {
      return response.unauthorized({
        message: 'Invalid credentials'
      })
    }

    const isVerified = await Hash.verify(
      member.password,
      password
    )

    if (!isVerified) {
      return response.unauthorized({
        message: 'Invalid credentials'
      })
    }

    const token = jwt.sign(
      {
        id: member.id,
        email: member.email,
        role: member.role
      },
      Env.get('JWT_SECRET'),
      {
        expiresIn: '1d'
      }
    )

    return {
      message: 'Login successful',
      token
    }
  }
}