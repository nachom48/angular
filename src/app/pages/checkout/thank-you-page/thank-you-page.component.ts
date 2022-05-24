import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you-page',
  template: `
  <div class="container">
    <h1 class="title">Thank You!</h1>
    <p class="content">
      Your order is on the way!
    </p>
    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. A placeat nihil id. Eligendi repudiandae sed magnam excepturi harum at laudantium amet accusantium aspernatur dolore atque facilis minima, eaque et sapiente.</span>
</div>

`,
  styleUrls: ['./thank-you-page.component.css']
})
export class ThankYouPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
