import { Socket } from 'socket.io';
import { UsuariosLista } from '../Classes/usuario-lista';
import { Usuario } from '../Classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const desconectar = (cliente: Socket) => {
    //console.log(cliente);

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
    });
}
/**
 * 
 * Escuchar mensaje
 */
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    console.log('Cliente id', cliente.id);

    cliente.on('mensaje', (payload: {
        de: string,
        cuerp: string
    }) => {

        console.log('Mensaje Recibido ', payload);
        io.emit('mensaje-nuevo', payload);
    });

}
/**
 * Configurar Usuario
 */
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: {
        nombre: string
    }, callback: Function) => {
        console.log('Configurando Usuario', payload);
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback({
            'ok': true,
            'msg': `Usuario ${payload.nombre}, configurado`
        });
    });
}

/**
 * Conexion de Cliente
 */
export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
};