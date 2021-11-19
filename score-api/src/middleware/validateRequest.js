import { validationResult } from "express-validator";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const validateRequest = (req, res, next) => {
  const errors = validationResult(req).array();

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  return next();
};

export default validateRequest;
