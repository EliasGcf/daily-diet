import Route from '@ioc:Adonis/Core/Route'

Route.get('/me', 'UsersController.show').middleware('auth')

Route.group(() => {
  Route.post('/', 'UsersController.store')
}).prefix('users')
