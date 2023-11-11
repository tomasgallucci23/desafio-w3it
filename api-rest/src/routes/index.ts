import { Express } from "express";

export function InitializeRoute(app: Express) {
  app.get("/", (req, res) => res.send("hello"));
  app.use("/api/v1/country", require("./api/country").default);

  console.log("Routes initialize");
}
