// Necesitarías importar crypto-js para esto
import CryptoJS from 'crypto-js';

export function generateGravatarUrl(email: string) {
  const trimmedEmail = email.trim().toLowerCase();
  const hashedEmail = CryptoJS.SHA256(trimmedEmail).toString(CryptoJS.enc.Hex);
  return `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon`;
}
