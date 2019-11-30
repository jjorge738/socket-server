import { Socket } from "socket.io";
import { UsuariosLista } from "../Classes/usuario-lista";
import { Usuario } from "../Classes/usuario";
import socketIO from "socket.io";
import Server from "../Classes/server";

export const usuariosConectados = new UsuariosLista();

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
  //console.log(cliente);

  cliente.on("disconnect", () => {
    console.log("Cliente Desconectado");
    usuariosConectados.borrarUsuario(cliente.id);
    io.emit("usuarios-activos", usuariosConectados.getLista());
  });
};
/**
 *
 * Escuchar mensaje
 */
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
  console.log("Cliente id", cliente.id);

  cliente.on("mensaje", (payload: { de: string; cuerp: string }) => {
    console.log("Mensaje Recibido ", payload);
    io.emit("mensaje-nuevo", payload);
  });
};
/**
 * Configurar Usuario
 */
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on(
    "configurar-usuario",
    (
      payload: {
        nombre: string;
      },
      callback: Function
    ) => {
      console.log("Configurando Usuario", payload);
      usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
      io.emit("usuarios-activos", usuariosConectados.getLista());

      callback({
        ok: true,
        msg: `Usuario ${payload.nombre}, configurado`
      });
    }
  );
};

/**
 * Conexion de Cliente
 */
export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
};

/**
 * Emitir usuarios activos
 */
export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on("usuarios-activos", () => {
    /**
     * Enviar mensaje unicamente al cliente que se conecto
     */
    io.to(cliente.id).emit("usuarios-activos", usuariosConectados.getLista());
  });
};
