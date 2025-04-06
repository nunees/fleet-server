import {Express, Request, Response} from "express"
import { setupApp } from "@/main/config/app"
import request from "supertest"

let app: Express

describe("Body Parser Middleware", () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  test("Should parse body as JSON", async () => {
    app.post("/body-parser", (req: Request, res: Response) => {
      res.send(req.body)
    })

    await request(app)
    .post("/body-parser")
    .send({name: "felipe"})
    .expect({name: "felipe"})
  })
}) 
