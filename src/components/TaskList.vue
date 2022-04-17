<template>
  <div class="bg-white shadow-md rounded">
    <div class="list-box px-8 pt-6 pb-6 mb-4">
      <div v-if="tasks.length === 0">
        <img :src="require('../assets/todo.jpg')" alt="empty" class="w-64 mb-6" />
        <h4 class="font-bold text-centet text-lg">รายการที่ต้องทำยังว่าง</h4>
        <h6 class="text-xs">เพิ่มรายการที่คุณต้องทำเลย !</h6>
      </div>
      <ul class="task-container">
        <li
          v-for="(item, index) in tasks"
          :key="index"
          class="flex items-center flex-col task-container__top"
        >
          <div class="flex w-full justify-between">
            <div class="flex items-center">
              <input
                type="checkbox"
                :key="index"
                :value="index"
                :checked="item.isDone"
                @change="onCheckboxChange"
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
                v-if="item.isDone === false && tempTaskIndex !== index"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md mr-2"
                @click="addSubTask(index)"
              >
                Add SubTask
              </button>
              <button
                v-if="item.isDone === false && tempTaskIndex !== index"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md"
                @click="onRemoveTask(index)"
              >
                Delete
              </button>
            </div>
          </div>
          <SubTaskList :rootIndex="index" />
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
import SubTaskList from './SubTaskList.vue'
import { mapState } from 'vuex'
export default {
  name: 'TaskList',
  components: {
    SubTaskList,
  },
  data() {
    return {
      imageSize: '20px',
      tempInnerText: '',
      tempTaskIndex: null,
      isNewTaskEmptyInput: false,
      tempIsDone: false,
      tempCheckAll: false,
      tempCheckIndex: null,
    }
  },
  methods: {
    addSubTask(index) {
      this.$store.commit('addSubTask', index)
    },
    onEditTask(index, event) {
      if (this.tasks[index].isDone === true) {
        this.tempIsDone = true
        return
      }
      this.tempTaskIndex = index
      this.tempInnerText = event.target.innerText
    },
    onCheckboxChange(event) {
      this.tempCheckAll = event.target.checked
      this.tempCheckIndex = event.target.value
      this.$store.commit('onFinishedTask', {
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
      this.$store.commit('onEditTask', {
        index: this.tempTaskIndex,
        message: event.target.value,
      })
      this.tempInnerText = ''
      this.tempTaskIndex = null
    },
    onRemoveTask(index) {
      this.$store.commit('onRemoveTask', index)
    },
  },
  computed: {
    ...mapState({
      tasks: (state) => state.tasks,
    }),
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
  watch: {
    tempCheckAll: function () {
      if (this.tempCheckAll) {
        this.$store.commit('onFinishedAllSubTask', {
          index: this.tempCheckIndex,
          isChecked: this.tempCheckAll,
        })
      }
      this.$store.commit('onFinishedAllSubTask', {
        index: this.tempCheckIndex,
        isChecked: this.tempCheckAll,
      })
    },
  },
}
</script>

<style scope>
.task-container {
  list-style-type: none;
  text-align: left;
  width: 100%;
}

.task-container__top {
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
