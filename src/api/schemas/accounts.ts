export const CreateSchema = (f: any) => ({
  email: f.string(),
  username: f.string(),
  password: f.string().required(),
  accountType: f.string().valid([ 'SPONSOR', 'REPRESENTATIVE' ])
})


export const LoginSchema = (f: any) => ({
  email: f.string(),
  username: f.string(),
  password: f.string().required(),
})


export const ReadSchema = (f: any) => ({
  id: f.string().length('account-'.length + 12).required()
})