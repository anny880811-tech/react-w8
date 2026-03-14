import Loading from './Loading'

function CartForm({ handleSubmit, onSubmit, register, errors, isLoading, cartItem }) {
  return (
    <>
      <div className="cart-form">
        <h3>填寫訂單資訊</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="userName" className="required">
              訂購人姓名
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              placeholder="請輸入訂購人姓名"
              {...register('userName', {
                required: '訂購人姓名為必填',
                minLength: { value: 2, message: '姓名至少 2 個字' },
              })}
            />
            <span className="error-message">
              {errors.userName ? errors.userName.message : ''}
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="required">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="請輸入電子郵件"
              {...register('email', {
                required: '電子郵件為必填',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '請輸入有效的 Email 格式',
                },
              })}
            />
            <span className="error-message">
              {errors.email ? errors.email.message : ''}
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="tel" className="required">
              訂購人電話
            </label>
            <input
              type="tel"
              className="form-control"
              id="tel"
              placeholder="請輸入手機號碼"
              {...register('tel', {
                required: '手機號碼為必填',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: '手機號碼格式錯誤',
                },
              })}
            />
            <span className="error-message">
              {errors.tel ? errors.tel.message : ''}
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="address" className="required">
              訂購人地址
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="請輸入地址"
              {...register('address', {
                required: '訂購人地址為必填',
              })}
            />
            <span className="error-message">
              {errors.address ? errors.address.message : ''}
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="message">留言</label>
            <textarea
              type="text"
              className="form-control"
              id="message"
              placeholder="有想對我們說的話嗎?"
              {...register('message')}
            />
          </div>
          <button
            type="submit"
            className="btn-brown"
            disabled={isLoading !== '' || cartItem.length === 0}
          >
            {isLoading === 'loading-submit'
              ? (
                <div className="custom-loading">
                  <Loading height={30} width={30} />
                  <span className="ms-2">訂單送出中...</span>
                </div>
              )
              : (
                '送出訂單'
              )}
          </button>
        </form>
      </div>
    </>
  )
}

export default CartForm
