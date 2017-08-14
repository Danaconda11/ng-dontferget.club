angular.module('lists')
.factory('api_service', ['$http', function($http) {
  return function (options = {}) {
    let fetch_options = {
      method: options.method || 'GET',
      credentials: 'include',
      url: options.url
    }
    if
    (
      options.method == 'PUT' ||
      options.method == 'PATCH' ||
      options.method == 'POST'
    ) {
      fetch_options.data = JSON.stringify(options.data)
      fetch_options.headers = {
        'Content-Type': 'application/json'
      }
    }
    return $http(fetch_options)
  }
}])
