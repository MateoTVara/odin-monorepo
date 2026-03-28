import { body, param } from "express-validator";

const validationMessages = Object.freeze({
  param: {
    runId: {
      isInt: "Run ID must be an integer",
    },
    characterId: {
      isInt: "Character ID must be an integer",
    },
  },
  body: {
    name: {
      notEmpty: "Name is required",
      isString: "Name must be a string",
    },
    levelId: {
      isInt: "Level ID must be an integer",
    },
    x: {
      isInt: "X coordinate must be an integer",
      isFloat: "X coordinate must be a float",
    },
    y: {
      isInt: "Y coordinate must be an integer",
      isFloat: "Y coordinate must be a float",
    },
  }
});

const runsValidator = Object.freeze({
  create: [
    body("name")
      .notEmpty().withMessage(validationMessages.body.name.notEmpty)
      .isString().withMessage(validationMessages.body.name.isString),
    body("levelId").isInt().withMessage(validationMessages.body.levelId.isInt).toInt(),
  ],
  markCharacterFound: [
    param("runId").isInt().withMessage(validationMessages.param.runId.isInt).toInt(),
    param("characterId").isInt().withMessage(validationMessages.param.characterId.isInt).toInt(),
    body("x").isFloat().withMessage(validationMessages.body.x.isFloat).toFloat(),
    body("y").isFloat().withMessage(validationMessages.body.y.isFloat).toFloat(),
  ]
});

export default runsValidator;