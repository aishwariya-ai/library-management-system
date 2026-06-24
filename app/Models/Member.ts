import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column,beforeSave } from '@ioc:Adonis/Lucid/Orm'

export default class Member extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare phone: string

  @column()
  declare role: string

  @column({
    columnName: 'membership_type'
  })
  declare membershipType: string

  @column({ serializeAs: null })
  declare password: string

@beforeSave()
  public static async hashPassword(member: Member) {

    if (member.$dirty.password) {
      member.password = await Hash.make(member.password)
    }


  }
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true
  })
  declare updatedAt: DateTime
}