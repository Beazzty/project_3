import { FC, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

interface Flashcard {
  _id: string
  word: string
  translation: string
  options: string[]
}

interface FlashcardsByLevelData {
  flashcardsByLevel: Flashcard[]
}
interface FlashcardsByLevelVars {
  level: Level
}

interface SaveStatData {
  saveStat: {
    _id: string
    vocabId: string
    correct: boolean
  }
}
interface SaveStatVars {
  input: {
    vocabId: string
    correct: boolean
  }
}

const FLASHCARDS_BY_LEVEL = gql`
  query FlashcardsByLevel($level: Level!) {
    flashcardsByLevel(level: $level) {
      _id
      word
      translation
      options
    }
  }
`

const SAVE_STAT = gql`
  mutation SaveStat($input: SaveStatInput!) {
    saveStat(input: $input) {
      _id
      vocabId
      correct
    }
  }
`

const QuizPage: FC = () => {
  const navigate = useNavigate()

  const storedUser = localStorage.getItem('user')
  const level: Level = storedUser
    ? JSON.parse(storedUser).skillLevel
    : 'BEGINNER'

  const { data, loading, error } = useQuery<
    FlashcardsByLevelData,
    FlashcardsByLevelVars
  >(FLASHCARDS_BY_LEVEL, {
    variables: { level },
    fetchPolicy: 'network-only',
  })

  const [saveStat] = useMutation<SaveStatData, SaveStatVars>(SAVE_STAT)

  // quiz state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [score, setScore] = useState(0)

  if (loading) return <p>Loading quiz…</p>
  if (error) return <p>Error loading quiz: {error.message}</p>

  const flashcards = data?.flashcardsByLevel || []
  if (!flashcards.length)
    return <p>No flashcards available for level {level}.</p>

  if (currentIndex >= flashcards.length) {
    return (
      <div className="text-center">
        <h2 className="text-3xl mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-6">
          You got {score} out of {flashcards.length} correct.
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0)
            setScore(0)
            setSelected(null)
          }}
          className="border rounded px-6 py-2 uppercase cursor-pointer"
        >
          Restart Quiz
        </button>
        <button
          onClick={() => navigate('/stats')}
          className="ml-4 border rounded px-6 py-2 uppercase cursor-pointer"
        >
          Show Stats
        </button>
      </div>
    )
  }

  const current = flashcards[currentIndex]

  const handleSubmit = async () => {
    if (selected === null) return

    const correct = selected === current.translation
    if (correct) setScore((p) => p + 1)

    setIsSubmitting(true)
    try {
      await saveStat({
        variables: {
          input: {
            vocabId: current._id,
            correct,
          },
        },
      })
    } catch (e) {
      console.error('Failed to save stat', e)
    }
    setIsSubmitting(false)

    setSelected(null)
    setCurrentIndex((p) => p + 1)
  }

  return (
    <>
      <h1 className="text-4xl mb-6 text-center">Quiz ({level})</h1>
      <div className="flex flex-col gap-5 w-full">
        <div className="text-xl">Spanish: {current.word}</div>
        <div className="grid grid-cols-2 gap-4">
          {current.options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`border-2 p-3 rounded-lg text-lg text-center transition cursor-pointer ${
                selected === option
                  ? 'border-blue-500'
                  : 'border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={selected === null || isSubmitting}
        className={`mt-6 w-full border rounded px-3 py-2 uppercase transition cursor-pointer ${
          selected === null || isSubmitting
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
      >
        {isSubmitting ? 'Submitting…' : 'Submit Answer'}
      </button>
    </>
  )
}

export default QuizPage
