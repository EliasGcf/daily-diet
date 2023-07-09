import { inject } from '@adonisjs/fold'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateUserService from 'App/Services/CreateUserService'
import GetUserByIdService from 'App/Services/GetUserByIdService'
import UpdateUserService from 'App/Services/UpdateUserService'

import CreateUserValidator from 'App/Validators/Users/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/Users/UpdateUserValidator'

@inject()
export default class UsersController {
  constructor(
    private createUserService: CreateUserService,
    private getUserByIdService: GetUserByIdService,
    private updateUserService: UpdateUserService,
  ) {}

  public async store({ request, response }: HttpContextContract) {
    const { name, email, password } = await request.validate(CreateUserValidator)

    const user = await this.createUserService.execute({ name, email, password })

    return response.status(201).send(user)
  }

  public async show({ auth }: HttpContextContract) {
    const user = await this.getUserByIdService.execute(auth.user?.id!)

    return user
  }

  public async update({ auth, request }: HttpContextContract) {
    const { name, newPassword, currentPassword } = await request.validate(
      UpdateUserValidator,
    )

    const user = await this.updateUserService.execute({
      userId: auth.user?.id!,
      id: auth.user?.id!,
      name,
      newPassword,
      currentPassword,
    })

    return user
  }
}
