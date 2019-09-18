/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getValueUnit = `query GetValueUnit($id: ID!) {
  getValueUnit(id: $id) {
    id
    name
    content
  }
}
`;
export const listValueUnits = `query ListValueUnits(
  $filter: ModelValueUnitFilterInput
  $limit: Int
  $nextToken: String
) {
  listValueUnits(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      content
    }
    nextToken
  }
}
`;
