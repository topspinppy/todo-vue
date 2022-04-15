<template>
  <div class="container">
    <p>-𝗧𝗢 𝗗𝗢 𝗟𝗜𝗦𝗧 -</p>
    <TaskForm :onTask="addTask" />
    <TaskList
      :tasks="tasks"
      :onFinishedTask="onFinishedTask"
      :onRemoveTask="onRemoveTask"
      :_onEditTask="onEditTask"
    />
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
  data() {
    return {
      tasks: [],
    }
  },
  methods: {
    addTask(task) {
      this.tasks.push(task)
    },
    onFinishedTask(task) {
      const taskItem = this.tasks
      taskItem[task.index].isDone = task.isChecked
      this.task = taskItem
    },
    onRemoveTask(index) {
      const taskItem = this.tasks
      const newTaskItem = taskItem.filter((item, i) => i !== index)
      this.tasks = newTaskItem
    },
    onEditTask(textTask, index) {
      let taskItem = this.tasks
      taskItem[index].message = textTask
      this.tasks = taskItem
    },
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
