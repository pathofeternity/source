export const ATTACK_SKILL = "ATTACK_SKILL"
export const DEFENSE_SKILL = "DEFENSE_SKILL"

export const BATTLE = "BATTLE"
export const ALCHEMY = "ALCHEMY"
export const MEDITATION = "MEDITATION"

export const SKILLS = {
  reaction: {
    name: "React-ion",
    eventType: BATTLE,
    type: ATTACK_SKILL,
    tags: [],
    icon: require("./images/logo.svg")
  },
  reduction: {
    name: "Redux-ion",
    eventType: BATTLE,
    type: DEFENSE_SKILL,
    tags: [],
    icon: require("./images/logo.svg")
  },
  burning: {
    name: "Burn things",
    eventType: BATTLE,
    type: ATTACK_SKILL,
    tags: ["fire"],
    icon: require("./images/logo.svg")
  },
  slashing: {
    name: "Sword techniques",
    eventType: BATTLE,
    type: ATTACK_SKILL,
    tags: ["slashing"],
    icon: require("./images/logo.svg")
  }
}
