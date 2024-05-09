export const reConnection = (socket, timeout = 60000) => {
    setTimeout(() => {
        socket.onopen()
        // 只有不等1的时候 才会被调用
        if(socket.readystate !== 1)
            reConnection(socket, timeout)
    }, timeout)
}