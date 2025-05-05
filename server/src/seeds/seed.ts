import db from "../config/connection.js";
import { User, VocabSet } from "../models/index.js";
import cleanDB from "./cleanDB.js";

import bcrypt from 'bcrypt';
import UserData from './UserData.json' with { type: "json" };
import VocabData from './VocabData.json' with { type: "json" };

db.once('open', async () => {
  await cleanDB();

  const normalizedUsers = await Promise.all(
    UserData.map(async user => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
      skillLevel: user.skillLevel.toUpperCase(), // This line normalizes the case
    }))
  );

  await User.insertMany(normalizedUsers);
  await VocabSet.insertMany(VocabData);

  console.log('User seeded!');
  console.log('Vocab seeded!');
  process.exit(0);
});
