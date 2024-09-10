const mongoose = require('mongoose');
const BaseModel = require('./BaseModel');

const eventSchema = new mongoose.Schema({
	name: String,
	location: String,
	date: Date,
	description: String,
	rsvps: [String],
});

const EventModel = mongoose.model('Event', eventSchema);

class Event extends BaseModel {
	constructor() {
		super(EventModel);
	}
	// Any Event specific methods are added here
}
module.exports = new Event();

