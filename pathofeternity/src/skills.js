export const ATTACK_SKILL = "ATTACK_SKILL"
export const DEFENSE_SKILL = "DEFENSE_SKILL"

export const BATTLE = "BATTLE"
export const ALCHEMY = "ALCHEMY"
export const MEDITATION = "MEDITATION"

export const skills = {
  reaction: {
    name: "React-ion",
    eventType: BATTLE,
    type: ATTACK_SKILL,
    icon: require("./images/logo.svg")
  },
  reduction: {
    name: "Redux-ion",
    eventType: BATTLE,
    type: DEFENSE_SKILL,
    icon: require("./images/logo.svg")
  }
}
