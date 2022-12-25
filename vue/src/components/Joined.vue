<script lang="ts" setup>
import io from 'socket.io-client'

let joined: boolean = $ref(false)
const socketInstance = io('http://localhost:1999')
let messages: Array<any> = $ref([])
const currentUser: string = $ref('')

function join() {
  joined = true
  socketInstance.on('message:received', (data) => {
    messages = messages.concat(data)
  })

  socketInstance.on('username', (currentUser) => {
    messages = messages.concat(currentUser)
  })
}
</script>

<template>
  <div flex flex-col w="200px">
    <input v-model="currentUser" h="30px" p2 mb2 text-center font=" 20px bold" type="text" @keyup.enter="join()">
    <button h="30px" font="20px" @click="join()">
      Join
    </button>
  </div>
</template>
