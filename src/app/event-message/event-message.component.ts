import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RootScopeEventsService } from '../root-scope-events.service';

@Component({
  selector: 'app-event-message',
  templateUrl: './event-message.component.html',
  styleUrls: ['./event-message.component.css']
})
export class EventMessageComponent implements OnInit, OnDestroy {
  @Input() listenFor: string;
  message: string;
  private unregister: Function;

  constructor(private $rootScope: RootScopeEventsService) {}

  ngOnInit() {
    this.message = `Waiting for ${this.listenFor} message...`;
    this.unregister = this.$rootScope.$on(this.listenFor, ($event) => {
      this.message = `${this.listenFor}: Message received: '${$event}'`;
    });
  }

  ngOnDestroy() {
    this.unregister();
  }
}
