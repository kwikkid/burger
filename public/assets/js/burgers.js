$(function() {
	$("#add").on("click", function(event) {
		event.preventDefault();
		console.log("hello");
		var newBurger = {
			name: $("#name").val()
		};
		console.log(newBurger.name);
		//Send the POST request.
		$.ajax("/api/burgers", {
			type: "POST",
			data: newBurger
		}).then(function() {
			//this console log isn't working..//
			console.log("added new burger...waiting to be devoured");
			//reload the page to get the updated list
			location.reload();
		});
	});
	$(".devour").on("click", function(event) {
		console.log("clicked");
		var id = $(this).data("id");

		console.log("Clicked id" + id);
		$.ajax("/api/burgers/" + id, {
			type: "PUT",
			data: {
				devoured: true
			}
		}).then(function(data) {
			console.log(data);
			console.log("this worked");
			location.reload();
		});
	});
});
