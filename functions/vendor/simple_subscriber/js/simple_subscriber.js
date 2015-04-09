function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

jQuery(document).ready(function($){

	$("#simple_subscriber-box").submit(function(e) {
		e.preventDefault();

		var mail = $("#simple_subscriber-box input:first").val().trim();

		// validate email
		if (!validateEmail(mail)) {
			var message = $(".data-simple-subscriber .invalid").html();
			$("#simple_subscriber-box input:first").val(message).attr("default", message).css("color", "red");

			return false;
		}

		// hide save button to avoid multiple subscriptions
		$("#simple_subscriber-box input[type='submit']").hide();

		// save data
		var postData = $(this).serialize();

		$.post( "", postData ).done( function( data ) {
			var res = JSON.parse(data);

			if (res.result == "subscribed") {
				var message = $(".data-simple-subscriber .thank-you").html();
				$("#simple_subscriber-box input:first").val(message).attr("default", message).css("color", "red");

				$("#simple_subscriber-box input[type='submit']").show();
			}
		});

		return false;
	});

	// check for error/validation messages
	$("#simple_subscriber input").click(function() {
		if ($(this).val() == $(this).attr("default")) {
			var color = $("#simple_subscriber-box input[type='submit']").css("color");
			$(this).val("");
			$(this).css("color", color);
		}
	});
});