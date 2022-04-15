<template>
  <div class="bg-white shadow-md rounded">
    <div class="list-box px-8 pt-6 pb-6 mb-4">
      <div v-if="tasks.length === 0">
        <img :src="require('../assets/todo.jpg')" alt="empty" class="w-64 mb-6" />
        <h4 class="font-bold text-centet text-lg">รายการที่ต้องทำยังว่าง</h4>
        <h6 class="text-xs">เพิ่มรายการที่คุณต้องทำเลย !</h6>
      </div>
      <ul>
        <li v-for="(item, index) in tasks" :key="index" class="flex justify-between items-center">
          <div class="flex items-center">
            <input
              type="checkbox"
              :key="index"
              :value="index"
              @change="onCheckboxChange"
              ref="taskListEl"
              class="w-6 h-6 mr-4 rounded-xl"
              :disabled="tempTaskIndex === index && tempInnerText !== ''"
            />
            <input
              type="text"
              :value="tempInnerText"
              v-if="tempInnerText !== '' && tempTaskIndex === index"
              @keyup="onConfirmEditTask"
              class="container-list-form__input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              :class="validateInput"
            />
            <span
              :style="checkedStyle(index)"
              @click="onEditTask(index, $event)"
              :class="validateEditTaskInput"
              v-if="tempInnerText === '' || tempTaskIndex !== index"
            >
              {{ item.message }}
            </span>
          </div>
          <div>
            <button
              v-if="item.isDone === false"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md"
              @click="onRemoveTask(index)"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="flex justify-around w-full pb-5 pt-5 bg-blue-400 rounded-b-sm"
      v-if="tasks.length !== 0"
    >
      <div>รายการทั้งหมด: {{ tasks.length }} รายการ</div>
      <div>ทำสำเร็จ: {{ successTask }} รายการ</div>
      <div>รอดำเนินการ: {{ pendingTask }} รายการ</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  data() {
    return {
      currentEndTaskIndex: 0,
      imageSize: '20px',
      tempInnerText: '',
      tempTaskIndex: null,
      isNewTaskEmptyInput: false,
      tempIsDone: false,
    }
  },
  props: {
    tasks: {
      type: Array,
    },
    onRemoveTask: {
      type: Function,
    },
    onFinishedTask: {
      type: Function,
    },
    _onEditTask: {
      type: Function,
    },
  },
  methods: {
    onEditTask(index, event) {
      if (this.tasks[index].isDone === true) {
        this.tempIsDone = true
        return
      }
      this.tempTaskIndex = index
      this.tempInnerText = event.target.innerText
    },
    onCheckboxChange(event) {
      this.currentEndTaskIndex = event.target.value
      this.onFinishedTask({
        index: event.target.value,
        isChecked: event.target.checked,
      })
    },
    checkedStyle(index) {
      const currentTasks = this.tasks
      return {
        textDecoration: currentTasks[index].isDone ? 'line-through' : 'none',
      }
    },
    onConfirmEditTask(event) {
      if (event.keyCode !== 13) return
      if (event.target.value === '') {
        this.isNewTaskEmptyInput = true
        return
      }
      this._onEditTask(event.target.value, this.tempTaskIndex)
      this.tempInnerText = ''
      this.tempTaskIndex = null
    },
  },
  computed: {
    successTask() {
      return this.tasks.filter((item) => item.isDone).length
    },
    pendingTask() {
      return this.tasks.filter((item) => item.isDone === false).length
    },
    validateInput() {
      return this.isNewTaskEmptyInput === true ? `border-red-600` : ``
    },
    validateEditTaskInput() {
      return !this.tempIsDone && `cursor-pointer`
    },
  },
}
</script>

<style>
ul {
  list-style-type: none;
  text-align: left;
  padding-left: 20px;
  width: 100%;
}

li {
  margin-bottom: 1ch;
  margin-top: 1ch;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.list-box {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  flex-direction: column;
}

input[type='checkbox'] {
  border-radius: 50%;
}
</style>
