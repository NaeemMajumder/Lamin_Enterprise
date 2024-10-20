let wrapAsync = (func)=>{
    return function(req,res,next){
        func(req,res,next).catch((error)=>next(error));
    }
}
module.exports = wrapAsync;