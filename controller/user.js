// Car List Schema
const CarList = require("../models/carList.js");


// User Home Page
module.exports.userHomeGet = async(req,res)=>{
    let lastTenCars = await CarList.find({}).sort({ _id: -1 }).limit(10);
    res.render("./main/home.ejs", {lastTenCars});
};

// User All Car Collection
module.exports.userAllCarGet = async(req, res) => {
    const limit = parseInt(req.query.limit) || 15;
    const page = parseInt(req.query.page) || 1; 
    const skip = (page - 1) * limit; 

    try {
        let allCars = await CarList.find({}).sort({ _id: -1 }).skip(skip).limit(limit);

        const totalCars = await CarList.countDocuments(); 
        const totalPages = Math.ceil(totalCars / limit); 

        res.render("./main/allCollections.ejs", {
            allCars,
            currentPage: page,
            totalPages: totalPages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

// User All Brands
module.exports.userAllBrandsGet = async(req,res)=>{
    res.render("./main/allBrands.ejs"); 
};

// User Contact
module.exports.userContactGet = async(req,res)=>{
    res.render("./main/contact.ejs");
};

// User All Brand Data API
module.exports.userAllBrandDataAPIGet = async(req, res) => {
    try {
        const brand = req.params.brand;
        const cars = await CarList.find({ brand: new RegExp(`^${brand}$`, 'i') });
        res.json(cars);
    } catch (error) {
        console.error("Error fetching cars by brand:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// User Car Details
module.exports.userCarDetailsGet = async(req,res)=>{
    let {id} = req.params;
    let carDetails = await CarList.findById(id);
    res.render("./main/carDetails.ejs",{carDetails})
};
