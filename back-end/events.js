// const mongoose = require('mongoose');
// const express = require("express");
// const router = express.Router();

// const eventSchema = new mongoose.Schema({
//     day: String,
//     details: String,
//     location: String,
//     name: String,
//     people: [],
// })

const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();


const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    time: String,
    day: String,
    details: String,
    location: String,
    name: String,
    // people: [],
  })

// const eventSchema = new mongoose.Schema({
//     user: {
//       type: mongoose.Schema.ObjectId,
//       ref: 'User'
//     },
//     path: String,
//     title: String,
//     description: String,
//     created: {
//       type: Date,
//       default: Date.now
//     },
//   });

//const Person = mongoose.model('People', personSchema);
const Event = mongoose.model('Events', eventSchema);

// //creates a person
// router.post('/people', async (req,res) => {
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

//creates an event
router.post('/event', validUser, async (req,res) => {
  const event = new Event({
    user: req.user,
    time: req.body.time,
    day: req.body.day,
    details: req.body.details,
    location: req.body.location,
    name: req.body.name,
    people: req.body.people,
  });
  try{
    await event.save();
    res.send(event);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// //gets all people
// router.get("/people", async (req,res) => {
//   try{
//     let people = await Person.find();
//     res.send(people);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

//gets all events
router.get("/events", async (req,res) => {
  try{
    let events = await Event.find().populate('user');
    res.send(events);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//get users events
// router.get("/myevents", validUser, async (req,res) => {
//     try {
//         let events = await Event.find({
//             user: req.user
//         });
//         return res.send(events);
//     } catch(error) {
//         console.log(error);
//         return res.sendStatus(500);
//     }
// });

//gets a person from an id
// router.get('/people/:id', async(req,res) => {
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

//gets an event from an id
router.get('/event/:id', async(req,res) => {
  try{
    let events = await Event.findOne({
      _id: req.params.id 
    }).populate('user');
    res.send(events);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//get events on a certain day
//Note here :id is actually the day, but mongo requires it to be :id
router.get('/events/:id', async(req,res) => {
  try{
    let events = await Event.find({
      day: req.params.id
    }).populate('user');
    res.send(events);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

//get events on a certain day WITH A CERTAIN USER
//Note here :id is actually the day, but mongo requires it to be :id
router.get('/myevents/:id', validUser, async(req,res) => {
    try{
      let events = await Event.find({
        user: req.user,
        day: req.params.id
      }).populate('user');
      res.send(events);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  })

// //deletes a person
// router.delete('/people/:id', async(req, res) =>{
//   try{
//     await Person.deleteOne({_id: req.params.id});
//     res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// //deletes All people
// router.delete('/people/all', async(req, res) =>{
//   try{
//     await Person.delete();
//     res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

//deletes an event
router.delete('/event/:id', async(req, res) =>{
  try{
    await Event.deleteOne({_id: req.params.id});
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// updates an event
router.put("/events/:id", async(req, res) => {
  try {
    let event = await Event.findOne({_id: req.params.id});
    event.day = req.body.day;
    event.details = req.body.details;
    event.location = req.body.location;
    event.name = req.body.name;
    await event.save();
    res.send(event);
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});
 

  module.exports = {
    model: Event,
    routes: router,
  }