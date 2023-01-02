const mongoose = require("mongoose")

const ablumSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        imageURL : {
            type : String,
            required : true,
        },
    },
    {timestamps : true}
)
module.exports = mongoose.model("album" , ablumSchema)