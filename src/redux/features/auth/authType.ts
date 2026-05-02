export interface User {
  id: string;
  name: string;
  email: string;
  role: string; profilePicture?: string; 
  avatar?: {               
    url: string;
    publicId?: string;
  };
};

export interface AuthState {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
  isCheckingAuth: boolean;
  isAuthenticated: boolean;
};



export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
};

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  
};

export interface LogoutResponse {
  message: string;
};

export interface ProfileResponse {
  user: User;
};

export interface UpdateProfileResponse {
  user: User;
  message: string;
};

export interface UpdateProfileInput {
  name?: string;
  email?: string;
  password?: string;
};

export interface DeleteUserResponse {
  message: string;
};

export interface GetUsersResponse {
  users: User[];
}