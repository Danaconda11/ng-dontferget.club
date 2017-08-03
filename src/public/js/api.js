export default (url, options = {}) => {
  let fetch_options = {
    method: options.method || 'GET',
    credentials: 'include',
  }
  if (options.method == 'PUT' ||
    options.method == 'POST' ||
    options.method == 'PATCH' )
  {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch_options.body = JSON.stringify(options.body)
    fetch_options.headers = headers
  }
  return fetch(`/api${url}`, fetch_options)
}
