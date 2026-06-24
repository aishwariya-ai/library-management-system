import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateAuthorValidator {

  public schema = schema.create({

    name: schema.string({}, [

      // Custom rule
      rules.authorName(),

      // Built-in rules
      rules.minLength(3),
      rules.maxLength(50)

    ]),

    country: schema.string({}, [
      rules.minLength(2)
    ]),

    email: schema.string({}, [

      rules.email(),

      rules.unique({
        table: 'authors',
        column: 'email'
      })

    ])

  })

  public messages = {

    
    'name.required': 'Author name is required',

    'name.authorName':
      'Author name can contain only letters and spaces',

    'name.minLength':
      'Author name must contain at least 3 characters',

    'name.maxLength':
      'Author name cannot exceed 50 characters',

    
    'country.required':
      'Country is required',

    'country.minLength':
      'Country must contain at least 2 characters',

    
    'email.required':
      'Email is required',

    'email.email':
      'Please provide a valid email address',

    'email.unique':
      'Author email already exists'
  }
}