import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateMemberValidator {
  public schema = schema.create({
    name: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(50)
    ]),

    email: schema.string({}, [
      rules.email(),

      rules.unique({
        table: 'members',
        column: 'email',
      }),
    ]),

    phone: schema.string({}, [
      rules.mobile(),
    ]),

    membership_type: schema.enum([
      'Premium',
      'Basic',
    ] as const),
    password: schema.string({}, [
  rules.minLength(6)
]),

role: schema.enum([
  'member',
  'librarian'
] as const),
  })

  public messages = {
    'name.required': 'Member name is required',

    'email.required': 'Email is required',
    'email.email': 'Enter a valid email',
    'email.unique': 'Email already exists',

    'phone.required': 'Phone number is required',

    'membership_type.enum':
      'Membership type must be premium or basic',
  }
}