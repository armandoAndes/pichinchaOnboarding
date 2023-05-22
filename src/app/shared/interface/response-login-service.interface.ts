export interface ResponseLoginServiceInterface {
    user: UserResponse;
    access_token: string;
    tokenType: string;
}
interface UserResponse {
    userId: string;
    username: string;
}