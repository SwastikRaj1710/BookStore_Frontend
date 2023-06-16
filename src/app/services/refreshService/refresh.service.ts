import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  refreshBooks: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }
}
