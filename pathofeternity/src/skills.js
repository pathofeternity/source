export const ATTACK_SKILL = "ATTACK_SKILL"
export const DEFENSE_SKILL = "DEFENSE_SKILL"

export const BATTLE = "BATTLE"
export const ALCHEMY = "ALCHEMY"
export const MEDITATION = "MEDITATION"
export const PASSIVE = "PASSIVE"

export const SLASHING = "slashing"
export const FIRE = "fire"

export const SKILLS = {
  burning: {
    name: "Burn things",
    description: "Does nothing",
    eventType: BATTLE,
    type: ATTACK_SKILL,
    tags: [FIRE],
    icon: require("./images/logo.svg")
  },
  slashing: {
    name: "Sword techniques",
    description: "Attack with Sword",
    eventType: BATTLE,
    type: ATTACK_SKILL,
    tags: [SLASHING],
    icon: require("./images/logo.svg")
  },
  samplePassive: {
    name: "Heavy Lifting",
    description: "Increases body training rate by 50%",
    eventType: PASSIVE,
    type: PASSIVE,
    icon: require("./images/logo.svg"),
    multiplier: {body: 1.5}
  },
  cultivationProficiency: {
    name: "Cultivation Proficiency",
    description: "Increases cultivation training rate by 25% per level, compounding",
    eventType: PASSIVE,
    type: PASSIVE,
    icon: require("./images/logo.svg"),
    xpRequiredFunction: (level) => 10 * Math.pow(1.3, level),
    multiplierFunction: (level) => {return {body: 10*level}},
    maxLevel: NaN
  }
}

export const isMaxLevel = (skillName) => {
  return {
    level: 0,

  }
}
