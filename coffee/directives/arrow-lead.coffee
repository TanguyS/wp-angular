# Lead Arrow directive
sgdf.directive 'arrowLead', ($window, $document) ->
	template: "<img src='{{ source }}' id='{{ elemid }}' style='display: none;' alt='' />"
	scope:
		source: "@"
		delayStart: "=?"
		delayStop: "=?"
		duration: "=?"
		disappear: "=?"
		elemid: "=?"
	transclude: true
	restrict: "A"
	link: (scope, element, attrs) ->
		# init
		scope.delayStart = 1000 if typeof scope.delayStart is "undefined"
		scope.delayStop = 5000 if typeof scope.delayStop is "undefined"
		scope.duration = 1000 if typeof scope.duration is "undefined"
		scope.disappear = false if typeof scope.disappear is "undefined"
		scope.elemid = "arrowLead" if typeof scope.elemid is "undefined"

		w = angular.element( $window )

		# manipulate position
		element.css
			position: "relative"

		imgElement = element.children()

		# position image
		img = new Image()
		img.onload = () ->
			wi = if this.width > w.width() / 5 then w.width() / 5 else this.width
			hi = if this.width > w.width() / 5 then (this.height / this.width) * (w.width() / 5) else this.height

			imgElement.css
				position: "absolute"
				zIndex: 2000
				left: "50%"
				bottom: "30px"
				cursor: "pointer"
				marginLeft: -wi / 2
				marginTop: -hi / 2
				maxWidth: "20%"

			# start animation
			blink()
		
		img.src = scope.source

		imgElement.bind "click", ->
			angular.element( $document[0].body ).animate
				scrollTop: w.height()
			, scope.duration
			if scope.disappear
				imgElement.fadeOut "slow"

			return

		# blink function
		blink = () ->
			# blink element
			unless Modernizr.touch
				setTimeout (->
					imgElement.fadeIn().fadeOut().fadeIn().fadeOut().fadeIn "slow", ->
						setTimeout (->
							if scope.disappear
								imgElement.fadeOut "slow"

							return
						), scope.delayStop
						return
					return
				), scope.delayStart

			return

		return