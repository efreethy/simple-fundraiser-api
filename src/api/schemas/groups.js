export const ListQuerySchema = f => ({

})

export const CreateSchema = f => ({
  name: f.string(),
  groupType: f.string().valid(['SCHOOL', 'LEAGUE']),
  accountId: f.string().required(),
})
