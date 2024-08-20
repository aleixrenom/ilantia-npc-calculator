import { useState } from "react";
// import dataFile from "../npcData.json";
// import * as fs from "fs";
// const fs = require("fs");
// import { writeFile } from "fs-web";

interface NpcData {
  name: string;
}

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
  const initialData = loadFromLocalStorage<NpcData>("npcData") || {
    name: "Name",
  };
  const [npcData, setNpcData] = useState<NpcData>(initialData);

  const updateField = (field: keyof NpcData, value: string) => {
    setNpcData((prevData) => {
      const updatedData = {
        ...prevData,
        [field]: value,
      };
      saveToLocalStorage("npcData", updatedData);
      return updatedData;
    });
  };

  const updateData = (data: NpcData) => {
    setNpcData(data);
    saveToLocalStorage("npcData", data);
    return data;
  };

  return { npcData, updateField, updateData };
};
