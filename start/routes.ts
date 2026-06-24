import Route from '@ioc:Adonis/Core/Route'

// Authentication Routes
Route.group(() => {

  Route.post('/register', 'AuthController.register')

  Route.post('/login', 'AuthController.login')

})


// Author Routes
Route.group(() => {

  Route.post('/', 'AuthorsController.store')
    .middleware(['librarian'])

  Route.get('/', 'AuthorsController.index')

  Route.get('/:id', 'AuthorsController.show')

  Route.put('/:id', 'AuthorsController.update')
    .middleware(['librarian'])

  Route.delete('/:id', 'AuthorsController.destroy')
    .middleware(['librarian'])

})
  .prefix('/authors')
  .middleware(['jwt'])


// Book Routes
Route.group(() => {

  Route.post('/', 'BooksController.store')
    .middleware(['librarian'])

  Route.get('/', 'BooksController.index')

  Route.get('/:id', 'BooksController.show')

  Route.put('/:id', 'BooksController.update')
    .middleware(['librarian'])

  Route.delete('/:id', 'BooksController.destroy')
    .middleware(['librarian'])

})
  .prefix('/books')
  .middleware(['jwt'])


// Member Routes
Route.group(() => {

  Route.get('/', 'MembersController.index')

  Route.get('/:id', 'MembersController.show')
    

  Route.put('/:id', 'MembersController.update')
  .middleware(['librarian'])
    

  Route.delete('/:id', 'MembersController.destroy').middleware(['librarian'])
    

})
  .prefix('/members')
  .middleware(['jwt'])