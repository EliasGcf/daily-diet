import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'AuthController.store')
Route.post('logout', 'AuthController.destroy').middleware('auth')
