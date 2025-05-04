import db from '../config/connection.js';

export default async () => {
  try {
     // Get all collections
     const collections = await db.listCollections();

     // Create an array of collection names and drop each collection
     collections
       .map((collection) => collection.name)
       .forEach(async (collectionName) => {
         db.dropCollection(collectionName);
       });
  } catch (err) {
    throw err;
  }
 }
