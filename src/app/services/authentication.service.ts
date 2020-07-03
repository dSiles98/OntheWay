import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnTheWayService } from './on-the-way.service';
import * as jwt_decode from "jwt-decode";
import { decode } from '@angular/router/src/url_tree';
import { DialogComponent } from '../common/dialog/dialog.component';
import { IDialog, TypeOfDialog, IconOfDialog } from '../common/dialog/dialog.model';
import { DialogService } from '../common/dialog/dialog.service';
import { stat } from 'fs';
import { reject } from 'q';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public url: any;

  constructor(private httpClient: HttpClient) { 
    this.url =('https://onthewayservice.azurewebsites.net/login');
  }

  login(email: string, password:any): Promise<boolean>{
    let decodedResult;
    let body = {
      'Email' : email,
      'Password' : password
    }
    let userInformation : any;
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.url, body).subscribe(response =>{
        decodedResult = jwt_decode(response['token'])
        sessionStorage.setItem('token', response['token']);
        sessionStorage.setItem('role', decodedResult['roles']);
        sessionStorage.setItem('userId', decodedResult['UserId']);
        sessionStorage.setItem('user', decodedResult['sub']);
        sessionStorage.setItem('themeId', decodedResult['ThemeId']);
        console.log('correcto', decodedResult);
        return resolve(true); 
      },error =>{
        console.log('incorrecto');
          return reject(false);
        });
    });
  }
} 
