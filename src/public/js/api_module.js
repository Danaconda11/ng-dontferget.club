var api_module = angular.module('api_module', [])
api_module.factory('api_service', ['$http', function($http) {
  return function (url, options = {}) {
    let fetch_options = {
      method: options.method || 'GET',
      credentials: 'include',
      url: url
    }
    if
    (
      options.method == 'PUT' ||
      options.method == 'PATCH' ||
      options.method == 'POST'
    ) {
      let headers = new Headers()
      headers.append('Content-Type', 'application/json')
      fetch_options.body = JSON.stringify(options.body)
      fetch_options.headers = headers
    }
    return $http(fetch_options)
  }
}])
