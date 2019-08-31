import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginInterface } from 'src/app/models/login-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  private usuario: LoginInterface = {
    nombre: "",
    contrasena: ""
  };

  ngOnInit() {
  }

  onLogin(){
    return this.authService.loginUsuario(
      this.usuario.correo, 
      this.usuario.contrasena
      )
    .subscribe(usuario=>{
      this.authService.setUsuario(usuario.usuario)
      let token = usuario.id; 
      this.authService.setToken(token);
      this.router.navigate(['/user/register']);
    },
    
    error=> console.log(error)
    );
  }

}
