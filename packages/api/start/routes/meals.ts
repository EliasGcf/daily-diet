import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'MealsController.store').middleware('auth')
}).prefix('meals')
