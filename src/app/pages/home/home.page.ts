import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  //VAMOS A CREAR UNA VARIABLE QUE RECIBA LOS DATOS DEL USUARIO DESDE LOGIN:
  usuario: any;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    console.log(this.usuario);
  }

  //Método para cerrar sesión

  logout(){
    this.usuarioService.logout();
  }
}