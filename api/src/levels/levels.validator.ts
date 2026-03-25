import { param } from "express-validator";

const validationMessages = Object.freeze({
  param: {
    id: {
      isInt: "ID must be an integer",
    }
  }
});

const levelsValidator = Object.freeze({
  idParam: [
    param("id").isInt().withMessage(validationMessages.param.id.isInt).toInt(),
  ],
});

export default levelsValidator;