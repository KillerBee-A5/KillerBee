import { caesarEncrypt, caesarDecrypt } from "./caesarCipher";

/**
 * Chiffre tous les champs de type chaîne de caractères dans un objet.
 * @param obj - L'objet à chiffrer.
 * @returns Un nouvel objet avec les champs chiffrés.
 */
export const encryptData = <T extends Record<string, any>>(obj: T): T => {
    const encryptedObj: any = { ...obj };
    for (const key in encryptedObj) {
        if (typeof encryptedObj[key] === "string") {
            encryptedObj[key] = caesarEncrypt(encryptedObj[key]);
        }
    }
    return encryptedObj;
};

/**
 * Déchiffre tous les champs de type chaîne de caractères dans un objet.
 * @param obj - L'objet à déchiffrer.
 * @returns Un nouvel objet avec les champs déchiffrés.
 */
export const decryptData = <T extends Record<string, any>>(obj: T): T => {
    const decryptedObj: any = { ...obj };
    for (const key in decryptedObj) {
        if (typeof decryptedObj[key] === "string") {
            decryptedObj[key] = caesarDecrypt(decryptedObj[key]);
        }
    }
    return decryptedObj;
};
