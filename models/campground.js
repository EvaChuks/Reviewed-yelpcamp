const mongoose = require('mongoose');
	  // Comment  = require('./comment');
const camSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	 comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

// const Campground = mongoose.model("Campground", camSchema);
module.exports = mongoose.model("Campground", camSchema);