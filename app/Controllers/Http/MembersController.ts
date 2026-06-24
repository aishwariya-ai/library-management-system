import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Member from 'App/Models/Member'
import UpdateMemberValidator from 'App/Validators/UpdateMemberValidator'

export default class MembersController {
  
  async index() {

    return await Member.all()

  }

  
  async show({ params }: HttpContextContract) {

    return await Member.findOrFail(params.id)

  }

  
 async update({ params, request }: HttpContextContract) {

  const member = await Member.findOrFail(params.id)

  const payload = await request.validate(
    UpdateMemberValidator
  )

  member.merge(payload)

  await member.save()

  return member
}
  
  async destroy({ params }: HttpContextContract) {

    const member = await Member.findOrFail(params.id)

    await member.delete()

    return {
      message: 'Member deleted successfully'
    }
  }
}