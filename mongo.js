const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <password> [<name> <number>]')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://nahueldevdev:${password}@cluster0.qiimkid.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Invalid arguments.')
  console.log('Usage:')
  console.log('  node mongo.js <password>            # List entries')
  console.log('  node mongo.js <password> <name> <number>  # Add entry')
  mongoose.connection.close()
}
