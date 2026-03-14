function CartList({ cartItem, onDeleteCartItem, onUpdateCartItem, isLoading }) {
  return (
    <>
      {/* 加上 d-md-none 表示「在 768px 以上的中大型螢幕隱藏」 */}
      <div className="cart-mobile-list d-md-none">
        {cartItem.map(product => (
          <div
            key={product.id}
            className="card mb-3 p-3 border-0 border-bottom"
          >
            <div className="d-flex align-items-center mb-3">
              <img
                src={product.product.imageUrl}
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                alt="商品圖"
              />
              <div className="ms-3 flex-grow-1">
                <div className="fw-bold">{product.product.title}</div>
                <div className="text-danger small">
                  NT$
                  {product.product.price}
                </div>
              </div>
              <i
                className="bi bi-trash3-fill text-muted"
                onClick={() => onDeleteCartItem(product.id)}
              >
              </i>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div
                className="input-group input-group-sm"
                style={{ width: '100px' }}
              >
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() =>
                    onUpdateCartItem(product.id, product.product.id, product.qty - 1, 'reduce')}
                  disabled={product.qty <= 1 || isLoading === `${product.id}-reduce`}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center bg-white"
                  value={product.qty}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => onUpdateCartItem(product.id, product.product.id, product.qty + 1, 'add')}
                  disabled={isLoading === `${product.id}-add`}
                >
                  +
                </button>
              </div>
              <div className="fw-bold">
                小計:
                {' '}
                {product.product.price * product.qty}
                元
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CartList
