import NotFoundException from 'App/Exceptions/NotFoundException'

import User from 'App/Models/User'

interface GetUserMealsMetricsServiceRequest {
  userId: string
}

export default class GetUserMealsMetricsService {
  public async execute({ userId }: GetUserMealsMetricsServiceRequest) {
    const user = await User.query()
      .where('id', userId)
      .preload('meals', (query) => query.orderBy('date', 'asc'))
      .first()

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const totalMeals = user.meals.length
    const onDietMeals = user.meals.filter((meal) => meal.isOnDiet)
    const offDietMeals = user.meals.filter((meal) => !meal.isOnDiet)

    const { bestOnDietSequence } = user.meals.reduce(
      (acc, meal) => {
        if (meal.isOnDiet) {
          acc.currentSequence += 1
        } else {
          acc.currentSequence = 0
        }

        if (acc.currentSequence > acc.bestOnDietSequence) {
          acc.bestOnDietSequence = acc.currentSequence
        }

        return acc
      },
      { bestOnDietSequence: 0, currentSequence: 0 },
    )

    return {
      total: totalMeals,
      onDiet: onDietMeals.length,
      offDiet: offDietMeals.length,
      bestOnDietSequence,
    }
  }
}
