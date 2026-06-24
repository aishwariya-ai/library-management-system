import { DateTime } from 'luxon'
import { BaseModel, column ,hasMany,HasMany} from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'

export default class Author extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
declare name: string

@column()
declare country: string

@column()
declare email: string

@hasMany(() => Book)
declare books: HasMany<typeof Book>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime



}