import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateMealService from 'App/Services/CreateMealService'
import DeleteMealService from 'App/Services/DeleteMealService'
import FetchUserMealsService from 'App/Services/FetchUserMealsService'
import GetUserMealService from 'App/Services/GetUserMealService'
import GetUserMealsMetricsService from 'App/Services/GetUserMealsMetricsService'
import UpdateMealService from 'App/Services/UpdateMealService'

import CreateMealValidator from 'App/Validators/Meals/CreateMealValidator'
import UpdateMealValidator from 'App/Validators/Meals/UpdateMealValidator'

@inject()
export default class MealsController {
  constructor(
    private createMealService: CreateMealService,
    private deleteMealService: DeleteMealService,
    private updateMealService: UpdateMealService,
    private getUserMealService: GetUserMealService,
    private getUserMealsMetricsService: GetUserMealsMetricsService,
    private fetchUserMealsService: FetchUserMealsService,
  ) {}

  public async store({ request, response, auth }: HttpContextContract) {
    const { name, description, isOnDiet, date } = await request.validate(
      CreateMealValidator,
    )

    const meal = await this.createMealService.execute({
      userId: auth.user?.id!,
      name,
      description,
      isOnDiet,
      date: date.toJSDate(),
    })

    return response.status(201).send(meal)
  }

  public async index({ auth }: HttpContextContract) {
    const meals = await this.fetchUserMealsService.execute({
      userId: auth.user?.id!,
      page: 1,
      perPage: 30,
    })

    return meals
  }

  public async show({ request, auth }: HttpContextContract) {
    const { id } = request.params()

    const meal = await this.getUserMealService.execute({
      mealId: id,
      userId: auth.user?.id!,
    })

    return meal
  }

  public async update({ request, auth }: HttpContextContract) {
    const { id } = request.params()

    const { name, description, isOnDiet, date } = await request.validate(
      UpdateMealValidator,
    )

    const meal = await this.updateMealService.execute({
      id,
      userId: auth.user?.id!,
      name,
      description,
      isOnDiet,
      date: date.toJSDate(),
    })

    return meal
  }

  public async destroy({ request, response, auth }: HttpContextContract) {
    const { id } = request.params()

    await this.deleteMealService.execute({
      mealId: id,
      userId: auth.user?.id!,
    })

    return response.status(204).send({})
  }

  public async metrics({ auth }: HttpContextContract) {
    const metrics = await this.getUserMealsMetricsService.execute({
      userId: auth.user?.id!,
    })

    return metrics
  }
}
