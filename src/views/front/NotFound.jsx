import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import notFound from '../../assets/404.png'

const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/product')
    }, 2000)
    return () => clearTimeout(redirectTimer)
  }, [navigate])

  return (
    <>
      <div className="container pt-0 pt-md-5">
        <div className="row">
          <div className="col-md-6 text-center text-md-start ps-md-5">
            <img
              src={notFound}
              alt="404"
              className="img-fluid"
              style={{ height: '500px', objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-6 ms-5 ms-md-0 pt-0 pt-md-5 mt-md-5">
            <div
              className="display-1 fw-bold mt-md-2"
              style={{
                color: 'rgb(109, 77, 67)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              404
            </div>
            <h2 className="mt-1">NOT FOUND</h2>
            <h2>抱歉! 此頁面不存在</h2>
            <p className="mt-3 text-secondary">即將在 2 秒後自動為您跳轉...</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
