const fs = require('fs');
const Tour = require('../../models/tourModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('Connected to MongoDB');
});

const jsonData = JSON.parse(fs.readFileSync(__dirname + '/tours-simple.json'));

const importData = async () => {
  try {
    await Tour.create(jsonData);
    console.log('Data was imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data was deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// deleteData();
importData();
