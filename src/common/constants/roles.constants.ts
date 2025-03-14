export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const PERMISSIONS = {
  CREATE_USER: 'create-user',
  READ_USER: 'read-user',
  UPDATE_USER: 'update-user',
  DELETE_USER: 'delete-user',
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.READ_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.DELETE_USER,
  ],
  [ROLES.USER]: [PERMISSIONS.READ_USER],
};
