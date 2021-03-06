import { Breach } from "./breach";
import { Paste } from "./Paste";

export interface Account {
  id?: string;
  username: string;
  updatedDate: string;
  host: string;
  password: string;
  domainRestricted: boolean;
  breaches?: Breach[];
  pastes?: Paste[];
}
