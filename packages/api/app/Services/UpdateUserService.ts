import ForbiddenException from 'App/Exceptions/ForbiddenException'
import NotFoundException from 'App/Exceptions/NotFoundException'
import UnprocessableException from 'App/Exceptions/UnprocessableException'

import User from 'App/Models/User'

interface UpdateUserServiceRequest {
  userId: string

  id: string
  name: string
  currentPassword?: string
  newPassword?: string
}

export default class UpdateUserService {
  public async execute({
    userId,

    id,
    name,
    currentPassword,
    newPassword,
  }: UpdateUserServiceRequest) {
    const user = await User.find(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this user')
    }

    user.name = name

    if (newPassword && !currentPassword) {
      throw new UnprocessableException('You must provide your old password')
    }

    if (newPassword && currentPassword) {
      if (!(await user.verifyPassword(currentPassword))) {
        throw new UnprocessableException('Old password does not match')
      }

      user.password = newPassword
    }

    await user.save()

    return user
  }
}
