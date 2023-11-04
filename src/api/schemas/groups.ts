export const ListQuerySchema = (f: any) => ({

})

export const CreateSchema = (f: any) => ({
  name: f.string(),
  groupType: f.string().valid(['SCHOOL', 'LEAGUE']),
  accountId: f.string().required(),
})