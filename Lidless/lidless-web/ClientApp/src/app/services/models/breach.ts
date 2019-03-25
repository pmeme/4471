export interface Breach {
  name: string,
  title: string,
  domain: string,
  breachDate: string,
  addedDate: string,
  modifiedDate: string,
  pwnCount: number,
  description: string,
  logoPath: string,
  dataClasses: Array<string>,
  isVerified: boolean,
  isFabricated: boolean,
  isSensitive: boolean,
  isRetired: boolean,
  isSpamList: boolean
}
