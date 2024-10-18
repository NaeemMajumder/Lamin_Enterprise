// Express
const express = require("express");

// Express-Router
const router = express.Router();

// WrapAsync Function
const wrapAsync = require("../utils/wrapAsync.js");

// Admin Controller
const userController = require("../controller/user.js");


// User Home Page
router.get("/",wrapAsync(userController.userHomeGet));

// User All Car Collection
router.get("/allCollections", wrapAsync(userController.userAllCarGet));

// User All Brands
router.get("/allBrands",wrapAsync(userController.userAllBrandsGet));

// User Contact
router.get("/contact",wrapAsync(userController.userContactGet));

// User All Brand Data API
router.get("/api/brands/:brand", wrapAsync(userController.userAllBrandDataAPIGet));

// User Car Details
router.get("/allCollections/:id", wrapAsync(userController.userCarDetailsGet));

module.exports = router
