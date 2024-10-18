
const mongoose = require("mongoose");

const carListSchema = new mongoose.Schema({
    carType: { type: String, required: true },
    brand: { type: String, required: true },
    carName: { type: String, required: true },
    package: { type: String, required: true },
    modelYear: { type: Number, required: true },
    engineCapacity: { type: String, required: true },
    mileage: { type: String, required: true },
    carColor: { type: String, required: true },
    auctionGrade: { type: String, required: true },
    carPrice: { type: Number, required: true },
    soldStatus: { type: String, default: "false" },
    carImage: { 
        url: Array, 
        filename: Array, 

        // required:true,
        // default:"https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
        // set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" : v
    },
    carFeatures: { type: String },
    createdAt: { type: Array },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    whatsappNumber: { type: Number, required: true }
});

module.exports = mongoose.model("CarList", carListSchema);
