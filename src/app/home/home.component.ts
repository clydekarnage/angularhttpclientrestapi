import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  products: any = [];

  constructor(private dataService: DataService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {

    this.dataService.sendGetRequest().subscribe((res: any) => {
      console.log(res);
      this.products = res;
    });
  }

  ngOnDestroy(): void {}



}
