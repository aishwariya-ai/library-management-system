import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('App/Middleware/Logger')
])



Server.middleware.registerNamed({
  librarian: () => import('App/Middleware/Librarian'),
  jwt: () => import('App/Middleware/JwtAuth')
})