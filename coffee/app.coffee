# initialize the app
wpng = angular.module("wpng", [ 'ui.router', 'ngAnimate', 'ui.bootstrap', 'infinite-scroll','angularFileUpload', 'masonry', 'angularjs.media.directives' ])

# set the configuration
wpng.run [
  "$rootScope"
  ($rootScope) ->
    
    # the following data is fetched from the JavaScript variables created by wp_localize_script(), and stored in the Angular rootScope
    $rootScope.globalData = 
      views: blogInfo.views
      site: blogInfo.site
      imgpath: blogInfo.img
      api: blogInfo.api

]

wpng.filter "to_html_safe", [
  "$sce"
  ($sce) ->
    return (text) ->
      $sce.trustAsHtml text
]

wpng.filter 'getById', ->
  (input, id) ->
    i = 0
    len = input.length
    while i < len
      if +input[i].id == +id
        return input[i]
      i++
    null

wpng.filter 'range', ->
  (input, total) ->
    total = parseInt(total)
    i = 0
    while i < total
      input.push i
      i++
    input