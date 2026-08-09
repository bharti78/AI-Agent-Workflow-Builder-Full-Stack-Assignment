export const MY_ORGANIZATIONS_QUERY = `
  query MyOrganizations($userId: uuid!) {
    organizations(order_by: { created_at: asc }) {
      id
      name
      quota_allowed
      quota_used
      members(where: { user_id: { _eq: $userId } }) {
        role
      }
    }
  }
`;

export const UPDATE_MEMBER_ROLE_MUTATION = `
  mutation UpdateMemberRole($memberId: uuid!, $role: String!) {
    update_org_members_by_pk(pk_columns: { id: $memberId }, _set: { role: $role }) {
      id
      role
    }
  }
`;

export const REMOVE_MEMBER_MUTATION = `
  mutation RemoveMember($memberId: uuid!) {
    delete_org_members_by_pk(id: $memberId) {
      id
    }
  }
`;

export interface OrganizationRow {
  id: string;
  name: string;
  quota_allowed: number;
  quota_used: number;
  members: { role: "owner" | "editor" | "viewer" }[];
}
