export class AuthResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
  };
  accessToken: string;
  expires: string;
}
