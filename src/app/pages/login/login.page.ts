import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //variables:
  usuario = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {

  }

  //crear nuestro métodos:
  ingresar() {
    //rescatamos las variables del formulario por separado:
    var correoValidar = this.usuario.controls.correo.value;
    var passwordValidar = this.usuario.controls.password.value;

    //rescatamos el usuario con el método login usuario:
    var usuarioLogin = this.usuarioService.loginUsuario(correoValidar, passwordValidar);
    //validamos si existe el usuario
    if (usuarioLogin != undefined) {
      //AQUI, ANTES DE REDIRECCIONAR HACIA OTRA PÁGINA, PREPARAREMOS LOS DATOS QUE QUEREMOS ENVIAR:
      var navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioLogin
        }
      };

      //redirigimos dependiente del tipo de usuario
      this.router.navigate(['/home'], navigationExtras);
      this.usuario.reset();

    } else {
      alert('Usuario o contraseña incorrectos!')
    }
  }

}