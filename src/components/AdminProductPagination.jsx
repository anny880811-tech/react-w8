function AdminProductPagination({ pagination, getProducts }) {
  return (
    <>
      <div className="mt-3">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li
              className={`page-item ${!pagination.has_pre ? 'disabled' : ''}`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (pagination.has_pre) {
                    getProducts(pagination.current_page - 1)
                  }
                }}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {Array.from(
              { length: pagination.total_pages },
              (_, i) => i + 1,
            ).map((page) => {
              return (
                <li className={`page-item ${page === pagination.current_page ? 'active disabled' : ''}`} key={page}>
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (page === pagination.current_page) {
                        return
                      }
                      getProducts(page)
                    }}
                  >
                    {page}
                  </a>
                </li>
              )
            })}
            <li className={`page-item ${!pagination.has_next ? 'disabled' : ''}`}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (pagination.has_next) {
                    getProducts(pagination.current_page + 1)
                  }
                }}
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
export default AdminProductPagination
