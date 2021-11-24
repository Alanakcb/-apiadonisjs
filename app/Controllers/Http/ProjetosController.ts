import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Projeto from 'App/Models/Projeto'
import StoreProjetoValidator from 'App/Validators/StoreProjetoValidator'

export default class ProjetosController {
  public async index({ }: HttpContextContract) {
    const projetoDB = await Projeto.all()
    return projetoDB
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreProjetoValidator)
    const projetoDB = await Projeto.create({ ...data, userId: auth.user?.id })
    return projetoDB
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const projetoDB = await Projeto.findOrFail(params.id)
      return projetoDB
    } catch (error) {
      response.status(400).send("Projeto não encontrado!!!")
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { projeto } = await request.validate(StoreProjetoValidator)
    try {
      const projetoDB = await Projeto.findOrFail(params.id)
      projetoDB.projeto = projeto
      await projetoDB.save()
      return projetoDB

    } catch (error) {
      response.status(400).send("Projeto não encontrado!!!")
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const projetoDB = await Projeto.findOrFail(params.id)
      await projetoDB.delete()
      return projetoDB
    } catch (error) {
      response.status(400).send("Projeto não encontrado!!!")
    }
  }
}