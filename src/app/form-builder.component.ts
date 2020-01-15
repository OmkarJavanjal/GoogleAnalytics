import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CustomEventService} from './custom-event.service';
import { Router } from '@angular/router';
import { SuccessComponent } from './success/success.component';
import { EventListenerService } from './event-listener.service';


@Component({
  selector: 'app-form-builder',
  template: `
  <br>
  <br>
  <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)" >
    <table>
  <tr>
    <td>Name  :</td>
    <td><input type="text" id="firstname" name="firstname" formControlName="name"></td>
   <div class="error" *ngIf="(myForm.controls['name'].invalid && myForm.controls['name'].touched)"> Please Enter Name </div>
  </tr>   
  <tr>
    <td>Phone No :</td>
    <td><input type="text" id="phno" name="phno" formControlName="phoneNo" data-dl='{"id":"formField", "da_track":"false","event":"change","event_action":"FormBlur","event_category":"Blur"}'></td>
    <div class="error" [hidden]="!(myForm.controls['phoneNo'].invalid && myForm.controls['phoneNo'].touched)"> Please Enter Phone No </div>
  </tr>

  <tr>
    <td>Email Id :</td>
    <td><input type="text"  formControlName="emailId" data-dl='{"id":"formField", "da_track":"false","event":"change","event_action":"FormBlur","event_category":"Blur"}'></td>
       <div class="error" [hidden]="!(myForm.controls['emailId'].invalid && myForm.controls['emailId'].touched)"> Please Enter email Id </div>
  </tr>

  <tr>
    <td>Comments :</td>
    <td><input type="text"   formControlName="comments" data-dl='{"id":"formField", "da_track":"false","event":"change","event_action":"FormBlur","event_category":"Blur"}'></td>
    <div class="error" [hidden]="!(myForm.controls['comments'].invalid && myForm.controls['comments'].touched)"> Please Enter Comments </div>
  </tr>

<tr>
    <td>Gender :</td>
    <td><input type="radio" id="radio" name="gender" value="Male" formControlName="gender" data-dl='{"id":"Radiobutton", "da_track":"true", "event":"change","event_action":"GenderChange","event_category":"Change"}'>Male
    <input type="radio" id="radio" name="gender" value="Female" formControlName="gender" data-dl='{"id":"Radiobutton", "da_track":"true", "event":"change","event_action":"GenderChange","event_category":"Change"}'>Female</td>
    <div class="error" [hidden]="!(myForm.controls['gender'].invalid && myForm.controls['gender'].touched)"> Please select gender </div>
  </tr>

  <tr>
    <td>Select City:</td>
    <td><select id="city" name="city">
    <option value="">Mumbai</option>
    <option value="">Margao</option>
    <option value="">Pune</option>
    <option value="">Bangalore</option>
    </select>
    
    </td>
    <!--div class="error" [hidden]="!(myForm.controls['city'].invalid && myForm.controls['city'].touched)"> Please select city </div-->
  </tr>

</table>
<input type="submit" value="Submit Feedback" [disabled]="!myForm.valid" class="submit" data-dl='{"id":"Submit", "da_track":"true"}'/>
</form>
  `,
  styles: [`
  
  input[type=text], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
.error{
  color:red;
}
  `]
})
export class FormBuilderComponent implements OnInit{

  
  myForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private  router:  Router,private customEvents:CustomEventService,private eventlistener : EventListenerService) {
  }

  onSubmit(value) {
    this.customEvents.formSuccess();
    this.router.navigate(['/success']);   
  }
  
  ngOnInit(): any {
 this.myForm=this._formBuilder.group({
      'name' :['',Validators.required],
      'phoneNo' :['',[Validators.required,]],
      'emailId' :['',Validators.required],
      'comments' :['',Validators.required],
      'gender':['',Validators.required]
    });
    
  }
 
}
