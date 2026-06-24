import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'

import Author from './Author'

export default class Book extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare quantity: number

  @column()
  declare genre: string

  @column()
  declare price: number

  @column()
  declare publisher: string

  @column()
  declare isbn: string

  @column()
  declare published_year: number

@column()
declare authorId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
  })
  declare updatedAt: DateTime

  // Each Book belongs to one Author
  @belongsTo(() => Author)
  declare author: BelongsTo<typeof Author>
}