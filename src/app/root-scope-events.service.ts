import { Injectable } from '@angular/core';

type RootScopeEventListener = (data?: any) => void;
class RootScopeEvent {
  listeners = new Array<RootScopeEventListener>();
}

@Injectable({
  providedIn: 'root'
})
export class RootScopeEventsService {
  private events: Record<string, RootScopeEvent> = {};

  $emit(key: string, data?: any): void {
    let event = this.events[key];
    if (!event) {
      this.addEvent(key);
    } else {
      event.listeners.forEach(listener => {
        try {
          listener(data);
        } catch (exception) {
          console.error(`Error handling event ${key}}: ${JSON.stringify(exception)}`);
        }
      });
    }
  }

  $on(key: string, listener: RootScopeEventListener): () => void {
    let event = this.events[key];
    if (!event) {
      event = this.addEvent(key);
    }

    event.listeners.push(listener);

    return () => {
      this.unregisterListener(key, listener);
    };
  }

  private addEvent(key: string): RootScopeEvent {
    const newEvent = new RootScopeEvent();
    this.events[key] = newEvent;
    return newEvent;
  }

  private unregisterListener(
    key: string,
    listener: RootScopeEventListener
  ): void {
    const event = this.events[key];
    if (!event) {
      return;
    }

    const index = event.listeners.indexOf(listener);
    if (index < 0) {
      return;
    }

    event.listeners.splice(index, 1);

    if (event.listeners.length === 0) {
      delete this.events[key];
    }
  }
}
