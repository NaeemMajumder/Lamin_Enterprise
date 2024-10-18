// Car List Schema
const CarList = require("../models/carList.js");

// Admin Schema
const Admin = require("../models/admin.js");

// Joi Schema Validation
const {carListSchema} = require("../schema.js");

// Admin Login
module.exports.adminLoginGet = async(request,response,next)=>{
    response.render("./admin/a_home.ejs");
}
module.exports.adminLoginPost = async(req,res,next)=>{
    req.flash("success","You are successfully logged in");
    res.redirect("/admin/allCollections");
}

// Logout Admin
module.exports.adminLogoutGet = (req,res,next)=>{
    req.logout((error)=>{
        if(error){
            next(error);
        }
        res.redirect("/admin");
    });
}

// Admin Change Password
module.exports.adminChangePassGet =  (req, res) => {
    res.render("./admin/a_changePass.ejs");
}
module.exports.adminChangePassPost = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const isMatch = await Admin.authenticate()(req.user.email, oldPassword);
    if (!isMatch.user) {
        req.flash("error", "পুরাতন পাসওয়ার্ড সঠিক নয়");
        return res.redirect("/admin/change-password");
    }

    const admin = await Admin.findById(req.user._id);
    admin.setPassword(newPassword, async(err) => {
        if (err) {
            req.flash("error", "পুরাতন পাসওয়ার্ড সঠিক নয়");
            return res.redirect("/admin/change-password");
        }
        await admin.save();
        req.flash("success","Your Password is successfully Changed");
        res.redirect("/admin/allCollections");
    });
}

// Admin Upload New Car
module.exports.adminUploadCarGet = (req,res)=>{
    res.render("./admin/a_uploadCar.ejs");
}
module.exports.adminUploadCarPost = async(req,res,next)=>{

    carListSchema.validate(req.body);
    let upload = req.body.upload;
    
    // upload time set....
    let createdAt = new Date(Date.now());
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[createdAt.getMonth()];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = dayNames[createdAt.getDay()];
    let hours = createdAt.getHours();
    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    let time = [month, createdAt.getDate(), createdAt.getFullYear(), day, hours, createdAt.getMinutes().toString().padStart(2, '0'), period];
    req.body.upload.createdAt = time;

    let uploadCar = new CarList(upload);

    let url=[] ;
    let filename=[]; 
    req.files.forEach(data=>{
        url.push(data.path);
        filename.push(data.filename);
    });

    uploadCar.carImage = {url,filename};
    await uploadCar.save();

    req.flash("success","New car list successfully added");  
    res.redirect("/admin/allCollections");       

};

// Admin All Car Collection 
module.exports.adminAllCarGet = async(req,res)=>{
    let allCars = await CarList.find({});
    res.render("./admin/a_allCollections.ejs",{allCars});
}

// Admin Car Details
module.exports.adminCarDetailsGet = async(req,res)=>{
    let {id} = req.params;
    let carDetails = await CarList.findById(id);
    res.render("./admin/a_carDetails.ejs",{carDetails})
}

// Admin Car Edit
module.exports.adminCarEditGet = async(req,res)=>{
    let {id} = req.params;
    let carDetails = await CarList.findById(id);
    res.render("./admin/a_edit.ejs",{carDetails})
}
module.exports.adminCarEditPut = async(req,res)=>{
    
    let {id} = req.params;
    let carDetails = req.body.upload;
    let updateCar = await CarList.findByIdAndUpdate(id,{...carDetails});

    if(req.files.length){
        let url=[] ;
        let filename=[]; 
        req.files.forEach(data=>{
            url.push(data.path);
            filename.push(data.filename);
        });
        updateCar.carImage = {url,filename};
        await updateCar.save();        
    }
    req.flash("success","Edit saved");
    res.redirect(`/admin/allCollections/${id}`)
}
module.exports.adminCarEditDelete = async(req,res)=>{
    let {id} = req.params;
    await CarList.findByIdAndDelete(id)
    req.flash("success","Car list deleted");
    res.redirect("/admin/allCollections");
}