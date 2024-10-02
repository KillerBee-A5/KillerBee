export function caesarEncrypt(text: string, shift: number): string {
    // Assurer que le décalage est compris entre 0 et 25
    shift = shift % 26;
    const lowerCaseText = text.toLowerCase();
    let encryptedText = "";

    for (const element of lowerCaseText) {
        const char = element;
        if (char >= "a" && char <= "z") {
            // Calculer le code ASCII du caractère décalé
            let code = char.charCodeAt(0) + shift;
            if (code > "z".charCodeAt(0)) {
                code = code - 26;
            }
            encryptedText += String.fromCharCode(code);
        } else {
            // Ne pas chiffrer les caractères non alphabétiques
            encryptedText += char;
        }
    }
    return encryptedText;
}

export function caesarDecrypt(text: string, shift: number): string {
    // Décalage inverse pour déchiffrer
    return caesarEncrypt(text, 26 - (shift % 26));
}
