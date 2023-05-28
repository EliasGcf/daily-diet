import NotFoundException from 'App/Exceptions/NotFoundException'

import User from 'App/Models/User'

export default class GetUserByIdService {
  public async execute(id: string) {
    const user = await User.find(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
}
