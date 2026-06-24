import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateBookValidator {
  public schema = schema.create({
    title: schema.string.optional({}, [
      rules.maxLength(255),
    ]),

    quantity: schema.number.optional([
      rules.unsigned(),
    ]),

    genre: schema.string.optional({}, [
      rules.maxLength(100),
    ]),

    price: schema.number.optional([
      rules.unsigned(),
    ]),

    publisher: schema.string.optional({}, [
      rules.maxLength(255),
    ]),

    isbn: schema.string.optional({}, [
      rules.unique({
        table: 'books',
        column: 'isbn',
      }),
    ]),

    published_year: schema.number.optional([
      rules.range(1000, new Date().getFullYear()),
    ]),

    author_id: schema.number.optional([
      rules.exists({
        table: 'authors',
        column: 'id',
      }),
    ]),
  })

  public messages = {
    'isbn.unique': 'ISBN already exists',
    'author_id.exists': 'Author does not exist',
  }
}