export const ListQuerySchema = f => ({

})

export const CreateSchema = f => ({
  name: f.string(),
  accountId: f.string().required(),
})
