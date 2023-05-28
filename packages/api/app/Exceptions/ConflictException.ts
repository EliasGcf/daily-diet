import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ConflictException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ConflictException extends Exception {
  constructor(message: string) {
    super(message, 409, 'E_CONFLICT_EXCEPTION')
  }
}
