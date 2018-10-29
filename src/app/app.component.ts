import { Component } from '@angular/core';

import { AppService } from './app.service';

import { ApiModel } from './Model/api.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public ApiList: Array<ApiModel> = new Array<ApiModel>();

  constructor(
    private appService: AppService
  ) {
    this.UpdateAllList();
  }

  public UpdateAllList(): void {
    this.appService.GetList().subscribe(result => {
      if (result) {
        this.ApiList = result.list;

        this.ApiList.forEach(item => {
          item.colorText = this.GetRandomColor();
        });

      }
    });
  }

  public GetRandomColor(): string {
    let list = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      0.2
    ];

    return "rgb(" + list.join(",") + ")";
  }

  public SearchChange(value: string): void {
    if (value.length < 1) {
      this.UpdateAllList();
    }
    else {
      this.ApiList = new Array<ApiModel>();

      this.appService.GetList().subscribe(result => {
        if (result) {
          this.ApiList = result.list;

          this.ApiList = this.ApiList.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));

          this.ApiList.forEach(item => {
            item.colorText = this.GetRandomColor();
          });
        }
      });
    }
  }

}
