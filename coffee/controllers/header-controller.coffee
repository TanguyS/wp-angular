
# header controller
# ------------------------------------------------------------------------------------

sgdf.controller "headercontroller", [
	"$scope"
	"response"
	"$rootScope"
	"$state"
	"$window"
	($scope, response, $rootScope, $state, $window) ->
		$scope.postdata = response.postdata
		$scope.imgpath = $scope.$parent.globalData.imgpath

		# search
		changeStateIsSearch = ( state ) ->
			oldV = $scope.isSearch

			if state is "root.search"
				$scope.isSearch = true
			else
				$scope.isSearch = false

			return 

		changeStateIsSearch( $state.current.name )

		if $state.current.name is "root.search"
			$scope.searchQuery = $state.params.s
		else
			$scope.searchQuery = ""


		$rootScope.$on "$stateChangeStart", (event, toState, toParams, fromState, fromParams) ->

			changeStateIsSearch( toState.name )
		
			return

		# mobile menu
		$scope.menuMobileActive = false

		wd = angular.element( $window )
		$scope.windowW = wd.width()

		$scope.toggleActiveMobile = () ->
			$scope.menuMobileActive = !$scope.menuMobileActive

			return


		wd.bind "resize", ->
			$scope.windowW = wd.width()
			$scope.$apply()
			return


		$scope.toggleActiveitem = (item) ->
			# console.log item
			item.active = !item.active

			$scope.$apply()

			return



		return
]
