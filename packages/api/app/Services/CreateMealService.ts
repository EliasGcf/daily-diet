import { DateTime } from 'luxon'

import NotFoundException from 'App/Exceptions/NotFoundException'

import Meal from 'App/Models/Meal'
import User from 'App/Models/User'

interface CreateMealServiceRequest {
  userId: string
  name: string
  description: string
  isOnDiet: boolean
  date: Date
}

export default class CreateMealService {
  public async execute({
    userId,
    name,
    description,
    isOnDiet,
    date,
  }: CreateMealServiceRequest) {
    const user = await User.find(userId)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const meal = await Meal.create({
      userId,
      name,
      description,
      isOnDiet,
      date: DateTime.fromJSDate(date),
    })

    return meal
  }
}
