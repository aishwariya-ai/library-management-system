import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import CreateBookValidator from 'App/Validators/CreateBookValidator'
import UpdateBookValidator from 'App/Validators/UpdateBookValidator'


export default class BooksController {

  
  async store({ request }: HttpContextContract) {

  const payload = await request.validate(
    CreateBookValidator
  )

  return await Book.create(payload)
} 
  async index() {

    return await Book.all()

  }

  
  async show({ params }: HttpContextContract) {

    return await Book.findOrFail(params.id)

  }

  
  async update({ params, request }: HttpContextContract) {

  const book = await Book.findOrFail(params.id)

  const payload = await request.validate(
    UpdateBookValidator
  )

  book.merge(payload)

  await book.save()

  return book
}

  
  public async destroy({
  params,response}: HttpContextContract) {


  const book = await Book.find(params.id)

  if (!book) {
    return response.notFound({
      message: 'Book not found'
    })
  }

  await book.delete()

  return {
    message: 'Book deleted successfully'
  }
}
}