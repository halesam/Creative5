const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/eventstrial', {
  useNewUrlParser: true,
  //useUnifiedTopology: true

});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
 

//app.use(express.static('public'));

// const personSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   address: String, 
// });

// const eventBDSchema = new mongoose.Schema({
//   name: String,
//   path: String,
//   description: String,
// });

// const eventsSchema = new mongoose.Schema({
//   name: String,
//   path: String,
//   description: String,
// });

// const eventSchema = new mongoose.Schema({
//   time: String,
//   day: String,
//   details: String,
//   location: String,
//   name: String,
//   people: [],
// })

// const Person = mongoose.model('People', personSchema);
// const Event = mongoose.model('Events', eventSchema);

// //creates a person
// app.post('/api/people', async (req,res) => {
//   const person = new Person({
//     name: req.body.name,
//     address: req.body.address,
//     email: req.body.email,
//   });
//   try{
//     await person.save();
//     res.send(person);
//   } catch(error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// //creates an event
// app.post('/api/event', async (req,res) => {
//   const event = new Event({
//     time: req.body.time,
//     day: req.body.day,
//     details: req.body.details,
//     location: req.body.location,
//     name: req.body.name,
//     people: req.body.people,
//   });
//   try{
//     await event.save();
//     res.send(event);
//   } catch(error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// //gets all people
// app.get("/api/people", async (req,res) => {
//   try{
//     let people = await Person.find();
//     res.send(people);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// //gets all events
// app.get("/api/events", async (req,res) => {
//   try{
//     let events = await Event.find();
//     res.send(events);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// //gets a person from an id
// app.get('/api/people/:id', async(req,res) => {
//   try{
//     let person = await Person.findOne({
//       _id: req.params.id 
//     });
//     res.send(person);
//   } catch(error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// //gets an event from an id
// app.get('/api/event/:id', async(req,res) => {
//   try{
//     let events = await Event.findOne({
//       _id: req.params.id 
//     });
//     res.send(events);
//   } catch(error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// //get events on a certain day
// //Note here :id is actually the day, but mongo requires it to be :id
// app.get('/api/events/:id', async(req,res) => {
//   try{
//     let events = await Event.find({
//       day: req.params.id
//     });
//     res.send(events);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// })

// //deletes a person
// app.delete('/api/people/:id', async(req, res) =>{
//   try{
//     await Person.deleteOne({_id: req.params.id});
//     res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// // //deletes All people
// // app.delete('/api/people/all', async(req, res) =>{
// //   try{
// //     await Person.delete();
// //     res.sendStatus(200);
// //   } catch (error) {
// //     console.log(error);
// //     res.sendStatus(500);
// //   }
// // });

// //deletes an event
// app.delete('/api/event/:id', async(req, res) =>{
//   try{
//     await Event.deleteOne({_id: req.params.id});
//     res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// // updates an event
// app.put("/api/events/:id", async(req, res) => {
//   try {
//     let event = await Event.findOne({_id: req.params.id});
//     event.day = req.body.day;
//     event.details = req.body.details;
//     event.location = req.body.location;
//     event.name = req.body.name;
//     await event.save();
//     res.send(event);
//   } catch (error){
//     console.log(error);
//     res.sendStatus(500);
//   }
// });


// let people = [];

// app.get('/api/eventstrial', (req, res) => {
//     res.send();
//   });


// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

const events = require("./events.js");
app.use("/api", events.routes);





  
  app.listen(3003, () => console.log('Server listening on port 3003!'));
