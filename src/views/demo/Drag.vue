<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable, VueDraggable } from 'vue-draggable-plus'

const list = ref([
  {
    name: 'Joao',
    id: 1,
  },
  {
    name: 'Jean',
    id: 2,
  },
  {
    name: 'Johanna',
    id: 3,
  },
  {
    name: 'Juan',
    id: 4,
  },
])
const el = ref()

const { start } = useDraggable(el, list, {
  animation: 150,
  ghostClass: 'ghost',
  onStart() {
    console.log('start')
  },
  onUpdate() {
    console.log('update')
  },
})

const list1 = ref([
  {
    name: 'Joao',
    id: '1',
  },
  {
    name: 'Jean',
    id: '2',
  },
  {
    name: 'Johanna',
    id: '3',
  },
  {
    name: 'Juan',
    id: '4',
  },
])
const list2 = ref(
  list1.value.map(item => ({
    name: `${item.name}-2`,
    id: `${item.id}-2`,
  })),
)
function onUpdate() {
  console.log('update')
}
function onAdd() {
  console.log('add')
}
function remove() {
  console.log('remove')
}
</script>

<template>
  <PageWrapper preset="card">
    <div class="flex flex-col gap-2">
      <div>
        <n-button clasa @click="start()">
          start
        </n-button>
      </div>
      <div class="flex">
        <div
          ref="el"
          class="h-300px w-300px flex flex-col gap-2 rounded bg-gray-500/5 p-4"
        >
          <div
            v-for="item in list"
            :key="item.id"
            class="h-30 cursor-move rounded bg-gray-500/5 p-3"
          >
            {{ item.name }}
          </div>
        </div>
        <preview-list :list="list" />
      </div>
      <div class="flex">
        <VueDraggable
          v-model="list1"
          class="h-300px w-300px flex flex-col gap-2 overflow-auto rounded bg-gray-500/5 p-4"
          :animation="150"
          ghost-class="ghost"
          group="people"
          @update="onUpdate"
          @add="onAdd"
          @remove="remove"
        >
          <div
            v-for="item in list1"
            :key="item.id"
            class="h-30 cursor-move rounded bg-gray-500/5 p-3"
          >
            {{ item.name }}
          </div>
        </VueDraggable>
        <VueDraggable
          v-model="list2"
          class="h-300px w-300px flex flex-col gap-2 overflow-auto rounded bg-gray-500/5 p-4"
          :animation="150"
          group="people"
          ghost-class="ghost"
          @update="onUpdate"
          @add="onAdd"
          @remove="remove"
        >
          <div
            v-for="item in list2"
            :key="item.id"
            class="h-30 cursor-move rounded bg-gray-500/5 p-3"
          >
            {{ item.name }}
          </div>
        </VueDraggable>
      </div>
      <div class="flex">
        <VueDraggable v-model="list" target=".sort-target" :animation="150">
          <n-table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody class="sort-target">
              <tr v-for="item in list" :key="item.name" class="cursor-move">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
              </tr>
            </tbody>
          </n-table>
        </VueDraggable>
      </div>
    </div>
  </PageWrapper>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
