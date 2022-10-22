import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //CREAMOS LAS VARIABLES NECESARIAS DE TRABAJO:
  usuarios: any[] = [
    {
      rut: '11.111.111-1',
      nom_completo: 'sebastian',
      correo: 'administrador@duoc.cl',
      fecha_nac: '1990-03-24',
      semestre: 'No posee',
      password: 'admin123',
      tipo_usuario: 'administrador'
    },
    {
      rut: '22.222.222-2',
      nom_completo: 'Satan',
      correo: 'seb.montero@duocuc.cl',
      fecha_nac: '1990-03-24',
      semestre: '1',
      password: 'alumno1',
      tipo_usuario: 'alumno'
    },
    {
      rut: '10.000.000-0',
      nom_completo: 'Satan',
      correo: 'profesor@profesor.duoc.cl',
      fecha_nac: '1990-03-24',
      semestre: 'No posee',
      password: 'docente1',
      tipo_usuario: 'docente'
    }
  ];


  isAuthenticated = new BehaviorSubject(false);

  constructor(private router: Router, private storage: Storage) {
    storage.create();
  }

  //métodos:
  async addUsuario(usuario, key){
    this.usuarios = await this.storage.get(key) || [];

    var datoFind = await this.getUsuario(key, usuario.rut);
    if(datoFind == undefined){
      this.usuarios.push(usuario);
      await this.storage.set(key, this.usuarios);
      return true;
    }
    return false;
  }

  async getUsuario(key, rut) {
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios.find(usuario => usuario.rut == rut);
  }



  async getUsuarios(key) {
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios;
  }

  async updateUsuario(key, usuario) {
    this.usuarios = await this.storage.get(key) || [];
    var index = this.usuarios.findIndex(value => value.rut == usuario.rut);
    this.usuarios[index] = usuario;
    await this.storage.set(key, this.usuarios);
  }

  async deleteUsuario(rut, key){
    this.usuarios = await this.storage.get(key) || [];

    this.usuarios.forEach((value, index) => {
      if(value.rut == rut){
        this.usuarios.splice(index, 1);
      }  
    });

    await this.storage.set(key, this.usuarios);
  }

  

  //métodos customer:
  loginUsuario(correo, password) {
    var usuarioLogin = this.usuarios.find(usu => usu.correo == correo && usu.password == password);
    if (usuarioLogin != undefined) {
      this.isAuthenticated.next(true);
      return usuarioLogin;
    }
    //return this.usuarios.find(usu => usu.correo == correo && usu.clave == clave);
  }
  getAuth() {
    return this.isAuthenticated.value;
  }
  logout() {
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }


  validarRutPassword(rut, pass){
    return this.usuarios.find(u => u.rut == rut && u.password == pass);
  }

  validarCorreorpw(correo){
    return this.usuarios.find(u => u.correo == correo)
  }



}



