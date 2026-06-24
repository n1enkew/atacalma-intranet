import bcrypt from 'bcryptjs';

// Keys de almacenamiento local para los datos de autenticación.
const USER_ACCOUNTS_KEY = 'userAccounts';
const LOGGED_USER_KEY = 'loggedInUser';
const SHOPPING_LIST_KEY = 'shoppingList';

// Salt rounds determina cuántas veces se aplica el algoritmo de hashing.
// Más rondas = mayor seguridad, pero también mayor costo de procesamiento.
const SALT_ROUNDS = 10;

interface UserAccount {
  // Guardamos hashes en lugar de texto plano para mejorar la seguridad.
  usernameHash: string;
  passwordHash: string;
}

const defaultAdminAccount = {
  username: 'admin',
  password: 'admin123',
};

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function normalizeUsername(username: string) {
  // Normalizar el nombre de usuario evita diferencias entre mayúsculas y espacios.
  return username.trim().toLowerCase();
}

function hashValue(value: string) {
  // bcrypt.hashSync usa salt internamente y devuelve un hash seguro.
  // El valor original no puede reconstruirse a partir del hash.
  return bcrypt.hashSync(value, SALT_ROUNDS);
}

function verifyHash(value: string, hash: string) {
  // bcrypt.compareSync compara un valor en texto plano con su hash.
  // Si coinciden, significa que el valor original generó ese hash.
  return bcrypt.compareSync(value, hash);
}

function createHashedAccount(username: string, password: string): UserAccount {
  return {
    usernameHash: hashValue(normalizeUsername(username)),
    passwordHash: hashValue(password),
  };
}

function getStoredAccounts(): UserAccount[] {
  if (!isBrowser()) return [createHashedAccount(defaultAdminAccount.username, defaultAdminAccount.password)];

  const raw = window.localStorage.getItem(USER_ACCOUNTS_KEY);
  const defaultAccount = createHashedAccount(defaultAdminAccount.username, defaultAdminAccount.password);
  if (!raw) {
    saveStoredAccounts([defaultAccount]);
    return [defaultAccount];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Invalid accounts format');

    const accounts = parsed.map((account) => {
      // Si ya tenemos cuentas en formato hashed, las usamos directamente.
      if (
        account &&
        typeof account === 'object' &&
        'usernameHash' in account &&
        'passwordHash' in account
      ) {
        return {
          usernameHash: String((account as any).usernameHash),
          passwordHash: String((account as any).passwordHash),
        };
      }

      // Si vienen cuentas antiguas con usuario/contraseña en texto plano,
      // las convertimos inmediatamente a hashes y las guardamos de nuevo.
      if (
        account &&
        typeof account === 'object' &&
        'username' in account &&
        'password' in account
      ) {
        return createHashedAccount(
          String((account as any).username),
          String((account as any).password),
        );
      }

      throw new Error('Invalid account entry');
    });

    saveStoredAccounts(accounts);
    return accounts;
  } catch {
    saveStoredAccounts([defaultAccount]);
    return [defaultAccount];
  }
}

function saveStoredAccounts(accounts: UserAccount[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(USER_ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function ensureAdminAccount() {
  // Garantiza que siempre exista al menos una cuenta admin por defecto.
  // Aquí buscamos el hash del nombre de usuario admin, no el texto "admin" directamente.
  if (!isBrowser()) return;
  const accounts = getStoredAccounts();
  const hasAdmin = accounts.some((account) =>
    verifyHash(defaultAdminAccount.username, account.usernameHash),
  );
  if (!hasAdmin) {
    saveStoredAccounts([createHashedAccount(defaultAdminAccount.username, defaultAdminAccount.password), ...accounts]);
  }
}

export function loginUser(username: string, password: string) {
  if (!isBrowser()) return false;

  const normalized = normalizeUsername(username);

  // Cargamos todas las cuentas y buscamos la que coincida con el usuario y contraseña.
  // Como guardamos hashes, no podemos comparar texto directo; usamos verifyHash.
  const accounts = getStoredAccounts();
  const match = accounts.find(
    (account) =>
      verifyHash(normalized, account.usernameHash) && verifyHash(password, account.passwordHash),
  );

  if (match) {
    // Guardamos sólo el nombre normalizado en sesión, no el hash de la contraseña.
    window.localStorage.setItem(LOGGED_USER_KEY, normalized);
    return true;
  }

  return false;
}

export function registerUser(username: string, password: string) {
  if (!isBrowser()) return { success: false, message: 'Navegador no soportado' };

  const normalized = normalizeUsername(username);
  if (!normalized || !password) {
    return { success: false, message: 'Usuario y contraseña son obligatorios' };
  }

  const accounts = getStoredAccounts();
  if (accounts.some((account) => verifyHash(normalized, account.usernameHash))) {
    return { success: false, message: 'El nombre de usuario ya existe' };
  }

  // Al registrar, convertimos el nombre de usuario y la contraseña a hashes.
  // Guardar el hash es lo correcto; nunca almacenamos la contraseña en texto plano.
  const nextAccounts = [
    ...accounts,
    createHashedAccount(normalized, password),
  ];

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
