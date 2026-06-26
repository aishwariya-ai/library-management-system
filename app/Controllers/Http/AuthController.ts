import Member from 'App/Models/Member'
import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import CreateMemberValidator from 'App/Validators/CreateMemberValidator'

export default class AuthController {

  public async register({
    request,
    response,
  }: HttpContextContract) {

    try {
      const data = await request.validate(
        CreateMemberValidator
      )

      const member = await Member.create(data)

      return response.status(201).send({
        message: 'Member registered successfully',
        data: member,
      })

    } catch (error) {

      const msg = error instanceof Error ? error.message : String(error)
      return response.status(500).send({
        message: 'Failed to register member',
        error: msg,
      })
    }
  }

  public async login({
    request,
    response,
  }: HttpContextContract) {

    try {

      const { email, password } =
        await request.validate({
          schema: schema.create({
            email: schema.string({}, [rules.email()]),
            password: schema.string(),
          }),
        })


      const member = await Member.findBy(
        'email',
        email
      )

      if (!member) {
        return response.status(401).send({
          message: 'Invalid credentials',
        })
      }

      const isVerified = await Hash.verify(
        member.password,
        password
      )

      if (!isVerified) {
        return response.status(401).send({
          message: 'Invalid credentials',
        })
      }

      const token = jwt.sign(
        {
          id: member.id,
          email: member.email,
          role: member.role,
        },
        Env.get('JWT_SECRET'),
        {
          expiresIn: '1d',
        }
      )

   
      return response.status(200).send({
        message: 'Login successful',
        token,
      })

    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return response.status(500).send({
        message: 'Login failed',
        error: msg,
      })
    }
  }
}