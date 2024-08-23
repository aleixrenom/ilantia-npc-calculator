import { NpcData } from "../types";
import {
  calcArcheryStats,
  calcDefense,
  calcMeleeDamage,
  calcModifier,
  calcRank,
} from "../utils/calculate";

const StatblockDisplay = (npcData: { data: NpcData }) => {
  const {
    name,
    initBody,
    initDex,
    initMind,
    initSoul,
    alchemyPl,
    archeryPl,
    magicPl,
    meleePl,
    armor,
    extraArcheryDmg,
    extraArcheryRange,
    extraHp,
    extraIp,
    extraMeleeDmg,
    speeds,
  } = npcData.data;

  const bodyStat = initBody + calcRank(meleePl);
  const dexStat = initDex + calcRank(archeryPl);
  const mindStat = initMind + calcRank(alchemyPl);
  const soulStat = initSoul + calcRank(magicPl);

  return (
    <>
      <h1>Statblock</h1>
      <h2>{name}</h2>
      <h3>Stats</h3>
      <p>
        Body: {bodyStat} ({calcModifier(bodyStat, true)}){" - "}
        Dexterity: {dexStat} ({calcModifier(dexStat, true)}){" - "}
        Mind: {mindStat} ({calcModifier(mindStat, true)}){" - "}
        Soul: {soulStat} ({calcModifier(soulStat, true)})
      </p>
      <p>
        HP:{" "}
        {2 +
          (meleePl + archeryPl + alchemyPl + magicPl) * 2 +
          meleePl +
          extraHp}{" "}
        - Defense:{" "}
        {calcDefense(
          calcModifier(bodyStat) as number,
          calcModifier(dexStat) as number,
          armor
        )}{" "}
        - Speed: {speeds}
      </p>
      <h3>Skills (PL {meleePl + archeryPl + alchemyPl + magicPl})</h3>
      <p>
        Melee rank {calcRank(meleePl)}
        {" - "}
        {calcMeleeDamage(calcRank(meleePl), true, extraMeleeDmg)}
      </p>
      <p>
        Archery rank {calcRank(archeryPl)}
        {" - "}
        {
          calcArcheryStats(
            calcRank(archeryPl),
            true,
            extraArcheryDmg,
            extraArcheryRange
          ) as string
        }
      </p>
      <p>
        Alchemy rank {calcRank(alchemyPl)}
        {" - "}
        {"Mak IP: " + alchemyPl * 2}
      </p>
      <p>
        Natural magic rank {calcRank(magicPl)}
        {" - "}
        {"Mak IP: " + magicPl * 2}
      </p>
    </>
  );
};

export default StatblockDisplay;
