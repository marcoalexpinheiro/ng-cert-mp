import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  constructor() {}

  //localStorage!
  //sessionStorage.setItem(USER_KEY, JSON.stringify(this.user));
  //this.user = JSON.parse(sessionStorage.getItem(USER_KEY)!);
  //sessionStorage.clear();

  /**
   * Set item in the session storage
   * @param key
   * @param value
   */
  public setItem(key: string, value: string): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get item from session storage
   * @param key
   */
  public getItem(key: string): string {
    return JSON.parse(sessionStorage.getItem(key)) ?? '';
  }

  /**
   * Check if item exist in session storage
   * @param key
   */
  public exist(key: string): boolean {
    return !!sessionStorage.getItem(key);
  }

  /**
   * Cleans the session storage
   */
  public clear(): void {
    sessionStorage.clear();
  }

  /**
   * removes an item from session storage thx to its key
   * @param key
   */
  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
