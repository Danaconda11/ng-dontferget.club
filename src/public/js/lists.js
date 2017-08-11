angular.module('lists', ['api_module'])
.controller('listsController', ['api_service', function(api_service) {
  this.value = "Welcome"
  api_service('/api/todos').then(res => {
    this.todos = res.data
    console.log(this.todos)
  }).catch(e => {
    console.log(e);
  })
}])
