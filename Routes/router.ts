import { Router, Request, Response } from "express";
import Server from "../Classes/server";

export const router = Router();

router.get("/mensajes", (req: Request, resp: Response) => {
  resp.json({
    ok: true,
    mensaje: "Todo esta bien!"
  });
});
router.post("/mensajes", (req: Request, resp: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  //Enviar mensaje a todos los usuarios del socket
  const payload = {
    de,
    cuerpo
  };
  //Inicio de conexion al socket
  const server = Server.instance;
  //Envio del mensaje, a un usuario en particular
  server.io.emit("mensaje-nuevo", payload);

  resp.json({
    ok: true,
    cuerpo,
    de
  });
});
router.post("/mensajes/:id", (req: Request, resp: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;
  const payload = {
    de,
    cuerpo
  };
  //Inicio de conexion al socket
  const server = Server.instance;
  //Envio del mensaje, a un usuario en particular
  server.io.in(id).emit("mensaje-privado", payload);
  //Para enviar a todos un mensaje, se podria usar
  /**
   * server.io.emit('mensaje-nuevo',payload);
   */

  resp.json({
    ok: true,
    cuerpo,
    de,
    id
  });
});
