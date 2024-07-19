const { connect } = require("mongoose")

module.exports = {
    connectToDb : () => {
        return connect("mongodb://localhost:27017/mern-sample", {})
        .then(() => {
            console.log("Connected to MongoDB !");
        })
        .catch((err) => {
            console.error(err);
        })
    }
}