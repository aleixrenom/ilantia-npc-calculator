import { useState } from "react";
import defaultValues from "./npcDefaultValues.json";
import { NpcData } from "../types";

/** Turns the incoming strings into numbers wherever needed and validates them. */
const parseData = (data: NpcData): NpcData => {
  return {
    name: data.name,
    initBody: isNaN(Number(data.initBody))
      ? defaultValues.initBody
      : Number(data.initBody),
    initDex: isNaN(Number(data.initDex))
      ? defaultValues.initDex
      : Number(data.initDex),
    initMind: isNaN(Number(data.initMind))
      ? defaultValues.initMind
      : Number(data.initMind),
    initSoul: isNaN(Number(data.initSoul))
      ? defaultValues.initSoul
      : Number(data.initSoul),
    meleePl: isNaN(Number(data.meleePl))
      ? defaultValues.meleePl
      : Number(data.meleePl),
    archeryPl: isNaN(Number(data.archeryPl))
      ? defaultValues.archeryPl
      : Number(data.archeryPl),
    alchemyPl: isNaN(Number(data.alchemyPl))
      ? defaultValues.alchemyPl
      : Number(data.alchemyPl),
    magicPl: isNaN(Number(data.magicPl))
      ? defaultValues.magicPl
      : Number(data.magicPl),
    armor: isNaN(Number(data.armor)) ? defaultValues.armor : Number(data.armor),
    extraHp: isNaN(Number(data.extraHp))
      ? defaultValues.extraHp
      : Number(data.extraHp),
    extraMeleeDmg: isNaN(Number(data.extraMeleeDmg))
      ? defaultValues.extraMeleeDmg
      : Number(data.extraMeleeDmg),
    extraArcheryDmg: isNaN(Number(data.extraArcheryDmg))
      ? defaultValues.extraArcheryDmg
      : Number(data.extraArcheryDmg),
    extraArcheryRange: isNaN(Number(data.extraArcheryRange))
      ? defaultValues.extraArcheryRange
      : Number(data.extraArcheryRange),
    extraIp: isNaN(Number(data.extraIp))
      ? defaultValues.extraIp
      : Number(data.extraIp),
    speeds: data.speeds,
  };
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
  const jsonString = localStorage.getItem(key);
  if (jsonString) {
    return JSON.parse(jsonString) as T;
  }
  return null;
};

export const saveToLocalStorage = (key: string, data: object) => {
  const jsonString = JSON.stringify(data);
  localStorage.setItem(key, jsonString);
};

export const useNpcData = () => {
  const initialData = loadFromLocalStorage<NpcData>("npcData") || defaultValues;
  // const initialData = defaultValues;
  const [npcData, setNpcData] = useState<NpcData>(initialData);

  const updateField = (field: keyof NpcData, value: string) => {
    setNpcData((prevData) => {
      const updatedData = {
        ...prevData,
        [field]: value,
      };
      const parsedData = parseData(updatedData);
      saveToLocalStorage("npcData", parsedData);
      return parsedData;
    });
  };

  const updateData = (data: NpcData) => {
    setNpcData(data);
    saveToLocalStorage("npcData", data);
    return data;
  };

  return { npcData, updateField, updateData };
};
