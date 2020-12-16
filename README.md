MCWrapper
============

Inspired by scriptserver (https://github.com/garrettjoecox/scriptserver)

Made together with https://github.com/TTSKarlsson

## What's MCWrapper?
A Wrapper for Minecraft server written in node.js.
Using child_process to open the server in another thread and read the console.


Todo:
```
console.send
stopserver
```

## What version of Minecraft does it work with?

It relies format of the output log, it should work with pretty much any version of Java Minecraft dating back to 2012.

#### Prerequisites
- [NodeJS](https://nodejs.org/en/) (^8.0.0 recommended)
- NodeJS knowledge.

#### Setup
Run `npm install MCWrapper`.
add the server.jar into the "/Minecraft" folder

```javascript
import {mcserver} from './mcserver'

mcserver.startServer()
```

You start your server with `mcserver.startServer()`

Finally, you can run the server with node using
```bash
node server.js
```

## Using predefined messeges

```javascript
import {mcserver} from './mcserver'


//matches every line
mcserver.addEventListener('data', (data) => {
  /** @type {import('./mcserver').StdoutData} */
  console.log(`Data:`)
  console.log(data)
})

//matches chat
mcserver.addEventListener('chat', (data) => {
  /** @type {import('./mcserver').ChatData} */
  console.log(`Chat:`)
  console.log(data)
})

//matches when someone logs in
mcserver.addEventListener('login', (data) => {
  /** @type {import('./mcserver').LoginData} */
  console.log(`Login:`)
  console.log(data)
})

//matches when someone logsout
mcserver.addEventListener('logout', (data) => {
  /** @type {import('./mcserver').LogoutData} */
  console.log(`Logout:`)
  console.log(data)
})

//matches when server is starting up
mcserver.addEventListener('starting', (data) => {
  /** @type {import('./mcserver').StartingData} */
  console.log(`SERVER STARTING:`)
  console.log(data)
})

//matches when server has started
mcserver.addEventListener('started', (data) => {
  /** @type {import('./mcserver').StartedData} */
  console.log(`SERVER HAS STARTED:`)
  console.log(data)
})

//matches if someone aquires an achievement (not tested)
mcserver.addEventListener('achievement', (data) => {
  /** @type {import('./mcserver').AchievementData} */
  console.log(`Achievement:`)
  console.log(data)
})

//matches if someone aquires an advancement (the new achievement)
mcserver.addEventListener('advancement', (data) => {
  /** @type {import('./mcserver').AdvancementData} */
  console.log(`Advancement:`)
  console.log(data)
})

//matches if someine dies
mcserver.addEventListener('death', (data) => {
  /** @type {import('./mcserver').DeathData} */
  console.log(`Death:`)
  console.log(data)
})

mcserver.startServer()

```


### 1) addEventListener('chat', callback(data))
```
data {
 {string} time
 {string} thread
 {string} level
 {string} message
}
```

### 2) addEventListener('chat', callback(data))
```
data {
  {string} player
  {string} message
  {string} time
  {string} thread
  {string} level
}
```
### 3) addEventListener('login', callback(data))
```
data {
  {string} player
  {string} ip
  {number} x
  {number} y
  {number} z
  {string} time
  {string} thread
  {string} level
}
```
### 4) addEventListener('started', callback(data))
```
data {
  {string} time
  {string} thread
  {string} level
}
```
### 5) addEventListener('starting', callback(data))
```
data {
  {string} time
  {string} thread
  {string} level
}
```
### 6) addEventListener('logout', callback(data))
```
data {
  {string} player
  {string} message
  {string} time
  {string} thread
  {string} level
}
```
### 7) addEventListener('advancement', callback(data))
```
data {
  {string} player
  {string} advancement
  {string} time
  {string} thread
  {string} level
}
```
### 8) addEventListener('achievement', callback(data))
```
data {
  {string} player
  {string} achievement
  {string} time
  {string} thread
  {string} level
}
```
### 9) addEventListener('death', callback(data))
```
data {
  {string} player
  {string} type
  {string} by
  {string} deathmsg
  {string} time
  {string} thread
  {string} level
}
```
