import { Test, TestAnswer, TestSchema } from '@/types/question'
import { authRequest } from './request'
import { z } from 'zod'
import { useJwtTokens } from '@/composables/jwtToken'

export const getTest = async (version?: number): Promise<Test> => {
  const response = await authRequest.get('/register/questions', {
    params: {
      version: version
    }
  })
  return TestSchema.parse(response.data)
}

export const submitTestAnswer = async (testAnswer: TestAnswer) => {
  const response = await authRequest.post('/register/questions/_answer', testAnswer)
  const data = z
    .discriminatedUnion('correct', [
      z.object({
        correct: z.literal(true),
        access: z.string(),
        refresh: z.string(),
        message: z.string()
      }),
      z.object({
        correct: z.literal(false),
        message: z.string(),
        wrongQuestionIds: z.array(z.number().int())
      })
    ])
    .transform((data) => {
      if (data.correct) {
        return {
          wrongQuestionIds: [],
          ...data
        }
      }
      return data
    })
    .parse(response.data)
  if (data.correct) {
    const { access, refresh } = useJwtTokens()
    access.value = data.access
    refresh.value = data.refresh
  }
  return data
}
