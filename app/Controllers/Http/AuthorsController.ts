import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Author from 'App/Models/Author'
import AuthorService from 'App/Services/AuthorService'
import CreateAuthorValidator
  from 'App/Validators/CreateAuthorValidator'

import UpdateAuthorValidator
  from 'App/Validators/UpdateAuthorValidator'

export default class AuthorsController {

  async store({ request }: HttpContextContract) {

  //const data = request.body()

  const payload = await request.validate(
    CreateAuthorValidator
  )

  return await AuthorService.createAuthor(payload)
}



  async index() {

    return Author.all()
  }

  async show({ params }: HttpContextContract) {

    const author = await Author
      .query()
      .where('id', params.id)
      .preload('books')
      .firstOrFail()

    return author
  }

  async update({
    params,
    request
  }: HttpContextContract) {

    const author =
      await Author.findOrFail(params.id)

    const payload = await request.validate(
      UpdateAuthorValidator
    )
    console.log(typeof(payload));
console.log(payload);
    author.merge(payload)

    await author.save()

    return author
  }

  async destroy({ params }: HttpContextContract) {

    const author =
      await Author.findOrFail(params.id)

    await author.delete()

    return {
      message: 'Author deleted successfully'
    }
  }
}