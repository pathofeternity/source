export const ATTACK_SKILL = "ATTACK_SKILL"
export const DEFENSE_SKILL = "DEFENSE_SKILL"

export const BATTLE = "BATTLE"
export const ALCHEMY = "ALCHEMY"
export const MEDITATION = "MEDITATION"
export const PASSIVE = "PASSIVE"

export const SLASHING = "slashing"
export const FIRE = "fire"

export const SKILLS = {
  reaction: {
    name: "React-ion",
    description: "Does nothing",
    eventType: BATTLE,
    type: ATTACK_SKILL,
    tags: [],
    icon: require("./images/logo.svg")
  },
  reduction: {
    name: "Redux-ion",
    description: "Does nothing",
    eventType: BATTLE,
    type: DEFENSE_SKILL,
    tags: [],
    icon: require("./images/logo.svg")
  },
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
    icon: require("./images/logo.svg"),
    multiplier: {body: 1.5}
  }

}
