sgdf.factory "getData", ($http) ->

  # general parts
  getHeader: ->
    #since $http.get returns a promise,
    #and promise.then() also returns a promise
    #that resolves to whatever value is returned in it's 
    #callback argument, we can return that.
    $http(
      url: blogInfo.api + 'get_header/'
    ).then (result) ->
      result.data

  getFooter: ->
    $http(
      url: blogInfo.api + 'get_footer/'
    ).then (result) ->
      result.data