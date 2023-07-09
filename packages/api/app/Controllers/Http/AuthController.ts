import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

@inject()
export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.body()

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '7 days',
      })

      // This is required to return user data
      return { ...token }
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      revoked: true,
    }
  }
}
