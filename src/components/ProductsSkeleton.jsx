function ProductsSkeleton() {
  return (
    <>
      <div className="container mt-2 mt-md-4">
        <nav className="category-nav" style={{ minHeight: '42px' }}>
          <ul className="category-nav__list">
            {[1, 2, 3, 4, 5].map(i => (
              <li className="category-nav__item" key={i}>
                <div className="category-nav__spacer" style={{ width: '60px', height: '20px' }}></div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container mt-1 mt-md-3">
        <div className="row align-items-center justify-content-between" style={{ minHeight: '56px' }}>
          <div className="col-auto">
            <div style={{ height: '32px', width: '120px' }}></div>
          </div>
          <div className="col-md-3 ms-auto mb-3 search-container-right">
            <div className="search-form mt-3">
              <div className="search-input-group">
                <div style={{ height: '38px', width: '100%', backgroundColor: 'transparent' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-2">
        <div className="row gx-3 gy-5">
          {Array.from({ length: 6 }, (_, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="skeleton-card">
                <div className="skeleton-img"></div>
                <div className="skeleton-body">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-btn-group">
                    <div className="skeleton-btn"></div>
                    <div className="skeleton-btn"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProductsSkeleton
