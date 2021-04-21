<template> 
    <div>
        <h1 class="thisDay"> Things to do on {{moment(dayId,"YY-MM-DD").format("dddd, MMMM Do, YYYY")}} </h1>
        <router-link v-if="user" to="/edit">Add an Event</router-link>
        <br>
        <h1 v-if="eventArray.length === 0" class = "condiditonalHeader"> No Events Today!! </h1>

        <div class="eventsList" v-for="event in eventArray" :key="event._id"> 
            <h3>{{event.name}} </h3>
            <p>Time: {{event.time}} </p>
            <p>Location: {{event.location}} </p>
            <p>Details: {{event.details}} </p>
            <p>Person: {{event.user.firstName}} {{event.user.lastName}} </p>
            <!-- <h1 v-if="event.people.length === 0" class = "condiditonalHeader"> No People! </h1>

            <div class="peopleList" v-for="person in event.people" :key="person.id">
            <p>{{person.name}} -- {{person.email}}</p>
            </div> -->
        </div>

        <footer>
            <br>
            <a href='https://github.com/halesam/Creative4.git'>Git Hub Link</a>

        </footer>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "ThisDay",
    data() {
        return {
            eventArray: [],
        }
    },
    props: {
        dayId: String,
    },

    async created() {
        this.getEvents();
        try {
            let response = await axios.get('/api/users');
            this.$root.$data.user = response.data.user;
        } catch (error) {
            this.$root.$data.user = null;
        }
    },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },

    watch: {
            dayId() {
            this.getEvents();
        },
    },
    methods: {
        updateDayArray(){
            this.eventArray = [];
            let dayArray = this.$root.$data.eventsByDay[this.dayId];
            if(dayArray) {
                for(let item of dayArray) {
                    this.eventArray.push(this.$root.$data.events[item]);
                }
            }
        } ,
        async getEvents() {
            //So I need to get all events on a certain day
            try {
                this.response = await axios.get("/api/events/" + this.dayId);
                this.eventArray = this.response.data;
            } catch (error) {
                this.error = error.response.data.message;
            }

        },
    }
}
</script>

