var api_module = angular.module('api_module', [])
api_module.factory('api_service', ['$http', function($http) {
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
    console.log(fetch_options);
    return $http(fetch_options)
  }
}])
