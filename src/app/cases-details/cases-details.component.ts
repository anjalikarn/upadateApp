import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Cases } from '../cases';

@Component({
  selector: 'app-cases-details',
  templateUrl: './cases-details.component.html',
  styleUrls: ['./cases-details.component.scss']
})
export class CasesDetailsComponent implements OnInit {

  cases: Cases = { id: '', name: '', gender: '', age: null, address: '', city: '', country: '', status: '', updated: null };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getCasesDetails(this.route.snapshot.params.id);
  }

  getCasesDetails(id: string) {
    this.api.getCasesById(id)
      .subscribe((data: any) => {
        //alert(JSON.stringify(data))
        this.cases = data.data[0];
        console.log(this.cases.name);
        this.isLoadingResults = false;
      });
  }

  deleteCases(id: any) {
    debugger;
    this.isLoadingResults = true;
    this.api.deleteCases(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/cases']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  setColor(status: string) {
    let color: string;
    if (status === 'Positive') {
      color = 'orange-color';
    } else if (status === 'Recovered') {
      color = 'green-color';
    } else {
      color = 'red-color';
    }

    return color;
  }

}
