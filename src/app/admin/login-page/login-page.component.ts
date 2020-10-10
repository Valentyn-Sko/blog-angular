import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup
  submitted = false
  message: string

  constructor(
    public auth: AuthService, 
    private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params)=>{
      if(params['loginAgain']){
        this.message = "Please relogin again"
      }else  if(params['authFailed']){
        this.message = "Please relogin again, session was ended"
      }
    })
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    //console.log(this.form)
    this.submitted=true
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    console.log(user)
    this.auth.login(user).subscribe(()=>{
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted=false
    }, () =>{
      this.submitted=false
    })
  }



}
