import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'MealsController.store').middleware('auth')
  Route.put('/:id', 'MealsController.update').middleware('auth')
  Route.delete('/:id', 'MealsController.destroy').middleware('auth')
}).prefix('meals')
