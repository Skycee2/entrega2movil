import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  datos: any[] = [];
  KEY_PERSONAS = 'personas';
  dato = {
    id: '',
    rut: '',
    nombre: ''
  };
  tipoUsuario: any[] = [{
    tipo_usu: 'alumno'
  },
  {
    tipo_usu: 'docente'
  },
  {
    tipo_usu: 'administrador'
  }];

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl')]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    tipo_usuario: new FormControl('this.tipoUsuario', [])
  });

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  usuarios: any[] = [];
  repetir_password: string;
  storage: any;

  constructor(private usuarioService: UsuarioService, private loading: LoadingController) { }

  async ngOnInit() {
    await this.cargarDatos();
  }

  async cargarDatos() {
    this.datos = await this.storage.getDatos(this.KEY_PERSONAS);
  }


  //método del formulario
  async registrar() {
    this.dato.id = '';
    var resp = await this.storage.agregar(this.KEY_PERSONAS, this.dato);
    if (resp) {
      alert('REGISTRADO');
      await this.cargarDatos();
    }
  }

  /* if (this.usuario.controls.password.value != this.verificar_password) {
    alert('CONTRASEÑAS NO COINCIDEN!');
    return;
  }

  var registrado: boolean = this.usuarioService.addUsuario(this.usuario.value);
  if (!registrado) {
    alert('USUARIO YA EXISTE!');
    return;
  }

  alert('ALUMNO REGISTRADO!');
  this.usuario.reset();
  this.verificar_password = '';
} */

  eliminar(rutEliminar) {
    await this.storage.eliminar(this.KEY_PERSONAS, identificador);
    await this.cargandoPantalla('eliminando...');
    await this.cargarDatos();
    /* this.usuarioService.deleteUsuario(rutEliminar);
    alert('USUARIO ELIMINADO!') 
  }*/

    buscar(rutBuscar) {
      var alumnoEncontrado = this.usuarioService.getUsuario(rutBuscar);
      this.usuario.setValue(alumnoEncontrado);
      this.verificar_password = alumnoEncontrado.password;
    }

    modificar() {
      //console.log(this.alumno.value);
      this.usuarioService.updateUsuario(this.usuario.value);
      this.limpiar();
    }

    limpiar() {
      this.usuario.reset();
      this.verificar_password = '';
    }

  }


