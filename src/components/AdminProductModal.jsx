function AdminProductModal({ productModalRef, categories, onAddImage, onRemoveImage,
  onImageChange, onModalChange, onUploadImage, isLoading, onUpdateProduct,
  modalType, temProduct, onCloseModal }) {
  return (
    <>
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        ref={productModalRef}
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content shadow">
            <div className="modal-header bg-white py-3">
              <h5 className="mb-0">
                {modalType === 'create' ? '新增' : modalType === 'edit' ? '編輯' : '刪除'}
                產品資訊
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
              </button>
            </div>
            {modalType === 'delete' ? (
              <div className="card-body p-4">
                <form>
                  <div className="mb-3">
                    <h3>
                      您確定要刪除
                      {temProduct.title}
                      嗎?
                    </h3>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={onCloseModal}
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="btn btn-danger px-4"
                      onClick={onUpdateProduct}
                    >
                      {isLoading === 'replace' ? '刪除中...' : '確認刪除'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="card-body p-4">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      產品名稱
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="請輸入標題"
                      name="title"
                      value={temProduct.title}
                      onChange={onModalChange}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="productImage" className="form-label">
                        {isLoading === 'add' ? '圖片上傳中...' : '上傳圖片'}
                      </label>
                      <input
                        key={temProduct.id || ''}
                        className="form-control"
                        type="file"
                        id="productImage"
                        onChange={onUploadImage}
                      />
                      <div className="mt-3">
                        <label htmlFor="imageUrl" className="form-label">
                          輸入圖片網址
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="imageUrl"
                          placeholder="請輸入圖片網址"
                          name="imageUrl"
                          value={temProduct.imageUrl}
                          onChange={onModalChange}
                        />
                        {temProduct.imageUrl && (
                          <img
                            className="img-fluid mt-3 object-fit-cover"
                            style={{ width: '100%', aspectRatio: '1 / 1' }}
                            src={temProduct.imageUrl}
                            alt="主圖"
                          />
                        )}

                        {temProduct.imagesUrl?.map((url, index) => {
                          return (
                            <div key={index}>
                              <label
                                htmlFor="imagesUrl"
                                className="form-label mt-3"
                              >
                                輸入更多圖片網址
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                id="imagesUrl"
                                placeholder="請輸入圖片網址"
                                name="imagesUrl"
                                value={url}
                                onChange={e => onImageChange(e, index)}
                              />
                              {url && (
                                <img
                                  className="img-fluid mt-3 object-fit-cover"
                                  style={{ width: '100%', aspectRatio: '1 / 1' }}
                                  src={url}
                                  alt="副圖"
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>

                      <div className="mt-3">
                        <button
                          type="button"
                          className="btn btn-outline-primary w-100"
                          onClick={onAddImage}
                        >
                          新增圖片
                        </button>
                      </div>
                      <div className="mt-3">
                        <button
                          type="button"
                          className="btn btn-outline-danger w-100"
                          onClick={onRemoveImage}
                        >
                          刪除圖片
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div>
                        <label htmlFor="content" className="form-label">
                          產品內容
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="content"
                          placeholder="請輸入內容"
                          name="content"
                          value={temProduct.content}
                          onChange={onModalChange}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="mt-3">
                            <label htmlFor="category" className="form-label">
                              產品類別
                            </label>
                            <select
                              type="selet-one"
                              className="form-select"
                              id="category"
                              name="category"
                              value={temProduct.category || ''}
                              onChange={onModalChange}
                            >
                              <option value="" disabled hidden>
                                請選擇類別
                              </option>
                              {categories.map((item) => {
                                return (
                                  <option value={item} key={item}>
                                    {item}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                          <div className="mt-3">
                            <label
                              htmlFor="origin_price"
                              className="form-label"
                            >
                              產品原價 (TWD)
                            </label>
                            <div className="input-group">
                              {' '}
                              <span className="input-group-text">$</span>
                              <input
                                type="number"
                                className="form-control"
                                id="origin_price"
                                name="origin_price"
                                value={temProduct.origin_price}
                                onChange={onModalChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="mt-3">
                            <label htmlFor="unit" className="form-label">
                              產品單位
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="unit"
                              placeholder="請輸入單位"
                              name="unit"
                              value={temProduct.unit}
                              onChange={onModalChange}
                            />
                          </div>
                          <div className="mt-3">
                            <label htmlFor="price" className="form-label">
                              產品售價 (TWD)
                            </label>
                            <div className="input-group">
                              {' '}
                              <span className="input-group-text">$</span>
                              <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                value={temProduct.price}
                                onChange={onModalChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          id="Check"
                          name="is_enabled"
                          value=""
                          type="checkbox"
                          checked={temProduct.is_enabled}
                          onChange={onModalChange}
                        />
                        <label className="form-check-label" htmlFor="Check">
                          是否啟用
                        </label>
                      </div>
                      <div className="mt-3">
                        <label htmlFor="description" className="form-label">
                          產品描述
                        </label>
                        <textarea
                          className="form-control"
                          id="description"
                          rows="5"
                          placeholder="這是一段關於產品的詳細介紹..."
                          name="description"
                          value={temProduct.description}
                          onChange={onModalChange}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={onCloseModal}
                    >
                      取消編輯
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-4"
                      onClick={onUpdateProduct}
                    >
                      {isLoading === 'replace' ? '儲存變更中...' : '儲存變更'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProductModal
