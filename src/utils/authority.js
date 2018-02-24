// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  let authority = localStorage.getItem('bit-admin-authority');
  return authority ? JSON.parse(authority) : '';
}

export function setAuthority(authority) {
  return localStorage.setItem('bit-admin-authority', authority ? JSON.stringify(authority) : '');
}
