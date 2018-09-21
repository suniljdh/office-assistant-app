export function tokenSetter(token: string) {
  sessionStorage.setItem('access-token', token);
}
export function tokenGetter() {
  return sessionStorage.getItem('access-token');
}

export function removeToken() {
sessionStorage.removeItem('access-token');
}
