// Test Data
// signup({ username: 'muki', password: 'muki1', fullname: 'Muki Noya', score: 22 })
// login({ username: 'muki', password: 'muki1' })

import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { socketService } from './socket.service'
// SOCKET_EVENT_USER_UPDATED
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
var gWatchedUser = null;

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
    // changeScore
}

// Debug technique
window.userService = userService

async function getUsers() {
    // return await storageService.query('user')
    return httpService.get(`user`)
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    gWatchedUser = user;
    return user;
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function login(logginUser) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === logginUser.username)

    // return _saveLocalUser(user)

    const user = await httpService.post('auth/login', logginUser)
    socketService.emit('set-user-socket', user._id);
    console.log('logginUser', user);
    if (user) return _saveLocalUser(user)
}

async function signup(logginUser) {
    logginUser.imageUrl = 'https://romancebooks.co.il/wp-content/uploads/2019/06/default-user-image.png'
    // const user = await storageService.post('user', logginUser)
    const user = await httpService.post('auth/signup', logginUser)
    socketService.emit('set-user-socket', user._id);
    return _saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.emit('unset-user-socket');
    return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }


function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

(async () => {
    await userService.signup({ fullname: 'Puki Norma', username: 'user1', password: '123', isAdmin: false })
    await userService.signup({ fullname: 'Master Adminov', username: 'admin', password: '123', isAdmin: true })
    await userService.signup({ fullname: 'Muki G', username: 'muki', password: '123' })
})();

// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
    // var user = getLoggedinUser()
    // Dev Helper: Listens to when localStorage changes in OTHER browser

    // Here we are listening to changes for the watched user (comming from other browsers)
    window.addEventListener('storage', async () => {
        if (!gWatchedUser) return;
        const freshUsers = await storageService.query('user')
        const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
        if (!watchedUser) return;
        // if (gWatchedUser.score !== watchedUser.score) {
        //     console.log('Watched user score changed - localStorage updated from another browser')
        //     socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
        // }
        gWatchedUser = watchedUser
    })
})();

// function _getEmptyUser() {
//     return {
//         _id: utilService.makeId(),
//         fullname: '',
//         username: '',
//         password: '',
//         imgUrl: '',
//         mentions: [{
//             id: 'm101',
//             boardId: 'm101',
//             taskId: 't101'
//         }]
//     }
// }

// This is relevant when backend is connected
// (async () => {
//     var user = getLoggedinUser()
//     if (user) socketService.emit('set-user-socket', user._id)
// })();

