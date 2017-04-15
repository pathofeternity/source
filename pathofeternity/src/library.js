const tierNames = ["Essence", "Foundation", "Azoth", "Nascent Soul", "Demigod"];

export function levelName (cultivation) {
  var levelNumber = Math.floor(Math.log10(Math.max(1,cultivation - 1)));
  var tier = Math.floor(levelNumber / 10);
  var level = levelNumber % 10;
  return tierNames[tier] + " " + level;
}
