<template>
  <div class="container">
    <p>{{ $store.state.title }}</p>
    <TaskForm />
    <TaskList />
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    TaskForm,
    TaskList,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
body {
  background: cornflowerblue;
  font-family: 'Kanit', sans-serif;
}

title {
  font-size: 20em;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

.container {
  width: 300px;
}

.container > p {
  font-size: 2em;
  margin-bottom: 20px;
}
</style>
