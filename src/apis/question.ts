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

export const answerTest = async (testAnswer: TestAnswer) => {
  const response = await authRequest.post('/register/questions/_answer', testAnswer)
  const data = z
    .object({
      message: z.string(),
      access: z.string(),
      refresh: z.string(),
      correct: z.boolean(),
      wrongQuestionIds: z.array(z.number())
    })
    .parse(response.data)
  const { access, refresh } = useJwtTokens()
  access.value = data.access
  refresh.value = data.refresh
  return data
}
