import Loading from './Loading'

function CartTable({ cartItem, onUpdateCartItem, isLoading, onOpenModal }) {
  return (
    <>
      <table className="custom-cart-table d-none d-md-table">
        <thead>
          <tr>
            <th scope="col">
              <h5>商品明細</h5>
            </th>
            <th scope="col">
              <h5 className="text-center">數量</h5>
            </th>
            <th scope="col">
              <h5 className="text-center">合計</h5>
            </th>
            <th scope="col">
              <h5 className="text-center">刪除</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItem.map((product) => {
            return (
              <tr key={product.product.id}>
                <td className="d-flex align-items-center py-3">
                  <img
                    src={product.product.imageUrl}
                    style={{ height: '150px', width: '150px', objectFit: 'cover', borderRadius: '8px' }}
                    className="d-flex"
                    alt="商品圖"
                  />
                  <div className="ms-5">
                    <div className="fw-bold">
                      <h3>{product.product.title}</h3>
                    </div>
                    <div className="small text-muted">
                      {product.product.content}
                    </div>
                    <div className="mt-2 text-danger">
                      NT$
                      {product.product.price}
                      {' '}
                      元
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="d-flex justify-content-center">
                    <div
                      className="input-group"
                      style={{ width: '120px' }}
                    >
                      <button
                        type="button"
                        className="btn btn-outline-brown-sm"
                        onClick={() => { onUpdateCartItem(product.id, product.product.id, product.qty - 1, 'reduce') }}
                        disabled={product.qty <= 1 || isLoading === `${product.id}-reduce`}
                      >
                        {isLoading === `${product.id}-reduce` ? (<Loading height={20} width={20} />) : ('-')}
                      </button>

                      <input
                        type="text"
                        className="form-control text-center border-secondary"
                        value={product.qty}
                        readOnly
                      />
                      <button
                        type="button"
                        className="btn btn-outline-brown-sm"
                        onClick={() => { onUpdateCartItem(product.id, product.product.id, product.qty + 1, 'add') }}
                        disabled={isLoading === `${product.id}-add`}
                      >
                        {isLoading === `${product.id}-add` ? (<Loading height={20} width={20} />) : ('+')}
                      </button>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="d-flex justify-content-center">
                    <h5>
                      {product.product.price * product.qty}
                      元
                    </h5>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="d-flex justify-content-center">
                    <i
                      className="bi bi-trash3-fill"
                      onClick={() => { onOpenModal(product.id) }}
                    >
                    </i>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default CartTable
