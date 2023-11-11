import dotenv from "dotenv";
import express from "express";
import { InitializeRoute } from "../routes";
import cors from "cors";

export function ExpressLoader(global: any) {
  console.log("Initalize Express loader");

  const { app }: { app: express.Express } = global;

  const port = process.env.PORT || 3000;

  // Configure
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));

  // Initialize Routes
  InitializeRoute(app);

  app.listen(port, () => {
    console.log("server started at port ", 3000);
  });

  console.log("Finalize Express loader");
}
