function FaqSkeleton() {
  return (
    <>
      <div className="container">
        <div className="mt-5">
          <div className="skeleton-box mx-auto mb-4" style={{ width: '180px', height: '40px' }}></div>
        </div>
        <div className="mt-5">
          <div className="accordion custom-accordion shadow">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <div className="accordion-item" key={i}>
                <div className="accordion-header p-3 d-flex align-items-center">
                  <div className="skeleton-box w-100" style={{ height: '2.5rem' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default FaqSkeleton
