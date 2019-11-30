import { Router, Request, Response } from "express";
import Server from "../Classes/server";
import { usuariosConectados } from "../sockets/sockets";

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
/**
 * Servicio para obtener los IDS de usuarios
 */
router.get("/usuarios", (req: Request, resp: Response) => {
  //Inicio de conexion al socket
  const server = Server.instance;
  //Obtener todos los ids conectados
  server.io.clients((err: any, clientes: string[]) => {
    if (err) {
      resp.json({
        ok: false,
        err
      });
      return;
    }
    resp.json({
      ok: true,
      clientes
    });
  });
});

/**
 * Obtener usuarios y sus nombres
 */
router.get("/usuarios/detalle", (req: Request, resp: Response) => {
  //Inicio de conexion al socket
  const server = Server.instance;
  //Obtener los  usuarios conectados

  server.io.clients((err: any, clientes: string[]) => {
    if (err) {
      resp.json({
        ok: false,
        err
      });
      return;
    }
    resp.json({
      ok: true,
      clientes: usuariosConectados.getLista()
    });
  });
});
/**
 *
 */
