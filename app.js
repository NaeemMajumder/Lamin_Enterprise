if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

// express (1)
const express = require("express");
const app = express();

// mongoose (2)
const mongoose = require("mongoose");
let db_url = process.env.ATLASDB_URL;
main().then(()=>{
    console.log("mongodb is connected");
}).catch((error)=>{
    console.log(error);
})
async function main() {
    await mongoose.connect(db_url);
}

// ejs (3)
const path = require('path');
app.set("view engin","ejs");
app.set("views",path.join(__dirname,"/views"));

// Serving Statice Files (public) (4)
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"/public")));

// Handling post (5)
app.use(express.urlencoded({extended:true}));

// ejs-mate (6)
const ejsMate = require('ejs-mate');
app.engine("ejs",ejsMate);

// method-override (7)
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// multer
const multer  = require('multer')
// cloudConfig.js
const {storage} = require("./cloudConfig.js");
const upload = multer({ storage })

// Express Session
const session = require("express-session");

// Mongo Store
const MongoStore = require("connect-mongo");

const store = MongoStore.create({
    mongoUrl: db_url,
    crypto:{
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
});
store.on("error",(error)=>{
    console.log("ERROR in MONGO SESSION STORE", error);
});

// Express Session.....
const sessionObject = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expire: Date.now() + 10 * 24 * 60 * 60 * 1000,
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}
app.use(session(sessionObject));

// Cookie Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser("secret code"));

// Connect Flash -- **always use flash before Express Router**
const flash = require("connect-flash");
app.use(flash());


// Express Error
const ExpressError = require("./utils/ExpressError.js");



// Admin Schema
const Admin = require("./models/admin.js")

// Passport | Passport-local | Passport-local-mongoose
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());


// connect flash local variable
app.use((request,response,next)=>{
    response.locals.success = request.flash("success");
    response.locals.error = request.flash("error");
    next();
})


// Express-Router Routes
const adminRouter = require("./router/admin.js");
const userRouter = require("./router/user.js");

// Admin All routes
app.use("/admin",adminRouter);

// User All routes
app.use("/",userRouter);


// all random route
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
})


// Error Middleware
app.use((error,req,res,next)=>{
    let {statusCode=500, message="Something went wrong!"} = error;
    res.status(statusCode).render("./error/error.ejs",{statusCode,message});
})


app.listen(3000,()=>{
    console.log(`port 3000 is listening`);
})