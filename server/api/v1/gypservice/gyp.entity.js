const mongoose = require('mongoose');

let schema = new mongoose.Schema({
	title: { type: String, required: true},
	gifId : { type: String , required: true, index: true},
	url:{ type: String , required: true, index: true},
	images:{ type: Object, required: true},
	type: { type: String, required: true},
	//source: { type: String, required: true},
	rating: { type: String, required: true}
}, {collection: 'collection'} );

schema.index(
  {
    gifId:1
  },{
    unique: true
  }
);

module.exports = mongoose.model("collection", schema);