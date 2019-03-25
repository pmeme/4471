import { Breach } from "./breach";
import { Paste } from "./Paste";

export interface Account {
  id?: string;
  username: string;
  host: string;
  password: string;
  breaches?: Breach[];
  pastes?: Paste[];
}
