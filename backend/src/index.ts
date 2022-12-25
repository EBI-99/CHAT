import 'dotenv/config'
import express, { Application } from 'express'
import * as http from 'http'
import * as io from 'socket.io'
import SetupOther from './Utils/SetupOther'
import { disconnect } from './Functions/disconnect/disconnect'
import { sendMessage } from './Functions/sendMessage/sendMessage'
import { connect, ConnectOptions, set } from 'mongoose'


const app: Application = express()
export const server = http.createServer(app)
const ioSocket = new io.Server(server, {
    cors:{
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
})

SetupOther(app)


ioSocket.on('connection', (cred) => {
    cred.on('username', (data) => {
        cred.broadcast.emit('message:received', data)
        
    })    
    sendMessage(cred)   
    disconnect(cred)
})

// MongoDB connection
const port = process.env.PORT || 1999 as number
set('strictQuery', false)
connect(process.env.MongoURL as string, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
    .then(() => {
        server.listen(port, () => {
            console.log('server listening on http://localhost:1999')
        })
}).catch(err => console.log(err))
