import { body } from "express-validator";

const validationMessages = Object.freeze({
  body: {
    name: {
      notEmpty: "Name is required",
      isString: "Name must be a string",
    },
    levelId: {
      isInt: "Level ID must be an integer",
    },
  }
});

const runsValidator = Object.freeze({
  create: [
    body("name")
      .notEmpty().withMessage(validationMessages.body.name.notEmpty)
      .isString().withMessage(validationMessages.body.name.isString),
    body("levelId").isInt().withMessage(validationMessages.body.levelId.isInt).toInt(),
  ]
});

export default runsValidator;