import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin-clases',
  templateUrl: './admin-clases.page.html',
  styleUrls: ['./admin-clases.page.scss'],
})
export class AdminClasesPage implements OnInit {

  asignatura = new FormGroup({
    nom: new FormControl('',[Validators.required, Validators.minLength(6)]),
    sigla: new FormControl('',[Validators.required, Validators.pattern('[A-Z]{1,3}[0-9]{1,5}')]), 
    cod: new FormControl('',[Validators.required, Validators.pattern('[1-9]{8}')]),
    docente: new FormControl('', [Validators.required])
  })


  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

}
