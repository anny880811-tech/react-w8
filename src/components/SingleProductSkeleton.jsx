function SingleProductSkeleton() {
  return (
    <>
      <div className="container mt-3">
        {/* 返回按鈕骨架 */}
        <div
          className="skeleton-line"
          style={{ width: '150px', height: '20px', borderRadius: '4px' }}
        >
        </div>

        <div className="row gx-lg-5 gy-4 mt-2">
          {/* 左側圖片區骨架 */}
          <div className="col-12 col-lg-4">
            {/* 主圖 */}
            <div
              className="skeleton-main-img"
              style={{ width: '100%', aspectRatio: '1/1', borderRadius: '8px' }}
            >
            </div>

            {/* 縮圖區域：修改為 3 張 */}
            <div className="d-flex gap-2 mt-3" style={{ overflow: 'hidden' }}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="skeleton-thumb"
                  style={{
                    width: '90px',
                    height: '90px',
                    flexShrink: 0,
                    borderRadius: '4px',
                  }}
                >
                </div>
              ))}
            </div>
          </div>

          {/* 右側資訊區骨架 */}
          <div className="col-12 col-lg-8">
            <div
              className="skeleton-line mb-3"
              style={{ height: '40px', width: '70%', borderRadius: '4px' }}
            >
            </div>
            {' '}
            {/* 標題 */}
            <div
              className="skeleton-line mb-4"
              style={{ height: '35px', width: '20%', borderRadius: '20px' }}
            >
            </div>
            {' '}
            {/* 分類按鈕 */}
            {/* 內容與描述 */}
            <div
              className="skeleton-line mb-2"
              style={{ height: '20px', width: '100%', borderRadius: '4px' }}
            >
            </div>
            <div
              className="skeleton-line mb-2"
              style={{ height: '20px', width: '90%', borderRadius: '4px' }}
            >
            </div>
            <div
              className="skeleton-line mb-5"
              style={{ height: '20px', width: '60%', borderRadius: '4px' }}
            >
            </div>
            {/* 價格區 */}
            <div className="d-flex gap-3 align-items-end mb-4">
              <div
                className="skeleton-line"
                style={{ height: '40px', width: '150px', borderRadius: '4px' }}
              >
              </div>
              <div
                className="skeleton-line"
                style={{ height: '25px', width: '100px', borderRadius: '4px' }}
              >
              </div>
            </div>
            {/* 數量選擇與按鈕 */}
            <div
              className="skeleton-line mb-3"
              style={{ height: '35px', width: '120px', borderRadius: '4px' }}
            >
            </div>
            <div
              className="skeleton-line"
              style={{ height: '50px', width: '100%', borderRadius: '4px' }}
            >
            </div>
          </div>
        </div>

        {/* 推薦區骨架 */}
        <div className="mt-5">
          <div
            className="skeleton-line mx-auto mb-4"
            style={{ height: '30px', width: '150px', borderRadius: '4px' }}
          >
          </div>
          <div className="row">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="col-md-4 mb-3">
                <div
                  className="skeleton-card-img"
                  style={{ height: '200px', borderRadius: '8px' }}
                >
                </div>
                <div
                  className="skeleton-line mt-3 mx-auto"
                  style={{ height: '20px', width: '70%', borderRadius: '4px' }}
                >
                </div>
                <div
                  className="skeleton-line mt-3"
                  style={{ height: '35px', width: '100%', borderRadius: '4px' }}
                >
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleProductSkeleton
