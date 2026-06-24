import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateBookValidator {
  public schema = schema.create({
    title: schema.string({}, [
      rules.maxLength(255),
    ]),

    quantity: schema.number([
      rules.unsigned(),
    ]),

    genre: schema.string({}, [
      rules.maxLength(100),
    ]),

    price: schema.number([
      rules.unsigned(),
    ]),

    publisher: schema.string({}, [
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

    author_id: schema.number([
      rules.exists({
        table: 'authors',
        column: 'id',
      }),
    ]),
  })

  public messages = {
    'title.required': 'Book title is required',
    'quantity.required': 'Quantity is required',
    'genre.required': 'Genre is required',
    'price.required': 'Price is required',
    'publisher.required': 'Publisher is required',

    'isbn.unique': 'ISBN already exists',

    'author_id.exists': 'Author does not exist',

    'published_year.range':
      'Enter a valid published year',
  }
}