import { Router } from "express";

import * as service from "../service/funcionarioService";

import { trata } from "./util";

export const router = new Router();

router.get("/funcionarios", (req, res) =>
  trata(req, res, service.list, req.query)
);

router.get("/funcionarios/:id", (req, res) =>
  trata(req, res, service.find, req.params.id)
);
router.post("/funcionarios", (req, res) =>
  trata(req, res, service.insert, req.body)
);

router.patch("/funcionarios/:id", (req, res) =>
  trata(req, res, service.partialUpdate, req.body, req.params.id)
);

router.put("/funcionarios", (req, res) =>
  trata(req, res, service.update, req.body, req.params.id)
);

router.put("/funcionarios/:id", (req, res) =>
  trata(req, res, service.update, req.body, req.params.id)
);

router.delete("/funcionarios", (req, res) =>
  trata(req, res, service.del, req.params.id)
);

router.delete("/funcionarios/:id", (req, res) =>
  trata(req, res, service.del, req.params.id)
);
