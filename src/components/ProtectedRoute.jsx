import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const API_BASE = import.meta.env.VITE_API_BASE
const API_PATH = import.meta.env.VITE_API_PATH

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('anToken='))
      ?.split('=')[1]
    if (!token) {
      alert('您尚未登入，請重新登入')
      navigate('/login')
      return
    }
    axios.defaults.headers.common['Authorization'] = token

    const checkLogin = async () => {
      setIsLoading(false)
      try {
        await axios.post(`${API_BASE}/api/user/check`)
        setIsAuth(true)
      }
      catch (error) {
        alert('資料錯誤', error.response)
        navigate('/login')
      }
      finally {
        setIsLoading(true)
      }
    }
    checkLogin()
  }, [navigate])
  if (!isLoading) {
    return (
      <div className="container mt-5 text-center ">
        <h2>身分驗證中...</h2>
      </div>
    )
  }
  if (isAuth) {
    return children
  }
}

export default ProtectedRoute
