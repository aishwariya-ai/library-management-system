import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class GetMemberByIdValidator {

  public schema = schema.create({
    id: schema.number([
      rules.unsigned(),
    ]),
  })
}