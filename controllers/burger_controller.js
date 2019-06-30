var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

router.get("/index", function(req, res) {
	burger.selectAll(function(data) {
		//create a handle bars object which stores the data into an object
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject);
		console.log("handlebars");
		//you would add handle bars object here after "index"//
		res.render("index", hbsObject);
	});
});
router.post("/api/burgers", function(req, res) {
	burger.insertOne("name", [req.body.name], function(result) {
		var hbsObject = {
			burgers: result
		};
		res.render("index", hbsObject);
		//how do I display the new burger?//
	});
});

router.put("/api/burgers/:id", function(req, res) {
	var condition = "id = " + req.params.id;
	console.log("condition", condition);
	burger.updateOne(
		{
			devoured: true
		},
		condition,
		function(result) {
			console.log(result);
			if (result.changedRows == 0) {
				console.log("no rows updated");
				// return res.status(404).end();
			} else {
				console.log("redirect");
				res.status(200).end();
			}
		}
	);
});

module.exports = router;
