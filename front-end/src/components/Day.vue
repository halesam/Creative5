<template> 
  <router-link class="day-box" :to="'/thisDay?dayId='+this.$vnode.key">
    <div>
      <h1>{{ currentMoment.date() }}</h1>
  <!-- if event.user == this.$root.$data.user then my-event, else their-event -->
      <!-- <router-link :class="{'event-link': true, 'my-event': false, 'their-event': true}" :to="'/edit?eventId='+event._id" v-for="event in eventArray" :key="event._id">  -->
      <router-link  :to="'/edit?eventId='+event._id" v-for="event in eventArray" :key="event._id"> 
        <p v-if="user" :class="user.username === event.user.username? 'my-event' : 'their-event'">{{event.time}} {{event.user.firstName}} - {{event.name}}</p>
        <p v-else class="their-event"> {{event.time}} {{event.user.firstName}} - {{event.name}}</p>
      </router-link>
    </div>
  </router-link>
</template>


<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Day',
  data() {
    return {
      currentMoment: moment(this.$vnode.key, 'YY-MM-DD'),
      eventArray: [],
      error: '',
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
        this.response = await axios.get("/api/events/" + this.$vnode.key);
        this.eventArray = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
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