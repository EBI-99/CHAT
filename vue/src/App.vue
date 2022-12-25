<script setup lang="ts">
import io from 'socket.io-client'

let joined: boolean = $ref(false)
const currentUser: string = $ref('')
let text: string = $ref('')
let messages: Array<any> = $ref([])
const socketInstance = io('http://localhost:1999')

function join() {
  joined = true
  socketInstance.on('message:received', (data) => {
    messages = messages.concat(data)
  })

  socketInstance.on('username', (currentUser) => {
    messages = messages.concat(currentUser)
  })
}
function sendMessage() {
  AddMSG()
  text = ''
}
function AddMSG() {
  const message: any = {
    id: new Date().getTime(),
    text,
    user: currentUser,
  }
  messages = messages.concat(message)
  socketInstance.on('username', (currentUser) => {
    messages = messages.concat(currentUser)
  })
  socketInstance.emit('message', message)
}
</script>

<template>
  <Navbar />
  <div v-if="!joined" w-full h-full flex justify-center fixed pt="150px">
    <div flex flex-col w="200px">
      <input
        v-model="currentUser" h="30px" p2 mb2 text-center
        font=" 20px bold"
        type="text"
        @keyup.enter="join()"
      >
      <button
        h="30px" font="20px" bg-red
        @click="join()"
      >
        Join
      </button>
    </div>
  </div>
  <div v-if="joined" p5>
    <div>
      <div v-for="sms of messages" :key="sms.id">
        <b>{{ sms.user }}</b>
        : {{ sms.text }}
      </div>
    </div>
    <div>
      <textarea
        v-model="text"
        w="9.5/10"
        absolute h="70px" p="10px" b-0 @keyup.enter="sendMessage"
      />
    </div>
  </div>
</template>

<style>
html{
  background: #e8e8e8;
  color: #202020
}

html.dark{
  background: #222;
  color: #e8e8e8;
  color-scheme: dark;
}
</style>
