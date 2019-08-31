import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined} from "util";
import { pipe, from } from 'rxjs';

import {LoginInterface} from "../models/login-interface";



@Injectable({
  providedIn: 'root'
})
export class AuthService {
 constructor(private http: HttpClient) { }
 headers : HttpHeaders = new HttpHeaders({
   "Content-Type" : "application/json"
 });

 registroUsuario(nombre: String, apePat: String, apeMat: String, correo: String, contrasena: String, rol: string){
   const url_api = "http://localhost:3000/usuario/nuevo";
   return this.http.post<LoginInterface>(url_api,
     {
       nombre: nombre,
       ape_pat : apePat, 
       ape_mat : apeMat,
       correo : correo,
       rol : rol,
       contrasena : contrasena,
      },
      {headers: this.headers}
      )
      .pipe(map(user=>user));
   }

   loginUsuario(correo: String, contrasena: String): Observable<any>{
     const url_api = "http://localhost:3000/login";
     return this.http.post<LoginInterface>(url_api,
      {
        correo: correo,
        contrasena: contrasena  
      }
        )
        .pipe(map(user=>user));
   }

 setUsuario(usuario: LoginInterface): void{
   let usuario_string = JSON.stringify(usuario);
   localStorage.setItem("currentUsuario", usuario_string);
 }

 setToken(token): void {
   localStorage.setItem("accessToken",token);
 }

 getToken(){
   return localStorage.getItem("accessToken");
 }

 //Saber el usuario que esta logeado en ese momento

 getCurrentUsuario():LoginInterface{
   let usuario_string = localStorage.getItem("currentUsuario");
   if(isNullOrUndefined(usuario_string)){
     let usuario: LoginInterface = JSON.parse(usuario_string);
     return usuario;
   }else{
     return null;
   }
 }
 //Metodo de logout del usuario, borra informacion del usuario y hace una peticion al servidor para deslogearse 
 logoutUsuario(){
   let accessToken = localStorage.getItem('accessToken')
   const url_api = `http://localhost:3000/usuario/logout?access_token=${accessToken}`;
   localStorage.removeItem("accessToken");
   localStorage.removeItem("currrentUsuario");
   return this.http.post<LoginInterface>(url_api, {headers: this.headers});
 }
}
