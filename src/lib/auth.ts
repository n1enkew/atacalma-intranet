// Keys de almacenamiento local para los datos de autenticación.
const USER_ACCOUNTS_KEY = 'userAccounts';
const LOGGED_USER_KEY = 'loggedInUser';
const SHOPPING_LIST_KEY = 'shoppingList';

interface UserAccount {
  username: string;
  password: string;
}

const defaultAdminAccount: UserAccount = {
  username: 'admin',
  password: 'admin123',
};

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function getStoredAccounts(): UserAccount[] {
  if (!isBrowser()) return [defaultAdminAccount];

  // Lee las cuentas guardadas en localStorage.
  const raw = window.localStorage.getItem(USER_ACCOUNTS_KEY);
  if (!raw) {
    window.localStorage.setItem(USER_ACCOUNTS_KEY, JSON.stringify([defaultAdminAccount]));
    return [defaultAdminAccount];
  }

  try {
    return JSON.parse(raw) as UserAccount[];
  } catch {
    window.localStorage.setItem(USER_ACCOUNTS_KEY, JSON.stringify([defaultAdminAccount]));
    return [defaultAdminAccount];
  }
}

function saveStoredAccounts(accounts: UserAccount[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(USER_ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function ensureAdminAccount() {
  // Garantiza que siempre exista al menos una cuenta admin por defecto.
  if (!isBrowser()) return;
  const accounts = getStoredAccounts();
  const hasAdmin = accounts.some((account) => account.username === defaultAdminAccount.username);
  if (!hasAdmin) {
    saveStoredAccounts([defaultAdminAccount, ...accounts]);
  }
}

export function loginUser(username: string, password: string) {
  if (!isBrowser()) return false;
  const accounts = getStoredAccounts();
  const match = accounts.find((account) => account.username === username && account.password === password);
  if (match) {
    window.localStorage.setItem(LOGGED_USER_KEY, username);
    return true;
  }
  return false;
}

export function registerUser(username: string, password: string) {
  if (!isBrowser()) return { success: false, message: 'Navegador no soportado' };

  const normalized = username.trim().toLowerCase();
  if (!normalized || !password) {
    return { success: false, message: 'Usuario y contraseña son obligatorios' };
  }

  const accounts = getStoredAccounts();
  if (accounts.some((account) => account.username === normalized)) {
    return { success: false, message: 'El nombre de usuario ya existe' };
  }

  const nextAccounts = [...accounts, { username: normalized, password }];
  saveStoredAccounts(nextAccounts);
  window.localStorage.setItem(LOGGED_USER_KEY, normalized);
  return { success: true, message: 'Cuenta creada correctamente' };
}

export function logoutUser() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(LOGGED_USER_KEY);
}

// Devuelve el usuario actualmente logueado o null si no hay ninguno.
export function getLoggedInUser() {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(LOGGED_USER_KEY);
}

export interface ShoppingItem {
  id: string;
  name: string;
  purchased: boolean;
  createdAt: string;
}

export function loadShoppingList(): ShoppingItem[] {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(SHOPPING_LIST_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ShoppingItem[];
  } catch {
    return [];
  }
}

export function saveShoppingList(items: ShoppingItem[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(items));
}
