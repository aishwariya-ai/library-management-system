import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Author from 'App/Models/Author'
import AuthorService from 'App/Services/AuthorService'
import CreateAuthorValidator from 'App/Validators/CreateAuthorValidator'
import UpdateAuthorValidator from 'App/Validators/UpdateAuthorValidator'
import GetAuthorValidator from 'App/Validators/GetAuthorValidator'
import GetAuthorByIdValidator from 'App/Validators/GetAuthorByIdValidator'
import DeleteAuthorValidator from 'App/Validators/DeleteAuthorValidator'

export default class AuthorsController {

  public async store({
    request,
    response,
  }: HttpContextContract) {

    try {

      
      const payload = await request.validate(
        CreateAuthorValidator
      )

      
      const author =
        await AuthorService.createAuthor(payload)

      
      return response.status(201).send({
        message: 'Author created successfully',
        data: author,
      })

    } catch (error: any) {

      return response.status(500).send({
        message: 'Failed to create author',
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
  GetAuthorValidator
)

const page = payload.page || 1
const limit = payload.limit || 10

const authors = await Author
  .query()
  .paginate(page, limit)

    
    return response.status(200).send({
      message: 'Authors fetched successfully',
      data: authors,
    })

  } catch (error: any) {

    return response.status(500).send({
      message: 'Failed to fetch authors',
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

      
      const validatedParams =
        await request.validate({
          schema: new GetAuthorByIdValidator().schema,
          data: {
            id: Number(params.id),
          },
        })

      
      const author = await Author
        .query()
        .where('id', validatedParams.id)
        .preload('books')
        .first()

      if (!author) {
        return response.status(404).send({
          message: 'Author not found',
        })
      }

      
      return response.status(200).send({
        message: 'Author fetched successfully',
        data: author,
      })

    } catch (error: any) {

      return response.status(500).send({
        message: 'Failed to fetch author',
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

      const validatedParams =
        await request.validate({
          schema: new GetAuthorByIdValidator().schema,
          data: {
            id: Number(params.id),
          },
        })

      const payload = await request.validate(
        UpdateAuthorValidator
      )

      const author = await Author.find(
        validatedParams.id
      )

      if (!author) {
        return response.status(404).send({
          message: 'Author not found',
        })
      }

      author.merge(payload)

      await author.save()

      return response.status(200).send({
        message: 'Author updated successfully',
        data: author,
      })

    } catch (error: any) {

      return response.status(500).send({
        message: 'Failed to update author',
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

      const validatedParams =
        await request.validate({
          schema: new DeleteAuthorValidator().schema,
          data: {
            id: Number(params.id),
          },
        })

      const author = await Author.find(
        validatedParams.id
      )

      if (!author) {
        return response.status(404).send({
          message: 'Author not found',
        })
      }

      await author.delete()

     
      return response.status(200).send({
        message: 'Author deleted successfully',
      })

    } catch (error: any) {

      return response.status(500).send({
        message: 'Failed to delete author',
        error: error.message,
      })
    }
  }
}