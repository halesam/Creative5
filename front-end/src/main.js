import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import mock from './mock-data.js'
import mockPeople from './mock-people'



Vue.prototype.moment = moment
Vue.config.productionTip = false

let data = {
  events: new Map(),
  eventsByDay: new Map(),
  //eventsByPeople: new Map(), // this will map people's names to events
  peopleArray: [],
  user: null

}
console.log(mock);
for(let item of mock) {
  console.log(item);
  if(!data.eventsByDay[item.day]) {
    data.eventsByDay[item.day] = [];
    // data.eventsByDay.set(item.day, []);

  }
  data.eventsByDay[item.day].push(item.id);
  data.events[item.id] = item;
  console.log("events by day: ", data.eventsByDay);
  console.log("events array: ", data.events);
}

//people
console.log("mock People: ",mockPeople);

for(let p of mockPeople) {
  data.peopleArray.push(p);
  console.log(data.peopleArray);
}


new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
