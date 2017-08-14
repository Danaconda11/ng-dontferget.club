angular.module('lists')
.component('todoForm', {
  templateUrl: '/views/todos_form.html',
  controller: add_todo_ctrl
})
function add_todo_ctrl(api_service) {
  this.submit = function() {
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
}
