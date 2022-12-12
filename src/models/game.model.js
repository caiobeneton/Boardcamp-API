import joi from "joi"

export const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().integer().greater(0).required(),
    categoryId: joi.number().integer().greater(0).required(),
    pricePerDay: joi.number().integer().greater(0).required(),
})