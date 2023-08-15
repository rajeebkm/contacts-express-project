// mongoose: object model design schema, for entity like contacts, help us communicate with mongodb database
const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name,
      connect.connection.port,
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;