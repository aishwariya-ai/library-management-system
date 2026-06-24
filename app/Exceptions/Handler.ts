import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {

  constructor() {
    super(Logger)
  }

  public async handle(
    error: any,
    ctx: HttpContextContract
  ) {

    //Validation Errors
    if (error.code === 'E_VALIDATION_FAILURE') {

      return ctx.response.status(422).send({
        success: false,
        message: 'Validation Failed',
        errors: error.messages.errors
      })
    }
console.log(error.code)
    //Resource Not Found
    if (error.code === 'E_ROW_NOT_FOUND') {

      return ctx.response.status(404).send({
        success: false,
        message: 'Resource not found'
      })
    }

    //Invalid JWT
    if (error.name === 'JsonWebTokenError') {

      return ctx.response.status(401).send({
        success: false,
        message: 'Invalid token'
      })
    }

    //Expired JWT
    if (error.name === 'TokenExpiredError') {

      return ctx.response.status(401).send({
        success: false,
        message: 'Token expired'
      })
    }

if (error.message === 'Token missing') {
    return ctx.response.status(401).send({
      success: false,
      message: 'Authorization token is required',
    })
  }
    return super.handle(error, ctx)
  }
}