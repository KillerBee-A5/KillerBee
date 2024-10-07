const defaultShift = import.meta.env.VITE_CAESAR_SHIFT ?? 3;

export function caesarEncrypt(
  text: string,
  shift: number = defaultShift,
): string {
  // Normaliser le décalage pour éviter des valeurs excessives
  shift = shift % 0x10ffff; // 0x10FFFF est le point de code Unicode maximal

  let encryptedText = "";
  let i = 0;

  while (i < text.length) {
    const codePoint = text.codePointAt(i);
    if (codePoint === undefined) {
      // Si le point de code est indéfini, ajouter le caractère tel quel
      encryptedText += text[i];
      i++;
      continue;
    }

    // Appliquer le décalage
    let shiftedCodePoint = codePoint + shift;

    // Assurer que le point de code reste dans la plage valide
    if (shiftedCodePoint > 0x10ffff) {
      shiftedCodePoint = shiftedCodePoint - 0x10ffff - 1;
    } else if (shiftedCodePoint < 0) {
      shiftedCodePoint = 0x10ffff + shiftedCodePoint + 1;
    }

    encryptedText += String.fromCodePoint(shiftedCodePoint);

    // Avancer l'index en fonction de la taille du point de code
    i += codePoint > 0xffff ? 2 : 1;
  }

  return encryptedText;
}

export function caesarDecrypt(
  text: string,
  shift: number = defaultShift,
): string {
  // Pour déchiffrer, inverser le décalage
  return caesarEncrypt(text, -shift);
}
