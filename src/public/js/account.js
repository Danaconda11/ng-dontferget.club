// TODO josh: migrate to main app
let sync_wunderlist = event => {
  event.preventDefault()
  event.stopPropagation()
  let status = document.querySelector('.sync-status')
  status.hidden = false
  status.style.color = 'black'
  status.innerHTML = 'syncing...'
  let body = new FormData()
  body.set('source', 'wunderlist')
  fetch('/api/lists/import', {method: 'POST', body})
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      status.innerHTML = `Error: ${data.error}`
      status.style.color = 'red'
      return
    }
    status.innerHTML =
      `Synced ${data.sync.items} items from ${data.sync.lists} lists`
  })
  .catch(err => {
    status.innerHTML = `Error: ${err.message}`
    status.style.color = 'red'
  })
}
