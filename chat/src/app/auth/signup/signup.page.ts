import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from 'express';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private fb: FormBuilder, private user: AuthService, private router: Router) { }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  userForm!: FormGroup;
  

  get f() { return this.userForm.controls; }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cellphone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern("^[0-9]*$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(){
    console.log(this.userForm.value)
    this.user.signup(this.userForm.value).subscribe(
      {
        next: (res: any) => {
          console.log(res)
          
        },error: (err: any)=>{
          console.log(err)
        }
      }
    )

  }


}
