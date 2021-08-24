import { TestBed } from '@angular/core/testing';
import { RootScopeEventsService } from './root-scope-events.service';

describe('RootScopeEventsService', () => {
  let service: RootScopeEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RootScopeEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when an event is emitted', () => {
    const eventKey = 'testEvent';

    it('calls a registered function', () => {
      const callback = jasmine.createSpy('callback');

      service.$on(eventKey, callback);
      service.$emit(eventKey);
  
      expect(callback).toHaveBeenCalled();
    });

    it('calls a registered function every time', () => {
      const callback = jasmine.createSpy('callback');

      service.$on(eventKey, callback);      
      service.$emit(eventKey);
      service.$emit(eventKey);
  
      expect(callback).toHaveBeenCalledTimes(2);
    });
  
    it('calls all registered functions', () => {
      const callback1 = jasmine.createSpy('callback 1');
      const callback2 = jasmine.createSpy('callback 2');
      const callback3 = jasmine.createSpy('callback 3');

      service.$on(eventKey, callback1);
      service.$on(eventKey, callback2);
      service.$on(eventKey, callback3);      
      service.$emit(eventKey);
  
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(callback3).toHaveBeenCalledTimes(1);
    });
  
    it('only calls listeners for the event', () => {
      const event2Key = "event 2";
      const callback1 = jasmine.createSpy('callback 1');
      const callback2 = jasmine.createSpy('callback 2');

      service.$on(eventKey, callback1);
      service.$on(event2Key, callback2);
      service.$emit(event2Key);

      expect(callback1).not.toHaveBeenCalled();
    });

    it('does not call unregistered functions', () => {
      const callback = jasmine.createSpy('callback');
      const unregister = service.$on(eventKey, callback);

      service.$emit(eventKey);  
      unregister();
      service.$emit(eventKey);
  
      expect(callback).toHaveBeenCalledTimes(1);
    });
  
    it('passes data to registered listeners', () => {
      const callback = jasmine.createSpy('callback');
      const data = 'test data';

      service.$on(eventKey, callback);      
      service.$emit(eventKey, data);
  
      expect(callback).toHaveBeenCalledWith(data);
    });  
  });

  describe('handling exceptions in listeners', () => {
    const eventKey = 'testEvent';
    it('logs an error message', () => {
      spyOn(window.console, 'error');
      const errorListener = () => {
        throw new Error('error');
      };

      service.$on(eventKey, errorListener);      
      service.$emit(eventKey);
  
      expect(window.console.error).toHaveBeenCalled();
    });

    it('calls all other listeners', () => {
      spyOn(window.console, 'error');
      const errorListener = () => {
        throw new Error('error');
      };
      const goodListener1 = jasmine.createSpy('goodListener1') ;
      const goodListener2 = jasmine.createSpy('goodListener2') ;

      service.$on(eventKey, goodListener1);
      service.$on(eventKey, errorListener);
      service.$on(eventKey, goodListener2);      
      service.$emit(eventKey);
  
      expect(goodListener1).toHaveBeenCalled();
      expect(goodListener2).toHaveBeenCalled();
    });
  });

});
