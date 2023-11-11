import { Request, Response, Router } from "express";
import { filterCountry, getAllCountrys } from "./country.controller";

const router = Router();

router.get("/", getAllCountrys);
router.get("/filter", filterCountry);

export default router;
