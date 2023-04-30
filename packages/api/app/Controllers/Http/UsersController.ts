import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const { name, email } = request.body()

    const user = await User.create({ name, email })

    return response.status(201).send(user)
  }

  public async index(ctx: HttpContextContract) {
    const users = await User.all()

    return users
  }
}
