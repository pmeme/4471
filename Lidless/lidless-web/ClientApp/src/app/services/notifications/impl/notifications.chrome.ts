import { NotificationService } from "../notification.service";

export class ChromeNotificationService extends NotificationService {


  generateNotification(options: chrome.notifications.NotificationOptions, callback?: (notificationId: string) => void): void {
    chrome.notifications.create(options, callback);
  }
}
