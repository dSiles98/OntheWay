import { Component, OnInit, ViewChild, Input , Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementData } from '@angular/core/src/view';
import { MDBModalRef } from 'angular-bootstrap-md';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../common/dialog/dialog.model';
import { DialogService } from '../../common/dialog/dialog.service';
import { ConfirmUserRegistrationService } from '../../services/confirm-user-registration.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AppError} from '../../common/errors/app-error';
import * as jwt_decode from "jwt-decode";


import { Md5 } from 'ts-md5/dist/md5';
import { AuthenticationService } from '../../services/authentication.service';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { PageRole } from '../../models/role';
import { ThemesListService } from '../themes-list/themes-list.service';
import { IUser } from 'src/app/models/user.model';
import { CurrentUserService } from '../user/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private key: any;

@Output() openForm = new EventEmitter<any>();

    loginForm: FormGroup;
    private username : string;
    private roles :any;


    constructor(private _md5: Md5, private route: ActivatedRoute, private fb: FormBuilder,  private router: Router, private dialogService: DialogService, 
      private authorizationService: AuthenticationService, private messageService: MessageService, private userService: UserService, private themesListService: ThemesListService,
      private confirmService: ConfirmUserRegistrationService, private currentUserService: CurrentUserService) {
      this.roles = { '1' : PageRole.SUPERADMIN, '2': PageRole.ADMIN, '3': PageRole.USER}
      this.loginForm = fb.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', Validators.required],
      });
      
    }

  ngOnInit() {
      this.key = this.route.snapshot.paramMap.get('key');
      if (this.key !== null) {
        var algo = this.confirmService.confirmUser(this.key).subscribe((response: any) => { console.log(response); });
      }
  }

  onSubmit(form) {

    let dialog: IDialog;
    let answer: Promise<boolean>;
    this._md5 = new Md5();
    var pass: any;
    pass = this._md5.appendStr(this.loginForm.value.password).end();
    console.log(pass);
    answer = this.authorizationService.login(form.value.email, pass);
    answer.then(response => {
      let idRole  =  sessionStorage.getItem('role');
      let userRole : PageRole;
      userRole = this.roles[idRole];
      this.router.navigate([userRole]);
      var themeId = sessionStorage.getItem('themeId');
      let _themeId = themeId ? Number(themeId): 1;
      this.themesListService.getThemeById(_themeId).then(result => { this.themesListService.Theme = result; });
      this.currentUserService.getUser().then((result: IUser) => { this.currentUserService.User = result; });
      this.sendMessage();
    }).catch( error => {
      console.log('incorrect', error);
      dialog = {
        title: 'Error',
        description: 'Your email or password is incorrect',
        btnNo: 'Accept',
        type: TypeOfDialog.DANGER,
        icon: IconOfDialog.DANGER,
        keyboardEsc: true
      };
      this.dialogService.options(dialog);
    });
  }

  sendMessage(): void {
    let userId = sessionStorage.getItem('userId');
    let response = this.userService.getOneUser();
    console.log(response, "detalles del usuario");
    this.username = response['username'];
    // send message to subscribers via observable subject
    this.messageService.sendMessage(this.username);
}
}
