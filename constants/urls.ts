export const TABS_PATH = '(tabs)';
export const SIGN_IN_SCREEN_PATH = '/auth/screens/SignInScreen';
export const SIGN_UP_SCREEN_PATH = '/auth/screens/SignUpScreen';
export const DEV_HOST = 'http://localhost:4000';
export const API = process.env.EXPO_PUBLIC_API_URL || DEV_HOST;
export const LOGIN = API + '/auth/login';
export const SIGNUP = API + '/auth/signup';
