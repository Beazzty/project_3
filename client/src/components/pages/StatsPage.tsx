import { FC } from 'react'
import { gql, useQuery } from '@apollo/client'

type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

interface Stat {
  _id: string
  vocabId: string
  correct: boolean
  level: Level
  createdAt: string
}

interface GetStatsData {
  getStats: Stat[]
}

const GET_STATS = gql`
  query GetStats {
    getStats {
      _id
      vocabId
      correct
      level
      createdAt
    }
  }
`

const StatsPage: FC = () => {
  const { data, loading, error } = useQuery<GetStatsData>(GET_STATS, {
    fetchPolicy: 'network-only',
  })

  if (loading) return <p>Loading stats…</p>
  if (error) return <p className="text-red-500">Error: {error.message}</p>

  const stats = data?.getStats ?? []

  const grouped: Record<Level, Stat[]> = stats.reduce(
    (acc, stat) => {
      acc[stat.level].push(stat)
      return acc
    },
    {
      BEGINNER: [] as Stat[],
      INTERMEDIATE: [] as Stat[],
      ADVANCED: [] as Stat[],
    }
  )

  const levelOrder: Level[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']

  return (
    <>
      <h1 className="text-4xl mb-6 text-center">Stats Page</h1>

      {levelOrder.map(level => {
        const items = grouped[level]
        if (!items.length) return null

        return (
          <section key={level} className="mb-8 w-full">
            <h2 className="text-2xl mb-4">
              {level[0] + level.slice(1).toLowerCase()}
            </h2>
            <ul className="space-y-2">
              {items.map(stat => {
                const date = new Date(Number(stat.createdAt))
                return (
                  <li
                    key={stat._id}
                    className="flex justify-between items-center border rounded px-4 py-2"
                  >
                    <span className="font-medium">
                      {isNaN(date.getTime())
                        ? '—'
                        : date.toLocaleString()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded ${
                        stat.correct
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {stat.correct ? 'Correct' : 'Incorrect'}
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}

      {!stats.length && (
        <p className="text-center text-gray-600">
          You have no quiz attempts yet.
        </p>
      )}
    </>
  )
}

export default StatsPage
