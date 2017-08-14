angular.module('lists',[])
.component('todosList', {
  templateUrl: '/views/todos_list.html',
  controller: todoController
})
function todoController(api_service) {
  this.$onInit = function () {
    api_service({url: '/api/todos'}).then(res => {
      this.todos = res.data
    }).catch(e => {
      console.log(e);
    })
  }
}
