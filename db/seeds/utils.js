const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createLookupObject = (rows, key, value) => {
  const lookupObject = {}
  for(const object of rows){
    lookupObject[object[key]] = object[value]
  }
  return lookupObject
}

