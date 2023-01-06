import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  constructor(private user: AuthService){}

  userForm!: FormGroup;

  
  

  get f() { return this.userForm.controls; }

  ngOnInit() {
    this.userForm = new FormGroup({
      cellphone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern("^[0-9]*$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(){
    console.log(this.userForm.value)

    this.user.signin(this.userForm.value).subscribe(
      {
        next: (res: any)=>{
          console.log(res)
        },error: (err: any)=>{
          console.log(err)
        }
      }
    )
  }


}
