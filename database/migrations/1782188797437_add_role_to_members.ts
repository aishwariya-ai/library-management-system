import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddRoleToMembers extends BaseSchema {

  protected tableName = 'members'

  public async up () {

    this.schema.alterTable(this.tableName, (table) => {

      table.string('role').notNullable().defaultTo('member')

    })

  }

  public async down () {

    this.schema.alterTable(this.tableName, (table) => {

      table.dropColumn('role')

    })

  }
}