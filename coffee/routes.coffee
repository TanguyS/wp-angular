wpng.config ($stateProvider, $urlRouterProvider) ->

  #
  # home url
  $urlRouterProvider.otherwise "/"
  
  #
  # Now set up the states
  $stateProvider
  .state('root',
    url: ''
    abstract: true
    views:
      'header':
        templateUrl: blogInfo.views + '/header.html'
        controller: 'headercontroller'
        resolve:
          response: (getData) ->
            getData.getHeader().then (data) ->
              res =
                postdata: data

              res
      'footer':
        templateUrl: blogInfo.views + '/footer.html'
        controller: 'footercontroller'
        resolve:
          response: (getData) ->
            getData.getFooter().then (data) ->
              res =
                postdata: data

              res
  ).state('root.contact',
    url: '/contact'
    views: 
      'container@': 
        templateUrl: blogInfo.views + "/contact.html"
        controller: 'contactcontroller'
        resolve:
          response: (getData, $stateParams) ->
            getData.getContact().then (data) ->
              res =
                postdata: data

              res
  )
  
  return
