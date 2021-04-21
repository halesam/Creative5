<template> 
    <div>
        <h2>Logged in as {{user.firstName}} {{user.lastName}} <a @click="logout"><button>Log out</button></a></h2>

        <!-- <div class="allPeople" v-for="person in allPeople" v-bind:key="person.id"> 
            <router-link :to="'/editPeople?personId='+ person._id">
                <h1>{{person.name}}</h1> 
            </router-link>
                <p>{{person.email}}</p>
                <p>From {{person.address}} </p>

        </div>
        <router-link to="/editPeople">Add a Person</router-link>
        <br>
        <h1 v-if="allPeople.length === 0" class = "condiditonalHeader"> No People!! </h1> -->

        <div v-on:submit.prevent> 
      <div class="month-name"> 
        <button type="submit" v-on:click="lastMonth()">Last Month</button>
        {{ moment(currentMonth).format("MMMM YYYY") }} 
        <button type="submit" v-on:click="nextMonth()">Next Month</button>
      </div>
    <div class = "calendar-grid-container">
      <div class = "calendar-box-header"> Sunday</div>
      <div class = "calendar-box-header"> Monday </div>
      <div class = "calendar-box-header"> Tuesday</div>
      <div class = "calendar-box-header"> Wednesday</div>
      <div class = "calendar-box-header"> Thursday</div>
      <div class = "calendar-box-header"> Friday</div>
      <div class = "calendar-box-header"> Saturday</div>
      <!-- had to start at 0, not 1. So day-1 solved that problem -->
      <MyDay v-for="day in 35" class="calendar-box" v-bind:key="moment(currentMonth).date(1).day(0).add(day-1, 'days').format('YY-MM-DD')"/>
    </div>
    <footer>
      <br>
      <a href='https://github.com/halesam/Creative4.git'>Git Hub Link</a>

    </footer>
  </div>

        <!-- <div class="eventsList" v-for="event in eventsByPeople" v-bind:key="event.id">
            <h3>{{event.name}} </h3>
            <p>Time: {{event.time}} </p>
            <p>Location: {{event.location}} </p>
            <p>Details: {{event.details}} </p>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios'
import MyDay from "../components/MyDay.vue"
import moment from 'moment'

export default {
  name: 'Home',
  data() {
    return {
      currentMonth: moment().format('MMMM YYYY'),
    }
  },
  components: {
    MyDay
  },
  methods: {
    findFirstDate(){
      //moment
    },
    async logout() {
        try {
            await axios.delete("/api/users");
            this.$root.$data.user = null;
        } catch (error) {
            this.$root.$data.user = null;
        }
    },
    nextMonth(){
      this.currentMonth = moment(this.currentMonth).add(1, 'months');
      console.log("in nextMonth", this.currentMonth);
    },
    lastMonth() {
      this.currentMonth = moment(this.currentMonth).subtract(1, 'months');
      console.log("in lastMonth", this.currentMonth);

    },
  },
  watch: {
    currentMonth(value) {
      this.currentMonth = value;
    },
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
}
//TODO: Only can see people info if a user
// import Day from "../components/Day.vue"
// import moment from 'moment'
// import axios from 'axios'
// export default {
//     name: "People",
//     data() {
//         return {
//             eventsByPeople: [],
//             allPeople: [],
//         }
//     },
//     props: {
//         personName: String,
//     },
//     async created() {
//         try{
//           this.response = await axios.get("/api/people");
//           this.allPeople = this.response.data;
//         } catch(error){
//           this.error = error.response.data.message;
//         }        // this.updateDayArray();
//     },
//     watch: {
//             dayId() {
//             // this.updateDayArray();
//         },
//     },
//     methods: {
//         checkPerson(person, event) {
//             if(event.people.name == person.name)
//             return true;
//         },
//         async logout() {
//             try {
//                 await axios.delete("/api/users");
//                 this.$root.$data.user = null;
//             } catch (error) {
//                 this.$root.$data.user = null;
//             }
//         },
//         // updateDayArray(){
//         //     this.eventArray = [];
//         //     let dayArray = this.$root.$data.eventsByDay[this.dayId];
//         //     if(dayArray) {
//         //         for(let item of dayArray) {
//         //             this.eventArray.push(this.$root.$data.events[item]);
//         //         }
//         //     }
//         // } 
//     },
//     computed: {
//     user() {
//       return this.$root.$data.user;
//     },
//   },
// }
</script>


<style scoped>
.calendar-grid-container {
  display: grid;
  margin: 0 1%;
  grid-template-columns: 14% 14% 14% 14% 14% 14% 14%;
  width: 100%;
}

.calendar-box {
  border: 1px solid var(--background-darker);
  text-align: left;
  padding: 10px;
}

.calendar-box-header {
  text-align: center;
  font-weight: 700;
  font-size: 20pt;
  padding: 5px;
}

@media only screen and (max-width: 950px) {
  .calendar-grid-container {
    grid-template-columns: 100%;
  }

  .calendar-box-header {
    display: none;
  }
}

.month-name {
  text-align: center;
  font-size: 60px;
}

.allPeople a {
    text-decoration: none;
    color: var(--text);
}

.allPeople a:hover {
  background-color: var(--button-dark);
}

/* .fa-sign-out-alt:before {
    content: "\f2f5";
} */
</style>




