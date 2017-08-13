angular.module('lists', ['api_module'])
.controller('listsController', ['api_service', function(api_service) {
  this.value = "Welcome"
  api_service({url: '/api/todos'}).then(res => {
    this.todos = res.data
    console.log(this.todos)
  }).catch(e => {
    console.log(e);
  })
}])
.controller('todoController', ['api_service', '$scope', function(api_service, $scope) {
  $scope.add_todo = function() {
    $scope.text = this.text
    console.log($scope.text);
    api_service({
      url: 'api/todos',
      method: 'POST',
      data: {title: $scope.text}
    }).then(res => {
      console.log('inserted');
    }).catch(e => {
      console.log(e);
    })
  }
}])
