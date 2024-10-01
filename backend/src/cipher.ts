const SHIFT = 3; // Décalage de 3 pour le chiffre de César

// Fonction de chiffrement
export function caesarEncrypt(text: string): string {
    return text
        .split("")
        .map((char) => shiftChar(char, SHIFT))
        .join("");
}

// Fonction de déchiffrement
export function caesarDecrypt(text: string): string {
    return text
        .split("")
        .map((char) => shiftChar(char, -SHIFT))
        .join("");
}

// Fonction pour décaler un caractère
function shiftChar(char: string, shift: number): string {
    const code = char.charCodeAt(0);

    // Majuscules
    if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
    }
    // Minuscules
    if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
    }
    // Retourner le caractère tel quel s'il n'est pas une lettre
    return char;
}
