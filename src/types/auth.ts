export type UserRole = 'candidate' | 'company';

export interface User {
  id: string;
  email: string;
  username?: string;
  gender?: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}




/* // اخر حاجه عشان لو عدلت تاني ميفرقعش ف وشي */