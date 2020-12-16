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

