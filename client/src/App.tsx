import './App.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const isLoggedIn = Boolean(localStorage.getItem('token'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/', { replace: true })
  }

  return (
    <div className="h-screen overflow-y-auto flex flex-col gap-8 items-center justify-start bg-gradient-to-br from-purple-50 to-blue-50">
      <div className={`flex items-center ${isLoggedIn ? 'justify-between' : 'justify-center'} gap-8 pt-6 w-7xl mx-auto`}>
        <Link className="text-5xl font-bold text-zinc-700" to="/">
          Quiz App
        </Link>
        {isLoggedIn ? (
          <div className='flex gap-5 items-center'>
            <Link
              to="/stats"
              className="text-lg uppercase px-4 py-2 border rounded-lg text-purple-700 hover:bg-purple-100 transition"
            >
              Stats
            </Link>
            <button
              onClick={handleLogout}
              className="text-lg uppercase px-4 py-2 border rounded-lg text-red-600 hover:bg-red-100 transition"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col text-zinc-800 gap-10 items-center mx-auto w-7xl bg-white shadow-lg border border-purple-100 rounded-3xl py-20 px-20">
        <Outlet />
      </div>
    </div>
  )
}

export default App
