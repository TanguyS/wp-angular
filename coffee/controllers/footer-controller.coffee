
# footer controller
# ------------------------------------------------------------------------------------

sgdf.controller "footercontroller", [
	"$scope"
	"response"
	($scope, response) ->
		
		$scope.postdata = response.postdata
		$scope.imgpath = $scope.$parent.globalData.imgpath

		# console.log $scope

		return
]