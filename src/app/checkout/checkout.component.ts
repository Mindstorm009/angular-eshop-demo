import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  useDifferentBillingAddress: Boolean;
  years: Array<Number>;
  months: Array<String>;
  countries: Array<String>;
  selectedShippingCountry: String = 'India';
  selectedBillingCountry: String  = 'India';
  selectedMonth: String = 'Jan';
  selectedYear: Number = 2018;

  constructor() {}

  ngOnInit() {
    this.years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.countries = ['India', 'USA', 'UK', 'Australia'];
  }

  showHideBillingAddress(e) {
    const billingAddressEl: any = document.getElementsByClassName('billing-address')[0];
    if (e.target.checked) {
      billingAddressEl.style.display = 'block';
    } else {
      billingAddressEl.style.display = 'none';
    }
  }

  selectMonth(e) {
    this.selectedMonth = e.toElement.innerText;
  }

  selectYear(e) {
    this.selectedYear = e.toElement.innerText;
  }

  selectShippingCountry(e) {
    this.selectedShippingCountry = e.toElement.innerText;
  }

  selectBillingCountry(e) {
    this.selectedBillingCountry = e.toElement.innerText;
  }
}
