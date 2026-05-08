/**
 * Top-level cache namespaces used by React Query. Add a new entry here
 * whenever you introduce a new API module.
 */
export enum QUERY_KEYS {
  LOGIN = 'login',
  REGISTER = 'register',
  USER = 'user',
  COURSE_CATEGORY = 'course_category',
}

/** Sub-keys that describe the action being performed inside a namespace. */
export enum ACTION_KEYS {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  GET = 'get',
  GET_BY_ID = 'get_by_id',
}
