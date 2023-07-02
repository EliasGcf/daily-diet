import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

import User from 'App/Models/User'

export default class Meal extends BaseModel {
  public static table = 'meals'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public name: string

  @column()
  public description: string

  @column({ serialize: (value) => Boolean(value) })
  public isOnDiet: boolean

  @column.dateTime({ serialize: (value: DateTime) => value.toJSDate() })
  public date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUUID(meal: Meal) {
    meal.id = randomUUID()
  }
}
