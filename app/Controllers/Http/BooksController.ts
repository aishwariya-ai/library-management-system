import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import CreateBookValidator from 'App/Validators/CreateBookValidator'
import UpdateBookValidator from 'App/Validators/UpdateBookValidator'
import GetBookValidator from 'App/Validators/GetBookValidator'
import GetBookByIdValidator from 'App/Validators/GetBookByIdValidator'
import DeleteBookValidator from 'App/Validators/DeleteBookValidator'

export default class BooksController {

  public async store({
    request,
    response,
  }: HttpContextContract) {

    try {

      
      const payload = await request.validate(
        CreateBookValidator
      )

      
      const book = await Book.create(payload)

      
      return response.status(201).send({
        message: 'Book created successfully',
        data: book,
      })

    } catch (error: any) {

      return response.status(500).send({
        message: 'Failed to create book',
        error: error.message,
      })
    }
  }

  public async index({
  request,
  response,
}: HttpContextContract) {

  try {

    
    const payload = await request.validate(
      GetBookValidator
    )

    const page = payload.page || 1
    const limit = payload.limit || 10

    const books = await Book
      .query()
      .paginate(page, limit)

    return response.status(200).send({
      message: 'Books fetched successfully',
      data: books,
    })

  } catch (error: any) {

    return response.status(500).send({
      message: 'Failed to fetch books',
      error: error.message,
    })
  }
}

  public async show({
    request,
    params,
    response,
  }: HttpContextContract) {

    try {

      
      const validatedParams = await request.validate({
        schema: new GetBookByIdValidator().schema,
        data: params,
      })

      
      const book = await Book.find(
        validatedParams.id
      )

      if (!book) {
        return response.status(404).send({
          message: 'Book not found',
        })
      }

     
      return response.status(200).send({
        message: 'Book fetched successfully',
        data: book,
      })

    } catch (error: any) {

      return response.status(500).send({
        message: 'Failed to fetch book',
        error: error.message,
      })
    }
  }

  public async update({
    request,
    params,
    response,
  }: HttpContextContract) {

    try {

      
      const validatedParams = await request.validate({
        schema: new GetBookByIdValidator().schema,
        data: params,
      })

      
      const payload = await request.validate(
        UpdateBookValidator
      )

      
      const book = await Book.find(
        validatedParams.id
      )

      if (!book) {
        return response.status(404).send({
          message: 'Book not found',
        })
      }

      book.merge(payload)

      await book.save()

     
      return response.status(200).send({
        message: 'Book updated successfully',
        data: book,
      })

    } catch (error: any) {

      return response.status(500).send({
        message: 'Failed to update book',
        error: error.message,
      })
    }
  }

  public async destroy({
    request,
    params,
    response,
  }: HttpContextContract) {

    try {

     
      const validatedParams = await request.validate({
        schema: new DeleteBookValidator().schema,
        data: params,
      })

      
      const book = await Book.find(
        validatedParams.id
      )

      if (!book) {
        return response.status(404).send({
          message: 'Book not found',
        })
      }

      await book.delete()

      
      return response.status(200).send({
        message: 'Book deleted successfully',
      })

    } catch (error: any) {

      return response.status(500).send({
        message: 'Failed to delete book',
        error: error.message,
      })
    }
  }
}