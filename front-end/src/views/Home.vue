
<template>
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
      <Day v-for="day in 35" class="calendar-box" v-bind:key="moment(currentMonth).date(1).day(0).add(day-1, 'days').format('YY-MM-DD')"/>
    </div>
    <footer>
      <br>
      <a href='https://github.com/halesam/Creative4.git'>Git Hub Link</a>

    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Day from "../components/Day.vue"
import moment from 'moment'

export default {
  name: 'Home',
  data() {
    return {
      currentMonth: moment().format('MMMM YYYY'),
    }
  },
  components: {
    Day
  },
  methods: {
    findFirstDate(){
      //moment
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
  }
}
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
</style>


