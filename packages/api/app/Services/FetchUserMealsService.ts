import Meal from 'App/Models/Meal'

interface FetchUserMealsServiceRequest {
  userId: string
  page: number
  perPage: number
}

export default class FetchUserMealsService {
  public async execute({ userId, page, perPage }: FetchUserMealsServiceRequest) {
    const meals = await Meal.query().where('user_id', userId).paginate(page, perPage)

    return meals
  }
}
