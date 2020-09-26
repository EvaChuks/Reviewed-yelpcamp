const bodyParser  = require('body-parser'),
      express     = require('express'),
      app         = express(),
      mongoose    = require('mongoose'),
      Campground  = require('./models/campground'),
	  Comment     = require('./models/comment'),
      seedDB      = require('./seed');

seedDB();
mongoose.connect('mongodb://localhost:27017/camp_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


// App Set Config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


// Routes
// Landing Page
app.get("/", function(req, res){
	res.render("landing");
});

// Index route
app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCamps){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds:allCamps});
			
		}
	})
	
	
});
// New Route for Form
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
});
//Create Route
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image= req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name, image:image, description: desc};
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
			
		}
	})
	// var campImage = req.params.image; 
	
});
// Show Route
app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate('comments').exec( function(err, foundcamps){
		if(err){
			console.log(err)
		}else{
			console.log(foundcamps);
			res.render("campgrounds/show", {campground:foundcamps});
			
		}
	})
	
});
// ===================
// Comment Routes
// ===================
app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render('comments/new', {campground:campground})
		}
	});
});

app.post('/campgrounds/:id/comments', function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			res,redirect('/campgrounds');
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err)
					res.redirect('/campgrounds');
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			})
		}
	})
})




app.listen(3000, function() { 
  console.log('Yelpcamp has started!!!'); 
});