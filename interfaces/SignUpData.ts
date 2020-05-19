import { PersonalData } from './PersonalData';
import { Credentials } from './Credentials';

export interface SignUpData {
  credentials: Credentials;
  personalData: PersonalData;
}