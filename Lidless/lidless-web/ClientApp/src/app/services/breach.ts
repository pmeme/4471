export interface Breach {
  Name: string,
  Title: string,
  Domain: string,
  BreachDate: string,
  AddedDate: string,
  ModifiedDate: string,
  PwnCount: number,
  Description: string,
  LogoPath: string,
  DataClasses: Array<string>,
  IsVerified: boolean,
  IsFabricated: boolean,
  IsSensitive: boolean,
  IsRetired: boolean,
  IsSpamList: boolean
}