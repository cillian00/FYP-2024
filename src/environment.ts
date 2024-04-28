export const SECRET_KEY: string = ''
export const SUPER_SECRET_KEY: string = ''
export const UserPoolId: string = ''
export const ClientPoolId: string = ''

export const environment = {
  production: false,
  cognito: {
    userPoolId: UserPoolId,
    userPoolWebClientId: ClientPoolId
  }
}
