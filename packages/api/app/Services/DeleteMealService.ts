import ForbiddenException from 'App/Exceptions/ForbiddenException'
import NotFoundException from 'App/Exceptions/NotFoundException'

import Meal from 'App/Models/Meal'

interface DeleteMealServiceRequest {
  userId: string
  mealId: string
}

export default class DeleteMealService {
  public async execute({ mealId, userId }: DeleteMealServiceRequest) {
    const meal = await Meal.find(mealId)

    if (!meal) {
      throw new NotFoundException('Meal not found')
    }

    if (meal.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this meal')
    }

    await meal.delete()
  }
}
