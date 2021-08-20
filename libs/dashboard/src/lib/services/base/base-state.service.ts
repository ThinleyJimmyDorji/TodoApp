import { Injectable } from '@angular/core';
import {
  ObservableStore,
  StateWithPropertyChanges,
} from '@codewithdan/observable-store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseStateService<T> extends ObservableStore<T> {
  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });
  }

  specificStateChange<U>(
    stateKey: string,
    allowFilter: boolean = true
  ): Observable<U> {
    return this.stateWithPropertyChanges.pipe(
      filter(
        (stateChange: StateWithPropertyChanges<any>) =>
          !allowFilter || (allowFilter && !!stateChange.stateChanges[stateKey])
      ),
      map((stateChange) => stateChange.stateChanges[stateKey])
    );
  }

  specificGlobalStateChange<U>(stateKey: string): Observable<U> {
    return this.globalStateWithPropertyChanges.pipe(
      filter(
        (stateChange: StateWithPropertyChanges<any>) =>
          !!stateChange?.stateChanges?.[stateKey]
      ),
      map((stateChange) => stateChange?.stateChanges?.[stateKey])
    );
  }

  updateSpecificState<U>(data: U, stateKey: string): T {
    return this.setState(
      { [stateKey]: data } as unknown as Partial<T>,
      'UPDATE_' + stateKey.toUpperCase()
    );
  }

  getSpecificState = <U>(state?: string): U =>
    state ? this.getState()[state] : this.getState();
}
