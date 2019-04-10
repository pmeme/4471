import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class NotificationService {
  abstract generateNotification(options: chrome.notifications.NotificationOptions, callback?: (notificationId: string) => void): void;
}
