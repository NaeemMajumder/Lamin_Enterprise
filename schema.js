const Joi = require("joi");


module.exports.carListSchema = Joi.object({
    upload : Joi.object({
        carType: Joi.string().required(),
        brand: Joi.string().required(),
        carName: Joi.string().required(),
        package: Joi.string().required(),
        modelYear: Joi.number().required().min(0),
        engineCapacity: Joi.string().required(),
        mileage: Joi.string().required(),
        carColor: Joi.string().required(),
        auctionGrade: Joi.string().required(),
        carPrice: Joi.number().required().min(0),
        soldStatus: Joi.string().required(),
        carImage: Joi.string().allow("",null),
        carFeatures: Joi.string().required(),
        phoneNumber: Joi.number().required().min(0),
        email: Joi.string().required(),
        whatsappNumber: Joi.number().required().min(0),
    }).required()
});