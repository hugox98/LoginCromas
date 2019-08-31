import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginInterface } from 'src/app/models/login-interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  private usuario: LoginInterface={
    nombre:"",
    ape_pat: "",
    ape_mat: "",
    correo: "",
    contrasena: "",
    rol: ""
  };

  ngOnInit() {
  }
  onRegistro(): void{
    this.authService.registroUsuario(
    this.usuario.nombre,
    this.usuario.ape_pat,
    this.usuario.ape_mat,
    this.usuario.correo, 
    this.usuario.contrasena,
    this.usuario.rol
    )
    .subscribe(usuario=>{
      this.authService.setUsuario(usuario);
      let token = usuario.id;
      this.authService.setToken(token);
      this.router.navigate(["/user/login"]);  //a la hora que valida el token me redirige al login para que proceda el logeo
    });
  }
}
