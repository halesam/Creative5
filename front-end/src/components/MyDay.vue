<template> 
  <router-link class="day-box" :to="'/thisDay?dayId='+this.$vnode.key">
    <div>
      <h1>{{ currentMoment.date() }}</h1>
  
      <router-link :to="'/edit?eventId='+event._id" v-for="event in eventArray" :key="event._id"> 
        <p :class="user.username === event.user.username? 'my-event' : 'their-event'"> {{event.time}} {{event.name}} </p>
      </router-link>
    </div>
  </router-link>
</template>


<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'MyDay',
  data() {
    return {
      currentMoment: moment(this.$vnode.key, 'YY-MM-DD'),
      eventArray: [],
      error: '',
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    // updateDayArray() {
    //   dayArray = [];
    //   let dayArray = this.$root.$data.eventsByDay[this.$vnode.key];
    //   // console.log(dayArray);
    //   if(dayArray) {
    //     for(let item of dayArray) {
    //       this.eventArray.push(this.$root.$data.events[item]);
    //       // console.log("map", this.$root.$data.events)
    //     }
    //   }
    // },
    async getEvents() {
      try {
        this.response = await axios.get("/api/myevents/" + this.$vnode.key);
        this.eventArray = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
  },
  created() {
    this.getEvents();
    //this.updateDayArray();
  },
  watch: {
    dayArray() {
      this.updateDayArray();
    },
    eventArray(value) {
      this.eventArray = value;
    }
  },
}
</script>



<style scoped>
  .day-box {
    background-color: var(--background);
  }

  .day-box:hover {
    background-color: var(--background-dark);
  }

  a {
    text-decoration: none;
    color: var(--text);
  }

  h1 {
    margin: 0 0 10px;
  }

  .event-link {
    display: block;
    margin-top: 10px;
    padding: 5px;
  }

  .my-event {
    background-color: var(--primary);
  }

  .my-event:hover {
    background-color: var(--primary-light)
  }

  .their-event {
    background-color: var(--secondary);
  }

  .their-event:hover {
    background-color: var(--secondary-light);
  }
</style>