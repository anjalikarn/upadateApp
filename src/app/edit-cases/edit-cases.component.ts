import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-cases',
  templateUrl: './edit-cases.component.html',
  styleUrls: ['./edit-cases.component.scss']
})
export class EditCasesComponent implements OnInit {

  casesForm: FormGroup;
  id = '';
  name = '';
  gender = '';
  age: number = null;
  address = '';
  city = '';
  country = '';
  status = '';
  statusList = ['Positive', 'Dead', 'Recovered'];
  genderList = ['Male', 'Female'];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCasesById(this.route.snapshot.params.id);
    this.casesForm = this.formBuilder.group({
      name : [null, Validators.required],
      gender : [null, Validators.required],
      age : [null, Validators.required],
      address : [null, Validators.required],
      city : [null, Validators.required],
      country : [null, Validators.required],
      status : [null, Validators.required],
      action_type : [null, Validators.required],
      id : [null, Validators.required]
    });
  }

  getCasesById(id: any) {
    this.api.getCasesById(id).subscribe((data: any) => {
      this.id = data.data[0].id;
      this.casesForm.setValue({
        name: data.data[0].name,
        gender: data.data[0].gender,
        age: data.data[0].age,
        address: data.data[0].address,
        city: data.data[0].city,
        country: data.data[0].country,
        status: data.data[0].status,
        action_type: "update_case",
        id : data.data[0].id
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateCases(this.casesForm.value)
      .subscribe((res: any) => {
          //const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/cases-details', this.route.snapshot.params.id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  casesDetails() {
    this.router.navigate(['/cases-details', this.id]);
  }

}
