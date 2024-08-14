import { useState } from "react";
import dataFile from "../npcData.json";
// import * as fs from "fs";
// const fs = require("fs");
// import { writeFile } from "fs-web";

interface NpcData {
  name: string;
}

/**
 * Reads the json data file and returns an object with all the data.
 *
 * @param {string} fileName  Name of the data file without extension
 * @return {object} Object with the data
 */
const readData = (fileName: string) => {
  try {
    let rawData = fs.readFileSync(fileName + ".json", "utf8");
    let obj = JSON.parse(rawData);
    return obj;
  } catch (err) {
    console.log("There has been an error reading the data file: " + err);
  }
};

/**
 * Gets the object with the updated data and writes it back to the file.
 *
 * @param {object} obj	The object with the updated data
 * @param {string} fileName Name of the data file without extension
 */
const writeData = (obj: NpcData, fileName: string) => {
  let json = JSON.stringify(obj, null, 2);
  fs.writeFileSync(fileName + ".json", json, "utf8");
};

export const useNpcData = () => {
  const [npcData, setNpcData] = useState<NpcData>(dataFile);

  const updateField = (field: keyof NpcData, value: string) => {
    setNpcData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    saveData();
  };

  const saveData = () => {
    writeData(npcData, "npcData");
  };

  const loadData = (): NpcData => {
    setNpcData(readData("npcData"));
    return npcData;
  };

  return { npcData, updateField, saveData, loadData };
};
