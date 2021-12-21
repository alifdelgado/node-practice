import { checkSchema, ParamSchema, Schema } from "express-validator";

const createProductSchema = (isStrict: boolean, prefix?: string): Schema => {
    const nameSchema: ParamSchema = {
        isString: true,
        trim: {
            options: ' '
        },
        isLength: {
            options: {
                min: 2
            }
        },
        errorMessage: 'Name must be a valid string with at least 2 characters'
    };

    const yearSchema: ParamSchema = {
        isInt: true,
        isString: {
            negated: true
        },
        errorMessage: "Year must be an integer value"
    };

    const priceSchema: ParamSchema = {
        isNumeric: true,
        isString: {
            negated: true
        },
        custom: {
            options: (value) => +value>0
        },
        errorMessage: "Price must be a numeric value"
    };

    if(!isStrict) {
        const optional = {
            options: {
                nullable: true
            }
        };
        nameSchema.optional = optional;
        yearSchema.optional = optional;
        priceSchema.optional = optional;
    }

    if(prefix) {
        const result: Schema = {};
        result[`${prefix}.name`] = nameSchema;
        result[`${prefix}.year`] = yearSchema;
        result[`${prefix}.price`] = priceSchema;
        return result;
    }

    return {
        name: nameSchema,
        year: yearSchema,
        price: priceSchema
    };
};

const productValidate = checkSchema(createProductSchema(true));

const validateProductDelete = checkSchema({
    productId: {
        in: 'params',
        isMongoId: true
    }
});

const validateProductNotify = checkSchema({
    client: {
        in: 'body',
        isEmail: true,
    },
    productId: {
        in: 'params',
        isMongoId: true
    },
    ...createProductSchema(false, "data");
});

export {
    productValidate,
    validateProductDelete,
    validateProductNotify
};