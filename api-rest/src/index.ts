import loders from "./loaders";

import dotenv from "dotenv";
import express from "express";

const app = express();

const global = {
  app,
};

dotenv.config();

loders.forEach(async (loader) => await loader(global));
