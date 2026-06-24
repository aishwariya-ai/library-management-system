import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule(
  'authorName',

 
  (value, _, options) => {

    
    if (typeof value !== 'string') {
      return
    }

  
    const regex = /^[A-Za-z ]+$/

    if (!regex.test(value)) {

      options.errorReporter.report(
        options.pointer,
        'authorName',
        'Author name validation failed',
        options.arrayExpressionPointer
      )
    }
  },

  /*(_, __, subtype) => {

    
    if (subtype !== 'string') {
      throw new Error(
        '"authorName" rule can only be used with string schema type'
      )
    }

    return {
      compiledOptions: {}
    }
  }*/
)