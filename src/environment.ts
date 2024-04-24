export const SECRET_KEY: string = 'AKIA3UF3XMLOWRVTO2GV'
export const SUPER_SECRET_KEY: string ='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'
export const UserPoolId: string = 'eu-west-1_hfiyznUDM'
export const ClientPoolId: string = '3m71vm63gp9jsmnro3rdl5ttof'

export const environment = {

  production: false,
    cognito: {
       userPoolId: UserPoolId,
       userPoolWebClientId: ClientPoolId
  }
}
