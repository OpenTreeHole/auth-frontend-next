import { z } from 'zod'

export const QuestionSchema = z.object({
  analysis: z.string().optional(),
  answer: z.array(z.string()).min(1).optional(),
  group: z.enum(['optional', 'required']),
  id: z.number().int(),
  options: z.array(z.string()).min(1),
  question: z.string(),
  type: z.enum(['single-selection', 'true-or-false', 'multi-selection'])
})

export const TestSchema = z.object({
  questions: z.array(QuestionSchema),
  spec: z.object({
    inOrder: z.boolean(),
    numberOfQuestions: z.number().int().min(-1)
  }),
  version: z.number().int()
})

export const QuestionAnswerSchema = QuestionSchema.pick({
  id: true,
  answer: true
}).required()

export const TestAnswerSchema = z.object({
  answers: z.array(QuestionAnswerSchema),
  version: z.number().int()
})

export type Question = z.infer<typeof QuestionSchema>
export type Test = z.infer<typeof TestSchema>
export type QuestionAnswer = z.infer<typeof QuestionAnswerSchema>
export type TestAnswer = z.infer<typeof TestAnswerSchema>
