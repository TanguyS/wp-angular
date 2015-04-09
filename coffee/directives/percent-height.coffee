sgdf.controller('percentHeightCtrl', [
  "$scope"
  "$window"
  ($scope, $window) ->
    wdw = angular.element( $window )

    # init
    if $scope.lessPx is "undefined"
      $scope.lessPx = 0

    if $scope.maxRatio is "undefined"
      $scope.maxRatio = null

    # methods
    $scope.getWindowDimensions = ->
      h: wdw.height()
      w: wdw.width()

    $scope.getHeight = (width, height) ->
      max = 0
      if $scope.maxRatio
        max = $scope.maxRatio * width

      fHeight = height * $scope.percentHeight / 100 - $scope.lessPx

      if max > 0 and fHeight > max
        fHeight = max

      fHeight


    # listen
    wdw.bind 'resize', () ->
      $scope.$apply()

])
.directive 'percentHeight', ($window) ->
  controller: "percentHeightCtrl"
  scope:
    percentHeight: "="
    lessPx: "="
    maxRatio: "="
  restrict: "A"
  link: (scope, element, attrs) ->

    resizeElement = (w, h) ->
      element.css
        height: scope.getHeight( w, h )

      return

    windowSize = scope.getWindowDimensions()

    resizeElement( windowSize.w, windowSize.h )

    scope.$watch( scope.getWindowDimensions, (newValue, oldValue) ->

      if newValue isnt oldValue
        resizeElement( newValue.w, newValue.h )

      return

    , true )

    return