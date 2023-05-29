import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateMealService from 'App/Services/CreateMealService'
import DeleteMealService from 'App/Services/DeleteMealService'

import CreateMealValidator from 'App/Validators/Meals/CreateMealValidator'

@inject()
export default class MealsController {
  constructor(
    private createMealService: CreateMealService,
    private deleteMealService: DeleteMealService
  ) {}

  public async store({ request, response, auth }: HttpContextContract) {
    const { name, description, isOnDiet } = await request.validate(CreateMealValidator)

    const meal = await this.createMealService.execute({
      userId: auth.user?.id!,
      name,
      description,
      isOnDiet,
    })

    return response.status(201).send(meal)
  }

  public async destroy({ request, response, auth }: HttpContextContract) {
    const { id } = request.params()

    await this.deleteMealService.execute({
      mealId: id,
      userId: auth.user?.id!,
    })

    return response.status(204).send({})
  }
}
