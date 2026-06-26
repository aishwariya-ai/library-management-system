import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class GetAuthorValidator {

  public schema = schema.create({
    page: schema.number.optional([
      rules.unsigned(),
    ]),

    limit: schema.number.optional([
      rules.unsigned(),
      rules.range(1, 100),
    ]),
  })
}