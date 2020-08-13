import {Request, Response, NextFunction} from 'express'
import Ajv from 'ajv'

export const isValid = (schema: object | string | boolean) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, req.body)

    if (valid) {
      next()
    }
    res.send(ajv.errors)
  }
}
