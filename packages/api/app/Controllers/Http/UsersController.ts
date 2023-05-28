import { inject } from '@adonisjs/fold'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateUserService from 'App/Services/CreateUserService'
import FetchUsersServices from 'App/Services/FetchUsersServices'
import GetUserByIdService from 'App/Services/GetUserByIdService'

import PaginationValidator from 'App/Validators/PaginationValidator'
import CreateUserValidator from 'App/Validators/Users/CreateUserValidator'

@inject()
export default class UsersController {
  constructor(
    private createUserService: CreateUserService,
    private fetchUsersService: FetchUsersServices,
    private getUserByIdService: GetUserByIdService
  ) {}

  public async store({ request, response }: HttpContextContract) {
    const { name, email } = await request.validate(CreateUserValidator)

    const user = await this.createUserService.execute({ name, email })

    return response.status(201).send(user)
  }

  public async index(ctx: HttpContextContract) {
    const { page = 1, perPage } = await ctx.request.validate(PaginationValidator)

    const users = await this.fetchUsersService.execute({ page, perPage })

    users.baseUrl('/users')

    return users
  }

  public async show(ctx: HttpContextContract) {
    const { id } = ctx.params

    const user = await this.getUserByIdService.execute(id)

    return user
  }
}
