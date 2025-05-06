const Auth = {
  login: (token: string) => {
    localStorage.setItem('token', token);
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  getToken: () => {
    return localStorage.getItem('token');
  },
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },
};

export default Auth;