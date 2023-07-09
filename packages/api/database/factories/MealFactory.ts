import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'

import Meal from 'App/Models/Meal'

import UserFactory from 'Database/factories/UserFactory'

export default Factory.define(Meal, ({ faker }) => {
  return {
    name: faker.lorem.words(2),
    description: faker.lorem.paragraph(),
    isOnDiet: faker.datatype.boolean(),
    date: DateTime.fromJSDate(new Date()),
  }
})
  .relation('user', () => UserFactory)
  .build()
