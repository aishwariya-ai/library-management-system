declare module '@ioc:Adonis/Core/Validator' 
{

  interface Rules {

    authorName(): import('@ioc:Adonis/Core/Validator').Rule

  }
}