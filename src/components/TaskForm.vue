<template>
  <div class="container-list-form">
    <label>วันนี้คุณต้องการทำอะไร ?</label>
    <div class="container-list-form__inline">
      <input
        ref="taskInputRef"
        class="container-list-form__input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        :class="validateInput"
      />
      <button
        class="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-md shadow-sm"
        @keyup.enter="onEnterAddTask"
        @click="addTask"
      >
        +
      </button>
    </div>
    <div
      class="bg-red-100 rounded-lg py-2 px-2 mb-3 text-base text-red-700 mt-3"
      role="alert"
      v-if="this.taskValue === ''"
    >
      กรุณาใส่ข้อมูลสิ่งที่ต้องการทำลงในช่องว่าง
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onTask: {
      type: Function,
    },
  },
  name: 'TaskForm',
  mounted() {
    this.taskValue = null
  },
  data() {
    return {
      taskValue: '',
    }
  },
  methods: {
    addTask() {
      const messageBody = {
        message: this.$refs.taskInputRef.value,
        isDone: false,
      }
      this.taskValue = this.$refs.taskInputRef.value
      if (this.$refs.taskInputRef.value === '') return
      this.onTask(messageBody)
      this.$refs.taskInputRef.value = ''
    },
  },
  computed: {
    validateInput() {
      return this.taskValue === '' ? `border-red-600` : ``
    },
  },
}
</script>

<style>
.container-list-form {
  border: 1px solid #f1f1f1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  text-align: start;
  background: white;
  border-radius: 7px;
}

.container-list-form__inline {
  display: flex;
}

.container-list-form__input {
  padding: 8px;
  display: inline-block;
  width: 100%;
}
</style>
