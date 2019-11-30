import { Usuario } from "./usuario";

export class UsuariosLista {
  private lista: Usuario[] = [];

  constructor() {}

  /**
   * Agregar un usuario
   * @param usuario
   */

  public agregar(usuario: Usuario) {
    this.lista.push(usuario);
    console.log(usuario);
    return usuario;
  }

  /**
   * Actualizar nombre
   */

  public actualizarNombre(id: string, nombre: string) {
    for (let usuario of this.lista) {
      if (usuario.id == id) {
        usuario.nombre = nombre;
        break;
      }
    }
    console.log("=====Actualizando Usuario=====");
    console.log(this.lista);
  }
  /**
   * Obtener lista de usuarios
   */

  public getLista() {
    return this.lista.filter(usuario => usuario.nombre !== "sin-nombre");
  }

  /***
   * Retornar usuario
   */

  public getUsuario(id: string) {
    return this.lista.find(usuario => usuario.id === id);
  }
  /**
   * Obtener Usuarios de una sala en particular
   */

  public getUsuarioEnSala(sala: string) {
    return this.lista.filter(usuario => {
      return usuario.sala === sala;
    });
  }
  /**
   * Borra un usuario
   * @param id
   */

  public borrarUsuario(id: string) {
    const tempUsuario = this.getUsuario(id);

    this.lista = this.lista.filter(usuario => {
      return usuario.id != id;
    });
    console.log(this.lista);
    return tempUsuario;
  }
}
