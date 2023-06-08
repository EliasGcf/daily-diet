import NotFoundException from 'App/Exceptions/NotFoundException'

import User from 'App/Models/User'

interface GetUserMealServiceRequest {
  userId: string
  mealId: string
}

export default class GetUserMealService {
  public async execute({ userId, mealId }: GetUserMealServiceRequest) {
    const user = await User.find(userId)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const meal = await user.related('meals').query().where('id', mealId).first()

    if (!meal) {
      throw new NotFoundException('Meal not found')
    }

    return meal
  }
}
