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
  ];

  isAuthenticated = new BehaviorSubject(false);

  constructor(private router: Router, private storage: Storage) {
    storage.create();
  }

  //métodos:
  async addUsuario(key,usuario){
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

  async deleteUsuario( key,rut){
    this.usuarios = await this.storage.get(key) || [];

    this.usuarios.forEach((value, index) => {
      if(value.rut == rut){
        this.usuarios.splice(index, 1);
      }  
    });

    await this.storage.set(key, this.usuarios);
  }


  validarRutPassword(rut, pass){
    return this.usuarios.find(u => u.rut == rut && u.password == pass);
  }

  validarCorreorpw(correo){
    return this.usuarios.find(u => u.correo == correo);
  }

  

  //métodos customer:
  async loginUsuario(key,correo, password) {
    this.usuarios = await this.storage.get(key) || [];

    var usuarioLogin : any;
    /* var */ usuarioLogin = this.usuarios.find(usu => usu.correo == correo && usu.password == password);

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




}



