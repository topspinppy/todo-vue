<template>
  <div class="flex w-full mt-4" v-if="tasks[rootIndex].subTask.length !== 0">
    <ul class="w-full">
      <li v-for="(item, index) in tasks[rootIndex].subTask" :key="index" class="pl-10 mb-2">
        <div class="flex justify-between">
          <div class="flex items-center">
            <input
              type="checkbox"
              :key="index"
              :value="index"
              class="w-6 h-6 mr-4 rounded-xl"
              @change="_onCheckboxChange"
              :checked="item.isDone"
              v-if="item.message !== ''"
            />
            <input
              type="text"
              class="container-list-form__input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              :class="validateSubTaskInput"
              :key="index"
              :value="item.message"
              @keyup.enter="_onEnterAddSubTask(index, $event)"
              v-if="item.message === '' || (isEdited && index === tempIndexEdited)"
              ref="subTaskInputRef"
            />
            <span
              v-if="(item.message !== '' && isEdited === false) || index !== tempIndexEdited"
              class="text-gray-700"
              :class="validateTask(item)"
              @click="_onEditedSubTask(index)"
              >{{ item.message }}</span
            >
          </div>
          <div>
            <button
              class="bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-2 rounded-md mr-2"
              @click="_onAddSubTask(index)"
              v-if="item.message === ''"
            >
              Confirm
            </button>
            <button
              class="bg-orange-400 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded-md bg-o"
              @click="_removeSubTask(index)"
              v-if="item.message === '' || (isEdited && index === tempIndexEdited)"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SubTaskList',
  data() {
    return {
      isNewSubTaskEmptyInput: false,
      isEdited: false,
      tempIndexEdited: null,
    }
  },
  mounted() {
    this.isNewSubTaskEmptyInput = false
  },
  props: {
    rootIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    _onEditedSubTask(index) {
      this.isEdited = true
      this.tempIndexEdited = index
    },
    _onAddSubTask(index) {
      const notDones = this.tasks[this.rootIndex].subTask.filter((item) => item.message === '')
      const notDone = notDones.findIndex((item) => item.currentIndex === index)

      if (this.$refs.subTaskInputRef[notDone].value === '') {
        this.isNewSubTaskEmptyInput = true
        return
      }

      this.$store.commit('saveSubTask', {
        index: this.rootIndex,
        subIndex: index,
        message: this.$refs.subTaskInputRef[notDone].value,
      })
    },
    _onEnterAddSubTask(index, event) {
      console.log('eeeee', event.keyCode)
      if (event.keyCode !== 13) return
      this.$store.commit('saveSubTask', {
        index: this.rootIndex,
        subIndex: index,
        message: event.target.value,
      })
      if (this.isEdited) {
        this.isEdited = false
      }
    },
    _removeSubTask(index) {
      this.$store.commit('removeSubTask', { rootIndex: this.rootIndex, subIndex: index })
    },
    _onCheckboxChange(event) {
      this.$store.commit('onFinishedSubTask', {
        rootIndex: this.rootIndex,
        childIndex: event.target.value,
        isDone: event.target.checked,
      })
    },
    validateTask(item) {
      return item.isDone ? 'line-through' : 'no-underline'
    },
  },
  computed: {
    ...mapState({
      tasks: (state) => state.tasks,
    }),
    validateSubTaskInput() {
      return this.isNewSubTaskEmptyInput ? 'border-red-500' : 'border-gray-500'
    },
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'onFinishedSubTask') {
        const { rootIndex } = mutation.payload
        const subTask = state.tasks[rootIndex].subTask
        const isAllSubTaskDone = subTask.every((item) => item.isDone === true)
        this.$store.commit('onFinishedTask', {
          index: rootIndex,
          isChecked: isAllSubTaskDone,
        })
      }
    })
  },
  beforeUnmount() {
    this.unsubscribe()
  },
}
</script>

<style scoped></style>
