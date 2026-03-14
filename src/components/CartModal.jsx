function CartModal({ modalRef, onCloseModal, tempId, onDeleteAllCartItem, onDeleteCartItem }) {
  return (
    <>
      <div className="modal" tabIndex="-1" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">刪除</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onCloseModal}
              >
              </button>
            </div>
            <div className="modal-body">
              <p>
                確定要刪除
                {tempId === 'all' ? '所有' : '此'}
                產品嗎
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onCloseModal}
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  onCloseModal()
                  { tempId === 'all' ? onDeleteAllCartItem() : onDeleteCartItem(tempId) }
                }}
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartModal
