import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {

  protected tableName = 'books'

  public async up () {

    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')

      table.string('title').notNullable()

      table.integer('quantity').notNullable()

      table.string('genre').notNullable()

      table.float('price').notNullable()

      table.string('publisher').notNullable()

      table.string('isbn').unique()

      table.integer('published_year')

      table
          .integer('author_id')
          .unsigned()
          .references('id')
          .inTable('authors')
          .onDelete('CASCADE')

      table.timestamps(true)

    })

  }

  public async down () {

    this.schema.dropTable(this.tableName)

  }

}