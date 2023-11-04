export const ListQuerySchema = (f: any) => ({

})

export const CreateSchema = (f: any) => ({
  name: f.string(),
  accountId: f.string().required(),
})