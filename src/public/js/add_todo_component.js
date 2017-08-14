angular.module('lists')
.component('todoForm', {
  templateUrl: '/views/todos_form.html',
  controller: add_todo,
  binding: {
    add_todo: '&'
  }
})
function add_todo(api_service) {
  let input_text = this.text
  api_service({
    url: 'api/todos',
    method: 'POST',
    data: {title: input_text}
  }).then(res => {
    console.log('inserted');
  }).catch(e => {
    console.log(e);
  })
}
