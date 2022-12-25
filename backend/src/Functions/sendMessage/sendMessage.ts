export const sendMessage = (cred: any) => {
    cred.on('username', (data: any) => {
        cred.broadcast.emit('username', data)
        console.log(data)
    })

    cred.on('message', (data: any) => {
        cred.broadcast.emit('message:received', data)
        console.log(data.text)
    })
}