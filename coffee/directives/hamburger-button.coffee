sgdf.directive 'hamburgerButton', ($timeout) ->
	restrict: "A"
	link: (scope, element, attrs) ->
		animateButton = () ->
			pad = "7px"
			padExt = "8px"

			# animate bars
			if scope.menuMobileActive
				element.children(".icon-bar").css
					webkitTransition:"transform 1s"
					transition: 'transform 1s'

				element.children(".icon-bar:first").css
					msTransform: "translate(0px,#{pad})"
					mozTransform: "translate(0px,#{pad})"
					webkitTransform: "translate(0px,#{pad})"
					transform: "translate(0px,#{pad})"

				$timeout( ->
					element.children(".icon-bar:first").css
						msTransform: "translate(0px,#{padExt}) rotate(45deg)"
						mozTransform: "translate(0px,#{padExt}) rotate(45deg)"
						webkitTransform: "translate(0px,#{padExt}) rotate(45deg)"
						transform: "translate(0px,#{padExt}) rotate(45deg)"

					return

				, 1000)

				element.children(".icon-bar:last").css
					msTransform: "translate(0px,-#{pad})"
					mozTransform: "translate(0px,-#{pad})"
					webkitTransform: "translate(0px,-#{pad})"
					transform: "translate(0px,-#{pad})"

				$timeout( ->
					element.children(".icon-bar").first().next().css
						opacity: 0

					element.children(".icon-bar:last").css
						msTransform: "translate(0px,-#{padExt}) rotate(-45deg)"
						mozTransform: "translate(0px,-#{padExt}) rotate(-45deg)"
						webkitTransform: "translate(0px,-#{padExt}) rotate(-45deg)"
						transform: "translate(0px,-#{padExt}) rotate(-45deg)"

					return
					
				, 1000)

			else
				element.children(".icon-bar:first").css
					msTransform: "translate(0px,#{padExt}) rotate(0deg)"
					mozTransform: "translate(0px,#{padExt}) rotate(0deg)"
					webkitTransform: "translate(0px,#{padExt}) rotate(0deg)"
					transform: "translate(0px,#{padExt}) rotate(0deg)"

				element.children(".icon-bar:last").css
					msTransform: "translate(0px,-#{padExt}) rotate(0deg)"
					mozTransform: "translate(0px,-#{padExt}) rotate(0deg)"
					webkitTransform: "translate(0px,-#{padExt}) rotate(0deg)"
					transform: "translate(0px,-#{padExt}) rotate(0deg)"


				$timeout( ->
					element.children(".icon-bar:first").css
						msTransform: "translate(0px,0px) rotate(0deg)"
						mozTransform: "translate(0px,0px) rotate(0deg)"
						webkitTransform: "translate(0px,0px) rotate(0deg)"
						transform: "translate(0px,0px) rotate(0deg)"

					element.children(".icon-bar").first().next().css
							opacity: 1

					element.children(".icon-bar:last").css
						msTransform: "translate(0px,0px) rotate(0deg)"
						mozTransform: "translate(0px,0px) rotate(0deg)"
						webkitTransform: "translate(0px,0px) rotate(0deg)"
						transform: "translate(0px,0px) rotate(0deg)"
				, 1000)

			return


		scope.$watch( 'menuMobileActive', (newValue, oldValue) ->
			animateButton()
		)

		return
