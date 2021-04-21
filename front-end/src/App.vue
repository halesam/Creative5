<template>
  <div id="app">
    <div id="header">
      <h1>Social Calendar</h1>
      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link v-if="user" to="/edit">Add</router-link>
        <router-link :to="'/thisDay?dayId=' + moment().format('YY-MM-DD')">Today</router-link>
        <router-link to="/peopleDashboard">{{ (user) ? "My Account" : "Log In" }}</router-link>

      </div>
      
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'app',

  async created() {
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
  }
}
</script>

<style>
:root {
  --background: #ffffffff;
  --background-dark: #f8f8f8ff;
  --background-darker: #e4e4e4;

  --button: #eeeeee;
  --button-dark: #e3e3e3;

  --text: #111111ff;

  --primary-light: #ade1e5ff;
  --primary: #3bb2baff;
  --secondary-light: #ffb294ff;
  --secondary: #f78e64ff;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text);
}

#header {
  background-color: var(--primary-light);
  padding: 20px;
}

#header h1 {
  margin: 0;
}

#nav {
  margin: 20px 0;
}

#nav a {
  font-weight: bold;
  font-size: 20pt;
  text-decoration: none;
  color: var(--text);
  background-color: var(--button);
  padding: 10px 30px;
  margin: 0 10px;
}

#nav a:hover {
  background-color: var(--button-dark);
}

#nav a.router-link-exact-active {
  background-color: var(--primary);
}

@media only screen and (max-width: 950px) {
  #nav a {
    padding: 5px 15px;
    margin: 0 5px;
  }
}
</style>
