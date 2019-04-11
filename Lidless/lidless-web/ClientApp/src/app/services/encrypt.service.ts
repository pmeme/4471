import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  private _key: string;
  private saltLen = 6;

  constructor() { }

  public saveKey(k: string) {
    this._key = k.trim();
  }

  public encrypt(plainText: string): string {
    var salt: string = "";
    for (var i = 0; i < this.saltLen; i++) {
      salt += Math.floor(Math.random() * 16).toString(16);
    }
    return CryptoJS.AES.encrypt(salt + plainText, this._key).toString();
  }

  public decrypt(cryptText: string): string {
    var unprocessed: string = CryptoJS.AES.decrypt(cryptText, this._key).toString();
    var processed: string = "";
    for (var i: number = this.saltLen * 2; i < unprocessed.length; i += 2) {
      processed += String.fromCharCode(parseInt(unprocessed.substring(i, i + 2), 16));
    }
    return processed;
  }

}
