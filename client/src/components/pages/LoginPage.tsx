import { FC, useState, FormEvent } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        _id
        email
        username
        skillLevel
      }
    }
  }
`

const LoginPage: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login }) {
        localStorage.setItem('token', login.token)
        localStorage.setItem('user', JSON.stringify(login.user))
        navigate('/quiz', { replace: true })
    },
  })

  const emailRegex = /^\S+@\S+\.\S+$/
  const isEmailValid = emailRegex.test(email)
  const isPasswordValid = password.length > 0
  const canSubmit = isEmailValid && isPasswordValid

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    login({
      variables: {
        input: { email, password },
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h1 className="text-4xl mb-6 text-center">Authenticate Yourself</h1>

      <div className="flex flex-col gap-5 w-full">
        <div>
          <label htmlFor="email" className="block text-lg mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          {email && !isEmailValid && (
            <p className="text-sm text-red-500">Enter a valid email address.</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-lg mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          {!isPasswordValid && (
            <p className="text-sm text-red-500">Password cannot be empty.</p>
          )}
        </div>

        {error && <p className="text-sm text-red-500">Login failed: {error.message}</p>}

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className={`w-full border rounded px-3 py-2 uppercase cursor-pointer ${
            !canSubmit || loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </div>
    </form>
  )
}

export default LoginPage
