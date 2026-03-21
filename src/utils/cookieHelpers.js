/**
 * 封裝設定 Cookie 的邏輯
 * @param {string} name  - Cookie 名稱
 * @param {string} value - Cookie 值
 * @param {number} days  - 有效天數
 */
export const setCookie = (name, value, days = 7) => {
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  const expires = `expires=${date.toUTCString()}`

  // 這裡就是原本會觸發 ESLint 警告的「修改外部變數」邏輯
  document.cookie = `${name}=${value};${expires};path=/`
}

/**
 * 封裝讀取 Cookie 的邏輯
 */
export const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}
