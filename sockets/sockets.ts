import { Socket } from 'socket.io';

export const desconectar = (cliente: Socket) => {
    //console.log(cliente);

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });
}
/**
 * 
 * Escuchar mensaje
 */
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: {
        de: string,
        cuerp: string
    }) => {
        console.log('Mensaje Recibido ', payload);
        io.emit('mensaje-nuevo', payload);
    });
}