import User from 'App/Models/User'

interface FetchUsersServicesRequest {
  page: number
  perPage?: number
}

export default class FetchUsersServices {
  public async execute({ page, perPage }: FetchUsersServicesRequest) {
    const users = await User.query().paginate(page, perPage)

    return users
  }
}
