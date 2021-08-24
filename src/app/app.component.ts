import { Component, OnInit } from '@angular/core';
import { RootScopeEventsService } from './root-scope-events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  testEventKey1 = 'Event 1';
  testEventKey2 = 'Event 2';
  showEvent2 = true;

  constructor(private $rootScope: RootScopeEventsService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.$rootScope.$emit(this.testEventKey1, 'I am event 1');
    }, 2000);

    setTimeout(() => {
      this.$rootScope.$emit(this.testEventKey2, 'I am event 2');
    }, 4000);

    setTimeout(() => {
      this.showEvent2 = false;
    }, 6000);

    setTimeout(() => {
      this.$rootScope.$emit(this.testEventKey1, 'I am event 1, again');
    }, 8000);
  }

}
