function AdminQaModal({ modalRef, modalType, temQuestion, onHandleInputChange, catgories, onHandleAddQuestion, closeModal }) {
  return (
    <>
      {' '}
      <div className="modal" tabIndex="-1" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {modalType === 'edit' ? '編輯' : modalType === 'delete' ? '刪除' : '新增'}
                問答
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
              </button>
            </div>
            <div className="modal-body">
              {modalType === 'delete' ? (`確定要刪除此問答嗎?`) : (
                <>
                  <div>
                    <label htmlFor="title">問題</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={temQuestion.title}
                      className="form-control mt-1 mb-2"
                      onChange={onHandleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="description">回覆</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={temQuestion.description}
                      className="form-control mt-1 mb-2"
                      onChange={onHandleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="tag">類別</label>
                    <select
                      type="selet-one"
                      id="tag"
                      name="tag"
                      value={temQuestion.tag || ''}
                      className="form-select mt-1 mb-2"
                      onChange={onHandleInputChange}
                    >
                      <option value="" disabled hidden>
                        請選擇類別
                      </option>
                      {catgories.map((item) => {
                        return (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="isPublic"
                      name="isPublic"
                      checked={temQuestion.isPublic}
                      className="form-check-input mt-1 mb-2 me-2"
                      onChange={onHandleInputChange}
                    />
                    <label
                      htmlFor="isPublic"
                      typeof="check"
                      className="form-check-label"
                    >
                      是否啟用
                    </label>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onHandleAddQuestion()
                  closeModal()
                }}
              >
                確認
                {modalType === 'edit' ? '編輯' : modalType === 'delete' ? '刪除' : '新增'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminQaModal
