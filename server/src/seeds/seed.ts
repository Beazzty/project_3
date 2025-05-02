import db from "../config/connection.js";
import {User} from "../models/index.js";
import cleanDB from "./cleanDB.js";


import UserData from './UserData.json' with { type: "json" };

db.once('open', async () => {
  await cleanDB();

  await User.insertMany(UserData);

  console.log('User seeded!');
  process.exit(0);
});
