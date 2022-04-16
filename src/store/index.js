import { createStore } from 'vuex'

const store = createStore({
  state: {
    title: '𝗧𝗢 𝗗𝗢 𝗟𝗜𝗦𝗧',
    tasks: [],
  },
  mutations: {
    addTask(state, messageBody) {
      state.tasks.push({ ...messageBody, subTask: [] })
    },
    addSubTask(state, index) {
      let currentSubTask = state.tasks[index].subTask
      state.tasks[index].subTask = [
        ...currentSubTask,
        {
          currentIndex: currentSubTask.length,
          message: '',
          isDone: false,
        },
      ]
    },
    saveSubTask(state, subTaskData) {
      const { index, subIndex, message } = subTaskData
      state.tasks[index].subTask[subIndex].message = message
    },
    removeSubTask(state, taskData) {
      const { rootIndex, subIndex } = taskData
      const subTask = state.tasks[rootIndex].subTask
      const newSubTask = subTask.filter((item, index) => index !== subIndex)
      state.tasks[rootIndex].subTask = newSubTask
    },
    onFinishedSubTask(state, taskBody) {
      const { rootIndex, childIndex, isDone } = taskBody
      state.tasks[rootIndex].subTask[childIndex].isDone = isDone
    },
    onFinishedTask(state, taskBody) {
      const { index, isChecked } = taskBody
      const { tasks } = this.state
      const taskItem = tasks
      taskItem[index].isDone = isChecked
      state.tasks = taskItem
    },
    onEditTask(state, taskBody) {
      const { index, message } = taskBody
      let taskItem = state.tasks
      taskItem[index].message = message
      state.tasks = taskItem
    },
    onRemoveTask(state, index) {
      const taskItem = state.tasks
      const newTaskItem = taskItem.filter((item, i) => i !== index)
      state.tasks = newTaskItem
    },
  },
})

export default store
