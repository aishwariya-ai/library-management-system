import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddPasswordToMembers extends BaseSchema {

  protected tableName = 'members'

  public async up () {

    this.schema.alterTable(this.tableName, (table) => {

      table.string('password').notNullable()

    })

  }

  public async down () {

    this.schema.alterTable(this.tableName, (table) => {

      table.dropColumn('password')

    })

  }
}