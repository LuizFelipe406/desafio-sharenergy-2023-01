import express from "express";
import cors from "cors";
import "dotenv/config";
import connectToDatabase from "./database/Connection";
import { customerRouter, loginRouter  } from "./routers";
import ErrorMiddleware from "./middlewares/ErrorMiddleware";
import Seed from "./database/seed/seedUser";

export default class App {
  public app: express.Express;
  private seeder: Seed;

  constructor() {
    this.app = express();

    this.seeder = new Seed();

    this.config();

    this.configRoutes();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
      })
    );
  }

  private configRoutes(): void {
    this.app.get("/", (req, res) => res.json({ ok: true }));

    this.app.use("/login", loginRouter.router);

    this.app.use("/customer", customerRouter.router);

    this.app.use(ErrorMiddleware.handle);
  }

  public start(PORT: string): void {
    connectToDatabase().then(() => {
      this.seeder.execute();
      this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    })
  }
}

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();