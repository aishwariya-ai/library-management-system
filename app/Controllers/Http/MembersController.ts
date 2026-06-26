import type { HttpContextContract }from '@ioc:Adonis/Core/HttpContext'
import Member from 'App/Models/Member'
import UpdateMemberValidator from 'App/Validators/UpdateMemberValidator'
import GetMemberValidator from 'App/Validators/GetMemberValidator'
import GetMemberByIdValidator from 'App/Validators/GetMemberByIdValidator'
import DeleteMemberValidator from 'App/Validators/DeleteMemberValidator'

export default class MembersController {

  public async index({
  request,
  response,
}: HttpContextContract) {

  try {

    
    const payload = await request.validate(
      GetMemberValidator
    )

    
    const page = payload.page || 1
    const limit = payload.limit || 10

    
    const members = await Member
      .query()
      .paginate(page, limit)

   
    return response.status(200).send({
      message: 'Members fetched successfully',
      data: members,
    })

  } catch (error: any) {

    return response.status(500).send({
      message: 'Failed to fetch members',
      error: error.message,
    })
  }
}

  public async show({
    request,
    params,
    response,
  }: HttpContextContract) {

    try {

      
      const validatedParams =
        await request.validate({
          schema: new GetMemberByIdValidator().schema,
          data: params,
        })

      
      const member = await Member.find(
        validatedParams.id
      )

      if (!member) {
        return response.status(404).send({
          message: 'Member not found',
        })
      }

      
      return response.status(200).send({
        message: 'Member fetched successfully',
        data: member,
      })

    } catch (error: any) {

      return response.status(500).send({
        message: 'Failed to fetch member',
        error: error.message,
      })
    }
  }

  public async update({
    request,
    params,
    response,
  }: HttpContextContract) {

    try {

      
      const validatedParams =
        await request.validate({
          schema: new GetMemberByIdValidator().schema,
          data: params,
        })

      
      const payload = await request.validate(
        UpdateMemberValidator
      )

      const member = await Member.find(
        validatedParams.id
      )

      if (!member) {
        return response.status(404).send({
          message: 'Member not found',
        })
      }

      member.merge(payload)

      await member.save()

      
      return response.status(200).send({
        message: 'Member updated successfully',
        data: member,
      })

    } catch (error: any) {

      return response.status(500).send({
        message: 'Failed to update member',
        error: error.message,
      })
    }
  }

  public async destroy({
    request,
    params,
    response,
  }: HttpContextContract) {

    try {

      const validatedParams =
        await request.validate({
          schema: new DeleteMemberValidator().schema,
          data: params,
        })

      const member = await Member.find(
        validatedParams.id
      )

      if (!member) {
        return response.status(404).send({
          message: 'Member not found',
        })
      }

      await member.delete()

      return response.status(200).send({
        message: 'Member deleted successfully',
      })

    } catch (error: any) {

      return response.status(500).send({
        message: 'Failed to delete member',
        error: error.message,
      })
    }
  }
}