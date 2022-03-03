import { Controller } from '../../../presentation/protocols/controller'
import { Request, Response } from 'express'
import { HttpRequest } from '../../../presentation/protocols/http'

export const adaptRoute = (controller: Controller) => {
  return (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    controller.handle(httpRequest).then(httpResponse => {
      if (httpResponse.statusCode === 200) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message
        })
      }
    }).catch(e => {
      console.error(e)
      res.status(500).json({ message: 'Internal Server Error' })
    })
  }
}
