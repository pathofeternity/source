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
    xpRequiredFunction: (level) => 10,
    icon: require("./images/logo.svg"),
    maxLevel: 2
  },
  slashing: {
    name: "Sword techniques",
    description: "Attack with Sword",
    eventType: BATTLE,
    type: ATTACK_SKILL,
    tags: [SLASHING],
    xpRequiredFunction: (level) => 10,
    icon: require("./images/logo.svg"),
    maxLevel: 2
  },
  cultivationProficiency: {
    name: "Cultivation Proficiency",
    description: "Increases cultivation training rate by 50% per level, compounding",
    eventType: PASSIVE,
    type: PASSIVE,
    icon: require("./images/logo.svg"),
    xpRequiredFunction: (level) => 10 * Math.pow(1.3, level),
    multiplierFunction: (level) => {return {cultivation: Math.pow(1.5, level),}},
    maxLevel: NaN
  }
}

export const isMaxLevel = (skillName) => {
  return {
    level: 0,

  }
}
