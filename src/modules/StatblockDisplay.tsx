import { NpcData } from "../types";
import {
  calcArcheryStats,
  calcDefense,
  calcMeleeDamage,
  calcModifier,
  calcRank,
} from "../utils/calculate";
import Typography from "@mui/material/Typography";

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
      <Typography variant="h3" gutterBottom>
        Statblock
      </Typography>
      <Typography variant="h5" gutterBottom>
        {name}
      </Typography>
      <Typography variant="h6">Stats</Typography>
      <Typography>
        Body: {bodyStat} ({calcModifier(bodyStat, true)}){" - "}
        Dexterity: {dexStat} ({calcModifier(dexStat, true)}){" - "}
        Mind: {mindStat} ({calcModifier(mindStat, true)}){" - "}
        Soul: {soulStat} ({calcModifier(soulStat, true)})
      </Typography>
      <Typography gutterBottom>
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
      </Typography>
      <Typography variant="h6">
        Skills (PL {meleePl + archeryPl + alchemyPl + magicPl})
      </Typography>
      <Typography>
        Melee rank {calcRank(meleePl)}
        {" - "}
        {calcMeleeDamage(calcRank(meleePl), true, extraMeleeDmg)}
      </Typography>
      <Typography>
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
      </Typography>
      <Typography>
        Alchemy rank {calcRank(alchemyPl)}
        {" - "}
        {"Mak IP: " + alchemyPl * 2}
      </Typography>
      <Typography>
        Natural magic rank {calcRank(magicPl)}
        {" - "}
        {"Mak IP: " + magicPl * 2}
      </Typography>
    </>
  );
};

export default StatblockDisplay;
