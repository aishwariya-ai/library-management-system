import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsLibrarian {

  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {

    console.log('Librarian middleware started')

    const user = (request as any).user

    console.log('User:', user)
    console.log('Role:', user?.role)

    if (!user || user.role !== 'librarian') {

      console.log('Access denied')

      return response.forbidden({
        message: 'Only librarians can perform this action'
      })
    }

    console.log('Access granted')

    await next()
  }
}