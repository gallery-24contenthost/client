export interface User {
    id: number;
    name: string;
    email: string;
    updated_at: string;
    created_at: string;
}

// Тип данных, отправляемых при логине
export interface LoginData {
    email: string | null;
    password: string | null;
}

export interface LoginErrors {
    email: string | null;
    password: string | null;
}

export interface RegisterData {
    name: string | null;
    email: string  | null;
    password: string  | null;
    password_confirmation: string | null;
}

export interface RegisterErrors {
    name: string | null;
    email: string  | null;
    password: string  | null;
    password_confirmation: string | null;
}


export interface AccountEditData {
    name?: string;
}

export interface AccountEditErrors {
    name: string | null;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData  {
    password: string,
    password_confirmation: string,
    token: string,
    email: string
}


export interface LoginResponse {
    user: User | null;
}

export interface RegisterResponse {
    user: User | null;
}

export interface GetUserResponse {
    user: User | null;
}

export interface AccountEditResponse {
    user: User | null
}

