
/**
 * Tarkistaa salasanan vaatimukset
 * @param {string} salasana - Salasana
 * @returns {boolean} - Palauttaa true, jos salasana täyttää vaatimukset, muuten false
 */

function tarkistaSalasana(salasana) {
  if (salasana.length < 10) return false;
  if (!/[A-Z]/.test(salasana)) return false; // Tarkistaa isot kirjaimet
  if (!/[a-z]/.test(salasana)) return false; // Tarkistaa pienet kirjaimet
  if (!/[0-9]/.test(salasana)) return false; // Tarkistaa numerot
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(salasana)) return false; // Tarkistaa erikoismerkit
  return true;
}

export default tarkistaSalasana;
