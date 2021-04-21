<template>
  <div class="edit">
    <h1>{{ (eventId) ? "Edit" : "Add" }} an event</h1>
    <h2 v-if="!user"> You don't have permission to {{ (eventId) ? "edit this" : "add an" }} event</h2>
    <div>  


        <!-- <form v-on:submit.prevent="addComment"> -->
          <form v-on:submit.prevent>
            <h5>Event Name:
              <input v-model="input.name">
            </h5>
            <h5>Event Day:
            <input v-model="input.day" placeholder="Day (YY-MM-DD)">
            </h5>
            <h5>Event Time:
            <input v-model="input.time" placeholder="Time (8 PM)">
            </h5>
            <h5>Event Location:
            <input v-model="input.location" >
            </h5>

            <h5> Details:
              <textarea v-model="input.details" ></textarea>
            </h5>

            <!-- <h5>People: </h5>
            <div class="suggestions" v-if="input.people.length > 0">
              <div class="suggestion" v-for="p in input.people" :key="p.id">{{p.name}} {{p.email}}
                <button v-on:click="removePerson(p)">Remove</button>
              </div>
            </div>

            <h5>Add People:</h5> -->
            <!-- <div class="form"> -->
            <!-- <input v-model="findPerson" placeholder="Search"> -->
            <div class="suggestions" v-if="peopleNotGoing.length > 0">
              <div class="suggestion" v-for="p in peopleNotGoing" :key="p.id" @click="addPerson(p)">{{p.name}}
              </div>
            </div>
            <!-- <div v-if="user"> -->

              <br v-if="user">
              <router-link v-if="user" to="/"><button type="submit" v-on:click="submit(input)" >{{ (eventId) ? "Edit" : "Add" }} Event</button></router-link>
              <br v-if="user">
              <br v-if="user">
              <router-link v-if="user" to="/"><button type="submit" v-on:click="deleteEvent(input)" >Delete Event</button></router-link>
            <!-- </div> -->
        </form>    
    </div>
    <footer>
      <br>
      <p>Project 3 took 30 hours. Project 4 took 20 hours. Project 5 took 5 hours.</p>
      <a href='https://github.com/halesam/Creative5.git'>Git Hub Link</a>

    </footer>
  </div>
  
</template>

<script>
//TODO: only can edit/add if a user.
//ALTERNATIVE: Make it so only one user can be in each event

// import Day from "../components/Day.vue"
// import Vue from 'vue'
import moment from 'moment'
import axios from 'axios';

export default {
  name: 'Edit',
  data() {
    return {
      input: {
        name: "",
        day: "",
        time: "",
        location: "",
        details: "",
        people: [],
      },
      findPerson: "",
      theEvent: Object,
      eventArray: [],
      peopleGoing: [],
      //peopleNotGoing: [],
      allPeople: [],
    }
  },
  props: {
    eventId: String,
  },
  computed: { 
    //THIS ONE WORKS...... SORTA!!!
    peopleNotGoing() {
      return this.allPeople.filter((person) => {
        console.log(this.input.people);
        return this.input.people.indexOf(person) === -1;
      });
    },
    user() {
      return this.$root.$data.user;
    }
    
  },
  components: {
  
  },
  methods: {
    // async post() {
    //   try{
    //     await axios.post("/api/events", this.input);

    //   } catch(error) {
    //     console.log(error);
    //     this.error = "Error: " + error.response.data.message;
    //   }
    // },
    
    async submit(event) {
      console.log(event);
      console.log("In sumbit");
      if(!this.eventId) {
        this.input.id = moment().valueOf();
        this.addEvent();
        

      }
      else {
        this.overwriteEvent(event);
      }
      this.$forceUpdate();
    },
    removeFromArray(arr, val) {
      return arr.filter(function(ele){
        return ele != val;
      });
    },
    removePerson(person) {
      this.input.people = this.removeFromArray(this.input.people, person);

    },
    // async getEvents() {

    // },
    overwriteEvent(event) {
      //remove from map
      
      //need to find from both maps and remove
      //this takes the array of events and sets it equal to the filtered array (without theEvent.id)
      this.deleteEvent(event);






      //add to map
      this.addEvent();
      this.$forceUpdate();

    },
    async deleteEvent(event) {
      try{
        await axios.delete("/api/event/" + event._id);
      } catch(error) {
        console.log(error);
        this.error = "Error: " + error.response.data.message;
      }
      // this.$root.$data.eventsByDay[this.theEvent.day] = this.removeFromArray(this.$root.$data.eventsByDay[this.theEvent.day], this.theEvent.id);
      // this.$root.$data.events.delete(this.theEvent.id);
      this.$forceUpdate();

    },


    async addEvent() {
      console.log("In addEvent");
      console.log("this.input",this.input);
      console.log("this.$root.$data.events", this.$root.$data.events);
      console.log("this.$root.$data.eventsByDay",this.$root.$data.eventsByDay);
      console.log("end of cout statements");
      //For my sanity
      //eventArray is the events on this day
      //eventsByDay is a map of strings (dates) to an array of event ids
      //events is a map of event ids to objects (the event)

      //OPTION 1
/*
      //makes an id for the new event and inputs it to the events map
      console.log("Adding input ids");
      this.input.id = moment().millisecond();
      this.$root.$data.events.set(this.input.id, this.input);
      console.log("ending adding input ids");

      //I need to make add it to the array
      //if I don't have any events for the day
      if( !this.$root.$data.eventsByDay[this.input.day]) {
        console.log("If no events exist");
        //add the event to the array
        this.eventArray.push(this.input.id);
        //map the string of day to the eventArray (that should only have one thing in it)
        this.$root.$data.eventsByDay.set(this.input.day, this.eventArray);
      }
      //If there are already events
      else {
        //Make the eventArray = the events already on this day
        console.log("else events exist");
        this.eventArray = this.$root.$data.eventsByDay[this.input.day];
        //add the new event to this array
        this.eventArray.push(this.input.id);
        //update this day to map to the event array
        this.$root.$data.eventsByDay.set(this.input.day, this.eventArray);
      }

    */

      //OPTION 2 (actually works)

      //adds it to the events by day map
  //REMOVED THIS
      // if(!this.$root.$data.eventsByDay[this.input.day]) {
      //   //creates an array for this day to map to
      //   this.$root.$data.eventsByDay[this.input.day] = [];
      //   // data.eventsByDay.set(item.day, []);
      //  }
      //  //adds the id to the day
      // this.$root.$data.eventsByDay[this.input.day].push(this.input.id);


      // this.$root.$data.events[this.input.id] = this.input;
      // console.log("events by day: ", this.$root.$data.eventsByDay);
      // console.log("events array: ", this.$root.$data.events);
  //TO THIS
      //Still need to add stuff to the events map.
      //jk did this above
      //this.$root.$data.events.set(this.input.id, this.input);





      // this.$root.$data.eventsByDay.set(this.input.day, this.input.id);
      // console.log("After the event should be added");
      // console.log("this.input",this.input);
      // console.log("this.$root.$data.events", this.$root.$data.events);
      // console.log("this.$root.$data.eventsByDay",this.$root.$data.eventsByDay);

      //create an eventId
      //add to maps
        // if(this.Day.events.size() === 0) {
        //     Vue.set(Day.events, new Array);
        // }
        // this.$root.$data.Day.events.push({
        //     name: this.eventName,
        //     day: this.eventDay,
        //     time: this.eventTime,
        //     // location: this.eventLocation,
        //     details: this.eventDetails
        // })
        // this.$root.$data.Day.event;

      try{
          await axios.post("/api/event", this.input);
        } catch(error) {
        console.log(error);
        this.error = "Error: " + error.response.data.message;
      }
      this.$forceUpdate();

    },
    findFirstDate(){
      //moment
    },
    addPerson(person) {
      this.findPerson = "";
      this.input.people.push(person);
    },
  }, 
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
    if(this.eventId) {
      try {
        this.response = await axios.get("/api/event/" + this.eventId);
        this.input = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
    //Take out this line when using the computed
      //this.peopleNotGoing = this.$root.$data.peopleArray.slice(0); //.filter(function(ele){
        // try{
        //   this.response = await axios.get("/api/people");
        //   this.allPeople = this.response.data;
        // } catch(error){
        //   this.error = error.response.data.message;
        // }

    // this.theEvent = this.$root.$data.events[this.eventId];
    // //this.peopleGoing = [];
    // if(this.theEvent) {
    //   this.input.name = this.theEvent.name;
    //   this.input.day = this.theEvent.day;
    //   this.input.time = this.theEvent.time;
    //   this.input.location = this.theEvent.location;
    //   this.input.details = this.theEvent.details;
    //   this.input.id = this.theEvent.id; //REMOVED THIS LINE
    //   this.input.people = [];
    //   for (var i = 0; i < this.theEvent.people.length; i++) {
    //     this.input.people.push(this.theEvent.people[i]);
    //   }
    //   //this.input.people = this.eventId.people;//this isn't making it an array
    //   //this.peopleGoing = this.theEvent.people.slice(0);
    //   console.log(this.$root.$data.peopleArray);

      //Moving this to computed
      //   return !this.peopleGoing.includes(ele);
      // });
      //Alternative code idea: 
      //copyArray = firstArray.slice(0);
    // }
    //Take out this line when using the computed
      //this.peopleNotGoing = this.$root.$data.peopleArray.slice(0); //.filter(function(ele){
      //this.peopleNotGoing = [];
      // // console.log(this.$root.$data.eventsByDay);
      // let dayArray = this.$root.$data.eventsByDay[this.$vnode.key];
      // // console.log(dayArray);
      // if(dayArray) {
      //   for(let item of dayArray) {
      //     this.eventArray.push(this.$root.$data.events[item]);
      //     // console.log("map", this.$root.$data.events)
      //   }
      // }
  },
}



</script>
