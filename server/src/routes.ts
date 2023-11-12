import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'
import dayjs from 'dayjs'

export async function appRoutes(app: FastifyInstance) {
  //rota para buscar os detalhes
  app.get('/login', async request => {
    const getDayParams = z.object({
      //utilizando o coerce do zod para converter a string recebida para date
      user: z.coerce.string(),
      pass: z.coerce.string()
    })

    //recebendo via query localhost:3333/day?date=2023-01-13
    let { user, pass } = getDayParams.parse(request.query)

    console.log(user, pass)

    //hábitos que já foram completados
    //todos os hábitos possíveis
    let login = await prisma.cadastro.findMany({
      where: {
        cad_user: user.toString()
      }
    })

    console.log(login)
    if (login.length === 0) {
      return false
    }

    let logar = false

    if (user === login[0].cad_user && pass === login[0].cad_pass) {
      logar = true
    } else {
      logar = false
    }

    console.log(logar)
    return logar
  })

  app.post('/cadastro', async request => {
    const Usuario = z.object({
      user: z.string(),
      pass: z.string()
    })

    const { user, pass } = Usuario.parse(request.body)
    const today = dayjs().startOf('day').toDate()
    await prisma.cadastro.create({
      data: {
        cad_user: user,
        cad_pass: pass,
        created_at: today
      }
    })
  })

  app.post('/cadastroAtivo', async (request, reply) => {
    try {
      const Ativo = z.object({
        nome: z.string(),
        valor: z.string(),
        tp_investimento: z.string(),
        observacao: z.string()
      })

      const { nome, valor, tp_investimento, observacao } = Ativo.parse(
        request.body
      )
      const today = dayjs().startOf('day').toDate()

      console.log(nome, valor, tp_investimento, observacao)

      await prisma.aporte.create({
        data: {
          a_nome: nome,
          a_valor: valor,
          a_tipo: tp_investimento,
          a_observacao: observacao,
          created_at: today
        }
      })

      // Responder com sucesso
      reply.code(200).send({ success: true })
    } catch (error) {
      console.error(error)
    }
  })

  app.get('/buscaAtivos', async () => {
    try {
      //hábitos que já foram completados
      //todos os hábitos possíveis
      let dados = await prisma.aporte.findMany({
        orderBy: {
          created_at: 'asc' // ou 'desc' para ordem decrescente, se necessário
        }
      })
      console.log(dados)
      return dados
    } catch (error) {
      console.error(error)
    }
  })
}
