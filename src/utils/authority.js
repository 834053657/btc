// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('bit-admin-authority') || 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem('bit-admin-authority', authority);
}
