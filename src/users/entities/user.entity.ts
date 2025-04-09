import { Profile } from './profile.entity';

export class User {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  role: string;
  permissions: string[];
  profile: Profile;
}
