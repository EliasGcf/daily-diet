import ConflictException from 'App/Exceptions/ConflictException'

import User from 'App/Models/User'

interface CreateUserServiceRequest {
  name: string
  email: string
}

export default class CreateUserService {
  public async execute({ name, email }: CreateUserServiceRequest) {
    const userByEmail = await User.findBy('email', email)

    if (userByEmail) {
      throw new ConflictException('Email already in use')
    }

    const user = await User.create({ name, email })

    return user
  }
}
