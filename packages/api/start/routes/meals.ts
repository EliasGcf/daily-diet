import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'MealsController.store').middleware('auth')
  Route.get('/', 'MealsController.index').middleware('auth')
  Route.get('/metrics', 'MealsController.metrics').middleware('auth')
  Route.get('/:id', 'MealsController.show').middleware('auth')
  Route.put('/:id', 'MealsController.update').middleware('auth')
  Route.delete('/:id', 'MealsController.destroy').middleware('auth')
}).prefix('meals')
