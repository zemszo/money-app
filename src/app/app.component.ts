import { Component } from '@angular/core';
import { MoneyService } from './money.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Currency converter';
  directResult = '';
  indirectResult = '';
  difference = 0;
  conversionRate = '';

  constructor(
    private moneyService: MoneyService
  ) { }

  convert(from: string, to: string, amount: string): void {
    this.moneyService.getCurrency(from, to, Number(amount))
      .subscribe(data => {
        console.log(data);
        this.directResult = data.result;
        this.conversionRate = data.info.rate;
      });
    this.moneyService.getCurrency(from, 'EUR', Number(amount))
      .subscribe(data => {
        console.log(data);
        this.moneyService.getCurrency('EUR', to, Number(data.result))
          .subscribe(data => {
            console.log(data);
            this.indirectResult = data.result;
            this.difference = Number(this.directResult) - Number(this.indirectResult);
          })
      });
  }
}
