import Author from 'App/Models/Author'

export default class AuthorService {


  public static async  createAuthor(data: any) {

    const author = await Author.create(data)

    return author
  }

}