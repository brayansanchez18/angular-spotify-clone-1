import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private asAuthService: AuthService,
    private cookie: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required, // validamos que el campo de email no este vacio
        Validators.email, // validamos que lo que este en el campo sea un correo valido
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
    });
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;
    this.asAuthService.sendCredentials(email, password).subscribe(
      (responseOk) => {
        //TODO: CUANDO EL USUARIO INGRESAS LAS CREDENCIALESS CORRECTAS
        console.log('sesion iniciada correctamente');
        const { tokenSession, data } = responseOk;
        // le deimo que la cookie se va a llamar token de tokensessison, que va a durar 4 diass y que va a ser para toda la aplicacion
        this.cookie.set('token', tokenSession, 4, '/');
        this.router.navigate(['/', 'tracks']);
      },
      (err) => {
        //TODO: error de inicio de sesion
        this.errorSession = true;
        console.log('error al iniciar sesion');
      }
    );
  }
}
