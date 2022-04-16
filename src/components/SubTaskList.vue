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
              :key="index"
              @keyup.enter="_onEnterAddSubTask(index, $event)"
              v-if="item.message === ''"
            />
            <span v-if="item.message !== ''" class="text-gray-700" :class="validateTask(item)">{{
              item.message
            }}</span>
          </div>
          <button
            class="bg-orange-400 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded-md bg-o"
            @click="_removeSubTask(index)"
            v-if="item.message === ''"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SubTaskList',
  props: {
    rootIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    _onEnterAddSubTask(index, event) {
      if (event.keyCode !== 13) return
      this.$store.commit('saveSubTask', {
        index: this.rootIndex,
        subIndex: index,
        message: event.target.value,
      })
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
  },
  watch: {
    tasks() {
      console.log('watch')
    },
  },
}
</script>

<style scoped></style>
