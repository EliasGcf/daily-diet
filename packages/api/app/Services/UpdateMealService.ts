import { DateTime } from 'luxon'

import ForbiddenException from 'App/Exceptions/ForbiddenException'
import NotFoundException from 'App/Exceptions/NotFoundException'

import Meal from 'App/Models/Meal'

interface UpdateMealServiceRequest {
  id: string
  userId: string
  name: string
  description: string
  isOnDiet: boolean
  date: Date
}

export default class UpdateMealService {
  public async execute({
    id,
    userId,
    name,
    description,
    isOnDiet,
    date,
  }: UpdateMealServiceRequest) {
    const meal = await Meal.find(id)

    if (!meal) {
      throw new NotFoundException('Meal not found')
    }

    if (meal.userId !== userId) {
      throw new ForbiddenException('You are not allowed to update this meal')
    }

    meal.name = name
    meal.description = description
    meal.isOnDiet = isOnDiet
    meal.date = DateTime.fromJSDate(date)

    await meal.save()

    return meal
  }
}
