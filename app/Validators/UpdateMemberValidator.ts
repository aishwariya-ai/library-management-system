import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateMemberValidator {
  public schema = schema.create({
    name: schema.string.optional({}, [
      rules.maxLength(255),
    ]),

    email: schema.string.optional({}, [
      rules.email(),

      rules.unique({
        table: 'members',
        column: 'email',
      }),
    ]),

    phone: schema.string.optional({}, [
      rules.mobile(),
    ]),

    membership_type: schema.string.optional({}, [
      rules.maxLength(100),
    ]),
  })

  public messages = {
    'email.email': 'Enter a valid email',
    'email.unique': 'Email already exists',
  }
}