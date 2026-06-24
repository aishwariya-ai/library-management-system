import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateAuthorValidator {

  public schema = schema.create({

    name: schema.string.optional({}, [
      rules.minLength(3),
      rules.maxLength(50)
    ]),

    country: schema.string.optional({}, [
      rules.minLength(2)
    ]),

    email: schema.string.optional({}, [
      rules.email()
    ])

  })

  public messages = {}
}