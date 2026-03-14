function AboutSkeleton() {
  return (
    <>
      <div className="container mt-5 text-center">
        {/* 標題：關於律境 */}
        <div className="skeleton-box mx-auto mb-4" style={{ width: '180px', height: '40px' }}></div>

        {/* Intro Box 模擬 (對齊 border-radius: 5rem) */}
        <div className="about-intro-box mt-4 mb-3 shadow border-0 d-flex flex-column align-items-center justify-content-center">
          <div className="skeleton-box mb-3 w-75" style={{ height: '20px' }}></div>
          <div className="skeleton-box mb-3 w-50" style={{ height: '20px' }}></div>
          <div className="skeleton-box mb-4 w-25" style={{ height: '20px' }}></div>
          <div className="skeleton-box mb-3 w-50" style={{ height: '20px' }}></div>
          <div className="skeleton-box mb-4 w-25" style={{ height: '20px' }}></div>
          <br />
          <div className="skeleton-box mb-3 w-60" style={{ height: '20px' }}></div>
          <div className="skeleton-box mb-3 w-40" style={{ height: '20px' }}></div>
        </div>

        {/* Q&A 區塊 */}
        <div className="mt-5">
          <div className="skeleton-box mx-auto mb-4" style={{ width: '120px', height: '40px' }}></div>

          {/* Accordion 模擬 (對齊 custom-accordion) */}
          <div className="accordion custom-accordion shadow">
            {[1, 2, 3].map(i => (
              <div className="accordion-item" key={i}>
                <div className="accordion-header p-3 d-flex align-items-center">
                  <div className="skeleton-box w-100" style={{ height: '2.5rem' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EnvironmentSection 模擬 */}
        <div className="mt-5">
          <div className="skeleton-box mx-auto mb-4" style={{ width: '150px', height: '40px' }}></div>
          <div className="responsive-container shadow">
            <div className="skeleton-box w-100 h-100"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutSkeleton
