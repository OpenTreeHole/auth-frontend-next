import { z } from 'zod'

export const QuestionSchema = z.object({
  analysis: z.string().optional(),
  answer: z.array(z.string()).optional().default([]),
  status: z.enum(['blank', 'answered', 'correct', 'wrong']).optional().default('blank'),
  group: z.enum(['optional', 'required']),
  id: z.number().int(),
  options: z.array(z.string()).min(1),
  question: z.string(),
  type: z.enum(['single-selection', 'true-or-false', 'multi-selection'])
})

export const TestSchema = z
  .object({
    questions: z.array(QuestionSchema).min(1),
    spec: z.object({
      inOrder: z.boolean(),
      numberOfQuestions: z.number().int().min(-1)
    }),
    version: z.number().int()
  })
  .refine(
    (test) => test.questions.length === test.spec.numberOfQuestions,
    "The number of questions doesn't match the spec."
  )

export const QuestionAnswerSchema = QuestionSchema.pick({
  id: true,
  answer: true
}).required()

export const TestAnswerSchema = z.object({
  answers: z
    .array(QuestionAnswerSchema)
    .refine(
      (answers) => answers.every((answer) => answer.answer.length > 0),
      'Question answers must not be empty.'
    ),
  version: z.number().int()
})

export type Question = z.infer<typeof QuestionSchema>
export type Test = z.infer<typeof TestSchema>
export type QuestionAnswer = z.infer<typeof QuestionAnswerSchema>
export type TestAnswer = z.infer<typeof TestAnswerSchema>
