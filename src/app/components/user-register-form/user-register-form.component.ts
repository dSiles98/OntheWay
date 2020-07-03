import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompareValidatorDirective, compareValidator } from '../../common/directives/compare-validator.directive';
import { dateValidator } from '../../common/directives/date-validator.directive';
import { DialogService } from '../../common/dialog/dialog.service';
import { IDialog, TypeOfDialog, IconOfDialog } from '../../common/dialog/dialog.model';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-form-user-register',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.scss']
})
export class UserRegisterFormComponent implements OnInit {

  cardForm: FormGroup;
  show: boolean = false;
  passwordConfirmed: boolean = false;
  now: Date = new Date();
  min: Date = new Date();
  @ViewChild('date') date;

  constructor(private fb: FormBuilder, private dialogService: DialogService, private userService: UserService) {}

  ngOnInit() {
    this.min.setFullYear(this.now.getFullYear() - 80);
    this.now.toLocaleDateString()
    this.cardForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('([A-Z][a-z]+[ ]{0,1})+')]],
      lastName: ['', [Validators.required, Validators.pattern('([A-Z][a-z]+[ ]{0,1})+')]],
      cellPhone: ['', [Validators.required, Validators.pattern('(6|7)[0-9]*'), Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.email, Validators.required]],
      birthday: ['', [Validators.required, dateValidator(this.min, this.now)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password2: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), compareValidator('password')]]
    });
    console.log(this.date);
    console.log(this.now.toISOString().split('T')[0]);
    this.date.nativeElement.min = this.min.toISOString().split('T')[0];
    this.date.nativeElement.max = this.now.toISOString().split('T')[0];
    this.checkPasswords();
  }

  onSubmit(cardForm): void {
    let birthday: Date = new Date(cardForm.value.birthday);
    console.log(birthday.toISOString());
    let user: IUser = {
      name: cardForm.value.name,
      lastName: cardForm.value.lastName,
      email: cardForm.value.email,
      password: cardForm.value.password,
      birthday: birthday.toISOString(),
      phone: cardForm.value.cellPhone,
      roleId: 3
    }
    console.log(user);
    let dialog: IDialog;
    this.userService.addUser(user).subscribe( response => {
      console.log(response);    
      dialog = {
        title: 'Successful',
        description: 'Your account was created successfuly. We send you a Email confirmation',
        btnYes: 'Accept',
        type: TypeOfDialog.SUCCESS,
        icon: IconOfDialog.SUCCESS,
        redirectBtnYes: '/login-form',
        ignoreBackdrop: true
      };
      this.dialogService.options(dialog);
    }, error => {
      dialog = {
        title: 'Error',
        description: 'Your account wasn\'t created',
        btnNo: 'Accept',
        type: TypeOfDialog.DANGER,
        icon: IconOfDialog.DANGER,
        keyboardEsc: true
      };
      this.dialogService.options(dialog);
    }, () => {
      console.log('finish');
    });
  }

  checkPasswords(): any {
    this.cardForm.controls.password2.valueChanges.subscribe((value)=> {
      let password = this.cardForm.controls.password;
      this.passwordConfirmed = (password.invalid || password.value !== value) ? false : true;
    });
  }

}
