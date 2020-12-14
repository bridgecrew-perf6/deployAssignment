import { Component } from '@angular/core';
import {FormGroup, FormControl,Validators,ValidationErrors, AbstractControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  {

   
  constructor(private http:HttpClient)
  {

  }

  data=''
  value = ''  
  
 
  
  onClickNumber()
  { 
    this.data = 'enter number'
    this.value = "number" 
   
  }

  onClickEmail()
  { 
    this.data= "enter email"
    this.value="email"
  } 




  form = new FormGroup({
    'name' : new FormControl('',[Validators.required,Validators.pattern( /^[A-Za-z]+$/)]),
    'searchany' : new FormControl('',[Validators.required]),
    'Input' : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),this.mobileValidation]),
  })



mobileValidation(c:AbstractControl) : ValidationErrors | null
{
  let phoneno = /^\d{10}$/;
  if(!(c.value.match(phoneno)))
  {
    return {mobileValidation : true}
  }

  return null

}


onSubmit() {
 
  
  {this.http.post('https://reqres.in/api/users',this.form.value).toPromise().then(
    data=>
    console.log(data)
  );


  console.log(this.form);
}
}

onClick()
{
  var format =  /^[A-Za-z]+$/;
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let phoneno = /^\d{10}$/;
  if((this.form.value.name=='')||!(this.form.value.name.match(format)))
  {
    
    return true

  }
  
  if(this.form.value.searchany=='number'){

  if((this.form.value.Input=='')||!(this.form.value.Input.length==10)||!(this.form.value.Input.match(phoneno)))
  {
   return true
  }

}

if(this.form.value.searchany=='')
{
  return true;
}


if(this.form.value.searchany=='email'){

  if((this.form.value.Input=='')||!(this.form.value.Input.match(mailformat)))
  {
   return true
  }

}
  return false
  
}
 

}


