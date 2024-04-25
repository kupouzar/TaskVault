const fs = require("fs");
const dbPath = './db.json';

function load() {
  try{
    var data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    return data;
  }
  catch(error){
    return error.message;
  }
}

function save(data){
    const saveData = JSON.stringify(data);
    fs.writeFile(dbPath, saveData, (error) => {
      if(error) {
        return error;
      } else {
        return saveData;
      }
    });
  }

module.exports = {load, save};