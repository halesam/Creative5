<template>
  <div class="edit">
    <h1>{{ (personId) ? "Edit" : "Add" }} a person</h1>
    <div>  


        <!-- <form v-on:submit.prevent="addComment"> -->
          <form v-on:submit.prevent>
            <h5>Person Name:
              <input v-model="input.name">
            </h5>
            <h5>Person Address:
            <input v-model="input.address">
            </h5>
            <h5>Person Email:
            <input v-model="input.email" >
            </h5>
            <!-- <div v-if="user"> -->
              <br>
              <router-link to="/"><button type="submit" v-on:click="submit(input)" >{{ (personId) ? "Edit" : "Add" }} Person</button></router-link>
              <br>
              <br>
              <router-link to="/"><button type="submit" v-on:click="deleteEvent(input)" >Delete Person</button></router-link>
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
// TODO: Can only modify self

// import Day from "../components/Day.vue"
// import Vue from 'vue'
import moment from 'moment'
import axios from 'axios';

export default {
  name: 'EditPeople',
  data() {
    return {
      input: {
        name: "",
        address: "",
        email: "",
      },
    //   findPerson: "",
      thePerson: Object,
    //   eventArray: [],
    //   peopleGoing: [],
    //   peopleNotGoing: [],
    }
  },
  props: {
    personId: String,
  },
  computed: {
    //THIS ONE WORKS...... SORTA!!!
    // peopleNotGoing() {
    //   return this.$root.$data.peopleArray.filter((person) => {
    //     console.log(this.input.people);
    //     return this.input.people.indexOf(person) === -1;
    //   });
    // }


    
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
      if(!this.personId) {
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
    async deleteEvent(person) {
      try{
        await axios.delete("/api/people/" + person._id);
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


      try{
          await axios.post("/api/people", this.input);
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
    if(this.personId) {
      try {
        this.response = await axios.get("/api/people/" + this.personId);
        this.input = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
 
  }
}



</script>
