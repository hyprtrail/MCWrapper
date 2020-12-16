import { getMcServer } from './InitMcServer'

export const mcserver = getMcServer('Default')

/**
 * @typedef {Object} StdoutData
 * @property {string} time
 * @property {string} thread
 * @property {string} level
 * @property {string} message
 */

/**
 * @typedef {object} ChatData
 * @property {string} player
 * @property {string} message
 * @property {string} time
 * @property {string} thread
 * @property {string} level
 */

// Chat Event

/**
 *
 * @param {((data: ChatData)=>void)[]} funcs
 * @param {ChatData} data
 */
function ChatFireEvent(funcs, data) {
  funcs.forEach((func) => func(data))
}

mcserver.registerFireEvent('chat', ChatFireEvent)

// End of Chat Event

// Login Event

/**
 *
 * @typedef {Object} LoginData
 * @property {string} player
 * @property {string} ip
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {string} time
 * @property {string} thread
 * @property {string} level
 */

/**
 *
 * @param {((data: LoginData)=>void)[]} funcs
 * @param {LoginData} data
 */
function LoginFireEvent(funcs, data) {
  funcs.forEach((func) => func(data))
}

mcserver.registerFireEvent('login', LoginFireEvent)

// Started Event
/**
 *
 * @typedef {Object} StartedData
 * @property {string} time
 * @property {string} thread
 * @property {string} level
 */
/**
 *
 * @param {((data: StartedData)=>void)[]} funcs
 * @param {StartedData} data
 */
function StartedFireEvent(funcs, data) {
  funcs.forEach((func) => func(data))
}

mcserver.registerFireEvent('started', StartedFireEvent)

//starting Event
/**
 *
 * @typedef {Object} StartingData
 * @property {string} time
 * @property {string} thread
 * @property {string} level
 */
/**
 *
 * @param {((data: StartingData)=>void)[]} funcs
 * @param {StartingData} data
 */
function StartingFireEvent(funcs, data) {
  funcs.forEach((func) => func(data))
}

mcserver.registerFireEvent('starting', StartingFireEvent)

//Logout Event
/**
 *
 * @typedef {Object} LogoutData
 * @property {string} player
 * @property {string} message
 * @property {string} time
 * @property {string} thread
 * @property {string} level
 */
/**
 *
 * @param {((data: LogoutData)=>void)[]} funcs
 * @param {LogoutData} data
 */
function LogoutFireEvent(funcs, data) {
  funcs.forEach((func) => func(data))
}

mcserver.registerFireEvent('logout', LogoutFireEvent)

// Advancement
/**
 *
 * @typedef {Object} AdvancementData
 * @property {string} player
 * @property {string} advancement
 * @property {string} time
 * @property {string} thread
 * @property {string} level
 */
/**
 *
 * @param {((data: AdvancementData)=>void)[]} funcs
 * @param {AdvancementData} data
 */
function AdvancementFireEvent(funcs, data) {
  funcs.forEach((func) => func(data))
}

mcserver.registerFireEvent('advancement', AdvancementFireEvent)

//Achievement
/**
 *
 * @typedef {Object} AchievementData
 * @property {string} player
 * @property {string} achievement
 * @property {string} time
 * @property {string} thread
 * @property {string} level
 */
/**
 *
 * @param {((data: AchievementData)=>void)[]} funcs
 * @param {AchievementData} data
 */
function AchievementFireEvent(funcs, data) {
  funcs.forEach((func) => func(data))
}

mcserver.registerFireEvent('achievement', AchievementFireEvent)

//death

/**
 *
 * @typedef {Object} DeathData
 * @property {string} player
 * @property {string} type
 * @property {string} by
 * @property {string} deathmsg
 * @property {string} time
 * @property {string} thread
 * @property {string} level
 */
/**
 *
 * @param {((data: DeathData)=>void)[]} funcs
 * @param {DeathData} data
 */
function DeathFireEvent(funcs, data) {
  funcs.forEach((func) => func(data))
}

mcserver.registerFireEvent('death', DeathFireEvent)

function createDeathInfo(message, match, type, msgt) {
  const matches = message.match(match);
  console.log(matches)
  if (msgt==1) {
    const [, deadentity, , attacker] = matches
    return { message, deadentity, attacker, type } 
  }
  else{ // (msgt == 0)
    const [, deadentity, attacker] = matches
    return { message, deadentity, attacker, type } 
  }

}

function getDeathInfoFromMessage(message) {
  // Arrow
  if (message.indexOf('was shot by') !== -1 && message.indexOf('using') !== -1) {
    return createDeathInfo(message, /^(.*?) was shot by (.*?) using (.*)/, 'arrow', 0)
  }
  if (message.indexOf('was shot by') !== -1) {
    return createDeathInfo(message, /^(.*?) was shot by (.*)/, 'arrow', 0)
  }

  // Snowball
  if (message.indexOf('pummeled by') !== -1 && message.indexOf('using') !== -1) {
    return createDeathInfo(message, /^(.*?) was pummeled by (.*?) using (.*)/, 'snowball', 0)
  }
  if (message.indexOf('pummeled by') !== -1) {
    return createDeathInfo(message, /^(.*?) was pummeled by (.*)/, 'snowball', 0)
  }

  // Cactus
  if (message.indexOf('was pricked to death') !== -1) {
    return createDeathInfo(message, /^(.*?) was pricked to death/, 'cactus', 0)
  }
  if (message.indexOf('walked into a cactus whilst trying') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) walked into a cactus whilst trying to escape (.*)/,
      'cactus',
      0
    )
  }

  // Drown
  if (message.indexOf('drowned whilst trying to') !== -1) {
    return createDeathInfo(message, /^(.*?) drowned whilst trying to escape (.*)/, 'drown', 0)
  }
  if (message.indexOf('drowned') !== -1) {
    return createDeathInfo(message, /^(.*?) drowned/, 'drown', 0)
  }

  // Elytra
  if (message.indexOf('experienced kinetic energy whilst') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) experienced kinetic energy whilst trying to escape (.*)/,
      'elytra',
      0
    )
  }
  if (message.indexOf('experienced kinetic energy') !== -1) {
    return createDeathInfo(message, /^(.*?) experienced kinetic energy/, 'elytra', 0)
  }

  // Explosions
  if (message.indexOf('was killed by [Intentional Game Design]') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) was killed by \[Intentional Game Design\]/,
      'explosion',
      0
    )
  }
  if (message.indexOf('was blown up by') !== -1 && message.indexOf('using') !== -1) {
    return createDeathInfo(message, /^(.*?) was blown up by (.*?) using(.*)/, 'explosion', 0)
  }
  if (message.indexOf('was blown up by') !== -1) {
    return createDeathInfo(message, /^(.*?) was blown up by (.*)/, 'explosion', 0)
  }
  if (message.indexOf('blew up') !== -1) {
    return createDeathInfo(message, /^(.*?) blew up/, 'explosion', 0)
  }

  // Falling
  if (message.indexOf('hit the ground too hard whilst trying to escape') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) hit the ground too hard whilst trying to escape (.*)/,
      'falling',
      0
    )
  }
  if (message.indexOf('hit the ground too hard') !== -1) {
    return createDeathInfo(message, /^(.*?) hit the ground too hard/, 'falling', 0)
  }
  if (message.indexOf('fell from a high place') !== -1) {
    return createDeathInfo(message, /^(.*?) fell from a high place/, 'falling', 0)
  }
  if (message.indexOf('fell off a ladder') !== -1) {
    return createDeathInfo(message, /^(.*?) fell off a ladder/, 'falling', 0)
  }
  if (message.indexOf('fell off some vines') !== -1) {
    return createDeathInfo(message, /^(.*?) fell off some vines/, 'falling', 0)
  }
  if (message.indexOf('fell off some weeping vines') !== -1) {
    return createDeathInfo(message, /^(.*?) fell off some weeping vines/, 'falling', 0)
  }
  if (message.indexOf('fell off some twisting vines') !== -1) {
    return createDeathInfo(message, /^(.*?) fell off some twisting vines/, 'falling', 0)
  }
  if (message.indexOf('fell off scaffolding') !== -1) {
    return createDeathInfo(message, /^(.*?) fell off scaffolding/, 'falling', 0)
  }
  if (message.indexOf('fell while climbing') !== -1) {
    return createDeathInfo(message, /^(.*?) fell while climbing/, 'falling', 0)
  }
  if (message.indexOf('death.fell.accident.water') !== -1) {
    return createDeathInfo(message, /^death.fell.accident.water/, 'falling', 0)
  }

  // Falling blocks
  if (message.indexOf('was squashed by a falling anvil whilst fighting') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) was squashed by a falling anvil whilst fighting (.*)/,
      'falling block',
      0
    )
  }
  if (message.indexOf('was squashed by a falling anvil') !== -1) {
    return createDeathInfo(message, /^(.*?) was squashed by a falling anvil/, 'falling block', 0)
  }
  if (message.indexOf('was squashed by a falling block whilst fighting') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) was squashed by a falling block whilst fighting (.*)/,
      'falling block',
      0
    )
  }
  if (message.indexOf('was squashed by a falling block') !== -1) {
    return createDeathInfo(message, /^(.*?) was squashed by a falling block/, 'falling block', 0)
  }
  if (message.indexOf('was skewered by a falling stalactite whilst fighting') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) was skewered by a falling stalactite whilst fighting (.*)/,
      'falling block',
      0
    )
  }
  if (message.indexOf('was skewered by a falling stalactite‌') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) was skewered by a falling stalactite‌/,
      'falling block',
      0
    )
  }

  // Fire
  if (message.indexOf('went up in flames') !== -1) {
    return createDeathInfo(message, /^(.*?) went up in flames/, 'fire', 0)
  }
  if (message.indexOf('walked into fire whilst fighting') !== -1) {
    return createDeathInfo(message, /^(.*?) walked into fire whilst fighting (.*)/, 'fire', 0)
  }
  if (message.indexOf('burned to death') !== -1) {
    return createDeathInfo(message, /^(.*?) burned to death/, 'fire')
  }
  if (message.indexOf('was burnt to a crisp whilst fighting') !== -1) {
    return createDeathInfo(message, /^(.*?) was burnt to a crisp whilst fighting (.*)/, 'fire', 0)
  }

  // Firework rockets
  if (message.indexOf('went off with a bang due to a firework') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) went off with a bang due to a firework fired from (.*?) by (.*?)/,
      'firework rocket',
      1
    )
  }
  if (message.indexOf('went off with a bang') !== -1) {
    return createDeathInfo(message, /^(.*?) went off with a bang/, 'firework rocket')
  }

  // Lava
  if (message.indexOf('tried to swim in lava to escape') !== -1) {
    return createDeathInfo(message, /^(.*?) tried to swim in lava to escape (.*)/, 'lava', 0)
  }
  if (message.indexOf('tried to swim in lava') !== -1) {
    return createDeathInfo(message, /^(.*?) tried to swim in lava/, 'lava', 0)
  }

  // Lightning
  if (message.indexOf('was struck by lightning whilst fighting') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) was struck by lightning whilst fighting (.*)/,
      'lightning',
      0
    )
  }
  if (message.indexOf('was struck by lightning') !== -1) {
    return createDeathInfo(message, /^(.*?) was struck by lightning/, 'lightning', 0)
  }

  // Magma Block
  if (message.indexOf('walked into danger zone due to') !== -1) {
    return createDeathInfo(message, /^(.*?) walked into danger zone due to (.*)/, 'magma block', 0)
  }
  if (message.indexOf('discovered the floor was lava') !== -1) {
    return createDeathInfo(message, /^(.*?) discovered the floor was lava/, 'magma block', 0)
  }

  // Magic (Instant Damage / Evoker Fangs)
  if (message.indexOf('was killed by magic whilst trying to escape') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) was killed by magic whilst trying to escape (.*)/,
      'magic',
      0
    )
  }
  if (message.indexOf('was killed by magic') !== -1) {
    return createDeathInfo(message, /^(.*?) was killed by magic/, 'magic', 0)
  }
  if (message.indexOf('was killed by') !== -1 && message.indexOf('using magic') !== -1) {
    return createDeathInfo(message, /^(.*?) was killed by (.*?) using magic/, 'magic', 0)
  }
  if (message.indexOf('was killed by') !== -1 && message.indexOf('using')) {
    return createDeathInfo(message, /^(.*?) was killed by (.*?) using (.*)/, 'magic', 0)
  }

  // Powder Snow
  if (message.indexOf('was frozen to death by') !== -1) {
    return createDeathInfo(message, /^(.*?) was frozen to death by (.*)/, 'powder snow', 0)
  }
  if (message.indexOf('froze to death') !== -1) {
    return createDeathInfo(message, /^(.*?) froze to death/, 'powder snow', 0)
  }

  // Combat
  if (message.indexOf('was slain by') !== -1 && message.indexOf('using') !== -1) {
    return createDeathInfo(message, /^(.*?) was slain by (.*?) using (.*)/, 'combat', 0)
  }
  if (message.indexOf('was slain by') !== -1) {
    return createDeathInfo(message, /^(.*?) was slain by (.*)/, 'combat', 0)
  }
  if (message.indexOf('was fireballed by') !== -1 && message.indexOf('using') !== -1) {
    return createDeathInfo(message, /^(.*?) was fireballed by (.*?) using (.*)/, 'combat', 0)
  }
  if (message.indexOf('was fireballed by ') !== -1) {
    return createDeathInfo(message, /^(.*?) was fireballed by (.*)/, 'combat', 0)
  }
  if (message.indexOf('was stung') !== -1) {
    return createDeathInfo(message, /^(.*?) was stung to death/, 'combat', 0)
  }
  if (message.indexOf('death.attack.sting.item') !== -1) {
    return createDeathInfo(message, /^death.attack.sting.item/, 'combat', 0)
  }
  if (message.indexOf('was shot by a skull from') !== -1) {
    return createDeathInfo(message, /^(.*?) was shot by a skull from (.*)/, 'combat', 0)
  }
  if (message.indexOf('death.attack.witherSkull.item') !== -1) {
    return createDeathInfo(message, /^death.attack.witherSkull.item/, 'combat', 0)
  }

  // Starving
  if (message.indexOf('starved to death whilst fighting') !== -1) {
    return createDeathInfo(message, /^(.*?) starved to death whilst fighting (.*)/, 'starving', 0)
  }
  if (message.indexOf('starved to death') !== -1) {
    return createDeathInfo(message, /^(.*?) starved to death/, 'starving', 0)
  }

  // Suffocation
  if (message.indexOf('suffocated in a wall whilst fighting') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) suffocated in a wall whilst fighting (.*)/,
      'suffocation',
      0
    )
  }
  if (message.indexOf('suffocated in a wall') !== -1) {
    return createDeathInfo(message, /^(.*?) suffocated in a wall/, 'suffocation', 0)
  }
  if (message.indexOf('was squished too much') !== -1) {
    return createDeathInfo(message, /^(.*?) was squished too much/, 'suffocation', 0)
  }
  if (message.indexOf('was squashed by') !== -1) {
    return createDeathInfo(message, /^(.*?) was squashed by (.*)/, 'suffocation', 0)
  }

  // Sweet Berry Bushes
  if (message.indexOf('was poked to death by a sweet berry bush whilst') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) was poked to death by a sweet berry bush whilst trying to escape (.*)/,
      'sweet berry bushes',
      0
    )
  }
  if (message.indexOf('was poked to death by a sweet berry bush') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) was poked to death by a sweet berry bush/,
      'sweet berry bushes',
      0
    )
  }

  // Thorns enchantment
  if (message.indexOf('was killed by') !== -1 && message.indexOf('trying to hurt') !== -1) {
    return createDeathInfo(message, /^(.*?) was killed by (.*?) trying to hurt (.*)/, 'thorns', 1)
  }
  if (message.indexOf('was killed trying to hurt') !== -1) {
    return createDeathInfo(message, /^(.*?) was killed trying to hurt (.*)/, 'thorns', 0)
  }

  // Trident
  if (message.indexOf('was impaled by') !== -1 && message.indexOf('with') !== -1) {
    return createDeathInfo(message, /^(.*?) was impaled by (.*?) with (.*)/, 'trident', 0)
  }
  if (message.indexOf('was impaled by') !== -1) {
    return createDeathInfo(message, /^(.*?) was impaled by (.*)/, 'trident', 0)
  }

  // Void
  if (message.indexOf('fell out of the world') !== -1) {
    return createDeathInfo(message, /^(.*?) fell out of the world/, 'void', 0)
  }
  if (message.indexOf("didn't want to live in the same world as") !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) didn\'t want to live in the same world as (.*)/,
      'void',
      0
    )
  }

  // Wither effect
  if (message.indexOf('withered away whilst fighting') !== -1) {
    return createDeathInfo(message, /^(.*?) withered away whilst fighting (.*)/, 'wither effect', 0)
  }
  if (message.indexOf('withered away') !== -1) {
    return createDeathInfo(message, /^(.*?) withered away/, 'wither effect', 0)
  }

  // Unsendable death messages
  // NOTE: These death messages are technically able to appear, but their conditions cannot be met in vanilla Minecraft.

  if (message.indexOf('was roasted in dragon breath by') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) was roasted in dragon breath by (.*)/,
      'dragon breath',
      0
    )
  }

  if (message.indexOf('was roasted in dragon breath') !== -1) {
    return createDeathInfo(message, /^(.*?) was roasted in dragon breath/, 'dragon breath', 0)
  }

  if (message.indexOf('death.attack.dryout.player') !== -1) {
    return createDeathInfo(message, /^death.attack.dryout.player/, 'attack.dryout', 0)
  }

  if (message.indexOf('death.attack.dryout') !== -1) {
    return createDeathInfo(message, /^death.attack.dryout/, 'attack.dryout', 0)
  }

  if (message.indexOf('died because of') !== -1) {
    return createDeathInfo(message, /^(.*?) died because of (.*)/, 'died', 0)
  }

  if (message.indexOf('died') !== -1) {
    return createDeathInfo(message, /^(.*?) died/, 'died', 0)
  }

  // Unused death messages
  // NOTE: These death messages have no code to make them appear, so they appear only in the en_us.json file.

  if (message.indexOf('was doomed to fall by') !== -1 && message.indexOf('using') !== -1) {
    return createDeathInfo(message, /^(.*?) was doomed to fall by (.*?) using (.*)/, 'falling', 0)
  }
  if (message.indexOf('was doomed to fall by') !== -1) {
    return createDeathInfo(message, /^(.*?) was doomed to fall by (.*)/, 'falling', 0)
  }
  if (message.indexOf('was doomed to fall') !== -1) {
    return createDeathInfo(message, /^(.*?) was doomed to fall/, 'falling', 0)
  }

  if (
    message.indexOf('fell too far and was finished by') !== -1 &&
    message.indexOf('using') !== -1
  ) {
    return createDeathInfo(
      message,
      /^(.*?) fell too far and was finished by (.*?) using (.*)/,
      'combat',
      0
    )
  }
  if (message.indexOf('fell too far and was finished by') !== -1) {
    return createDeathInfo(message, /^(.*?) fell too far and was finished by (.*)/, 'combat', 0)
  }

  if (message.indexOf('was stung to death by') !== -1) {
    return createDeathInfo(message, /^(.*?) was stung to death by (.*)/, 'combat', 0)
  }

  if (message.indexOf('went off with a bang whilst fighting') !== -1) {
    return createDeathInfo(message, /^(.*?) went off with a bang whilst fighting (.*)/, 'combat', 0)
  }

  if (message.indexOf('was killed by even more magic') !== -1) {
    return createDeathInfo(message, /^(.*?) was killed by even more magic/, 'combat', 0)
  }

  // Temporary
  // These death messages existed only in Java Edition 3D Shareware v1.34.

  if (message.indexOf('was too soft for this world') !== -1) {
    return createDeathInfo(message, /^(.*?) was too soft for this world/, 'world', 0)
  }

  if (message.indexOf('was too soft for this world (') !== -1) {
    return createDeathInfo(
      message,
      /^(.*?) was too soft for this world \((.*?) helped\)/,
      'world',
      0
    )
  }

  return { deadentity: 'unknown', attacker: 'unknown', type: 'unknown' }
}

// Data Event

mcserver.registerFireEvent(
  'data',
  /**
   *
   * @param {Function[]} events
   * @param {StdoutData} data
   */
  (events, data) => {
    events.forEach((event) => event(data))
  }
)

const chatMatch = (data) => data.message.match(/^<(.*?)> (.*)/)
const startedMatch = (data) => data.message.startsWith('Done (')
const staringMatch = (data) => data.message.startsWith('Starting Minecraft server on')
const loginMatch = (data) =>
  data.message.match(/^(.*?)\[\/(.*?)\] logged in with entity id (.*?) at \((.*?), (.*?), (.*?)\)/)
const logoutMatch = (data) => data.message.match(/^(.*?) lost connection: (.*)/)
const advancementMatch = (data) => data.message.match(/^(.*?) has made the advancement \[(.*?)\]/)
const achievementMatch = (data) =>
  data.message.match(/^(.*?) has completed the challenge \[([\w\s]+)\]/)

mcserver.addEventListener('data', (data) => {
  console.log(data)

  const chat = chatMatch(data)
  const started = startedMatch(data)
  const starting = staringMatch(data)
  const login = loginMatch(data)
  const logout = logoutMatch(data)
  const advancem = advancementMatch(data)
  const achievem = achievementMatch(data)

  if (chat) {
    const [, player, message] = chat
    const { time, thread, level } = data
    /** @type {ChatData} */
    const chatmessage = {
      player,
      message,
      time,
      thread,
      level,
    }
    mcserver.fireEvent('chat', chatmessage)
  } else if (started) {
    //started
    const { time, thread, level } = data
    /** @type {startedData} */
    const startedmessage = {
      time,
      thread,
      level,
    }
    mcserver.fireEvent('started', startedmessage)
  } else if (starting) {
    //starting
    const { time, thread, level } = data
    /** @type {startingData} */
    const startingmessage = {
      time,
      thread,
      level,
    }
    mcserver.fireEvent('starting', startingmessage)
  } else if (login) {
    //login
    const [, player, ip, entityid, x, y, z] = login
    const { time, thread, level } = data
    /** @type {LoginData} */
    const loginmessage = {
      player,
      ip,
      entityid: parseInt(entityid),
      x: parseFloat(x),
      y: parseFloat(y),
      z: parseFloat(z),
      time,
      thread,
      level,
    }
    mcserver.fireEvent('login', loginmessage)
  } else if (logout  && !(logout[1].startsWith('com.mojang.authlib.GameProfile'))) {
    //logout
    const [, player, reason] = logout
    const { time, thread, level } = data
    /** @type {LogoutData} */
    const logoutmessage = {
      player,
      reason,
      time,
      thread,
      level,
    }
    mcserver.fireEvent('logout', logoutmessage)
  } else if (advancem) {
    //Advancement
    const [, player, advancement] = advancem
    const { time, thread, level } = data
    /** @type {AdvancementData} */
    const advancemmessage = {
      player,
      advancement,
      time,
      thread,
      level,
    }
    mcserver.fireEvent('advancement', advancemmessage)
  } else if (achievem) {
    //Achievement
    const [, player, achievement] = achievem
    const { time, thread, level } = data
    /** @type {AchievementData} */
    const achievemmessage = {
      player,
      achievement,
      time,
      thread,
      level,
    }
    mcserver.fireEvent('achievement', achievemmessage)
  } else {
    //Death

    const deathinfo = getDeathInfoFromMessage(data.message)
    if (deathinfo.deadentity != 'unknown') {
      const deathdata = { ...data, ...deathinfo }
      mcserver.fireEvent('death', deathdata)
    } else {
      console.log('UNHANDLED DATA::')
      console.log(data)
    }
  }
})
