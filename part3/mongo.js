const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@phonebook.2281q.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose.connect(url).then((result) => {
  console.log("connected");

  if (process.argv.length > 3) {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    });

    return person.save().then(() => {
      console.log(`added ${person.name} number ${person.number} to phonebook`);
      mongoose.connection.close();
    });
    // console.log("3", process.argv)
  } else {
    console.log("phonebook: ");
    Person.find({}).then((result) => {
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  }
  // Person.find({}).then((result) => {
  //   result.forEach((person) => {
  //     console.log(person);
  //   });
  //   mongoose.connection.close();
  // });

  // mongoose.connection.close();

  // });
  // Person.find({})
  //   .then((result) => {
  //     result.forEach((person) => {
  //       console.log(person);
  //     });
  //     mongoose.connection.close();
  //   })
  // console.log(process.argv.lenght);
  // .then(() => {
  //   console.log("person saved!");
  //   return mongoose.connection.close();
  // })
  // .catch((err) => console.log(err));
});
