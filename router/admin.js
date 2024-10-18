// Express
const express = require("express");

// Express-Router
const router = express.Router();

// Passport
const passport = require("passport");

// Multer
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// WrapAsync Function
const wrapAsync = require("../utils/wrapAsync.js");

// Joi Schema Validation
const {carListSchema} = require("../schema.js");

// isLoggedIn Middleware
const {isLoggedIn} = require("../middleware.js");

// Admin Controller
const AdminController = require("../controller/admin.js");


// Validation Method
const validateCarList = (request,response,next)=>{
    let {error} = carListSchema.validate(request.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}




// Admin Login
router.get("/",AdminController.adminLoginGet);
router.post("/",passport.authenticate("local",{failureRedirect:"/admin",failureFlash:true}),wrapAsync(AdminController.adminLoginPost));


// Logout Admin
router.get("/logout",AdminController.adminLogoutGet)


// Admin Change Password
router.get("/change-password",isLoggedIn,AdminController.adminChangePassGet);
router.post("/change-password", wrapAsync(AdminController.adminChangePassPost));


// Admin Upload New Car
router.get("/uploadCar",isLoggedIn, AdminController.adminUploadCarGet);
router.post("/allCollections", upload.array('upload[carImage]',10), validateCarList, wrapAsync(AdminController.adminUploadCarPost));


// Admin All Car Collection 
router.get("/allCollections",isLoggedIn, wrapAsync(AdminController.adminAllCarGet));


// Admin Car Details
router.get("/allCollections/:id",isLoggedIn, wrapAsync(AdminController.adminCarDetailsGet));


// Admin Car Edit
router.get("/allCollections/:id/edit",isLoggedIn, wrapAsync(AdminController.adminCarEditGet));
router.put("/allCollections/:id", upload.array('upload[carImage]',10), validateCarList, wrapAsync(AdminController.adminCarEditPut));
router.delete("/allCollections/:id", wrapAsync(AdminController.adminCarEditDelete));


module.exports = router
