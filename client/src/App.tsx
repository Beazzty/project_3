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

  const handleHomeClick = () => {
    navigate('/select')
  }

  return (
    <div className="min-h-screen overflow-y-auto flex flex-col gap-8 items-center justify-start bg-gradient-to-br from-[#E8F5E9] via-white to-[#C4A777]">
      <div className={`flex items-center ${isLoggedIn ? 'justify-between' : 'justify-center'} gap-8 pt-6 w-full max-w-7xl mx-auto px-4`}>
        <Link 
          className="text-5xl font-bold bg-gradient-to-r from-[#006847] via-[#C4A777] to-[#CE1126] bg-clip-text text-transparent hover:scale-105 transition-transform duration-300" 
          to="/"
        >
          VIVA VOCAB
        </Link>
        {isLoggedIn ? (
          <div className='flex gap-5 items-center'>
            <button
              onClick={handleHomeClick}
              className="text-lg uppercase px-6 py-2 rounded-lg bg-gradient-to-r from-[#C4A777] to-[#FFD700] text-[#004225] hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
            >
              Home
            </button>
            <Link
              to="/stats"
              className="text-lg uppercase px-6 py-2 rounded-lg bg-gradient-to-r from-[#006847] to-[#004225] text-white hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
            >
              Stats
            </Link>
            <button
              onClick={handleLogout}
              className="text-lg uppercase px-6 py-2 rounded-lg bg-gradient-to-r from-[#CE1126] to-[#a30d1e] text-white hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-10 items-center mx-auto w-full max-w-7xl bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-[#006847]/10 rounded-3xl py-12 px-8 md:px-20 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#006847] via-[#C4A777] to-[#CE1126]"></div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
