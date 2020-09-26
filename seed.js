const mongoose     = require('mongoose'),
	  Campground   = require('./models/campground'),
	  Comment      = require('./models/comment');
      

var data =[
	{
		name: "Diva Dove",
		image: "https://cdn.pixabay.com/photo/2017/07/18/18/24/dove-2516641__340.jpg",
		description: "Diva Dove are found in the mountians of Africa"
	},
	{
		name: "KingFisher",
		image: "https://cdn.pixabay.com/photo/2018/08/12/16/59/ara-3601194__340.jpg",
		description: "KingFisher is found in Beer bottle"
	},
	{
		name: "Nza Bird ",
		image: "https://cdn.pixabay.com/photo/2011/09/27/18/52/sparrow-9950__340.jpg",
		description: "Nza is found in the mountians of India"
	}
];
async function seedDb(){
	await Campground.remove({});
	await Comment.remove({});
	for(const seed of data){
		let campground = await Campground.create(seed);
		console.log("new seeds added");
		let comment = await Comment.create({
			text: "These Birds are lovely",
			author: "Chuks"
		});
		campground.comments.push(comment);
		campground.save();
		console.log("comments added to campground")
		
	}
	
}


module.exports = seedDb;