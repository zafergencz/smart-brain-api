const clarifai = require('clarifai');

var app = new Clarifai.App({apiKey: '8c299a1c1797474692ccb28d3472d7c5'});

const handleApiCall = (req,res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {res.json(data);})
	.catch(err => {res.status(400).json('unable to work with API')})
}
const handleImage = (req,res,db) => {
	const { id } = req.body;
	db('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0]);
	  })
	  .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
	handleImage,
	handleApiCall
}