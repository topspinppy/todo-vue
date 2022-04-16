<template>
  <div class="flex w-full mt-4" v-if="tasks[rootIndex].subTask.length !== 0">
    <ul class="w-full">
      <li v-for="(item, index) in tasks[rootIndex].subTask" :key="index" class="pl-10 mb-2">
        <div class="flex justify-between">
          <div class="flex items-center">
            <input type="checkbox" :key="index" class="w-6 h-6 mr-4 rounded-xl" />
            <input
              type="text"
              class="container-list-form__input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              :key="index"
              @keyup.enter="_onEnterAddSubTask(index, $event)"
              v-if="item.message === ''"
            />
            <span v-if="item.message !== ''" class="text-gray-700">{{ item.message }}</span>
          </div>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md"
            @click="_removeSubTask(index)"
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
  },
  computed: {
    ...mapState({
      tasks: (state) => state.tasks,
    }),
  },
}
</script>

<style scoped></style>
