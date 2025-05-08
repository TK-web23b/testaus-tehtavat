/**
 * Laskee D'Hondtin vertausluvut yhdelle listalle
 * @param {Object[]} ehdokkaat - Taulukko ehdokasobjekteja, joissa numero, nimi ja äänimäärä
 * @returns {Object[]} - Sama taulukko, mutta lisättynä vertausluvuilla ja arvottu-kentällä
 */
function laskeVertausluvut(ehdokkaat) {
  // Järjestetään ehdokkaat äänimäärän mukaan laskevasti
  const jarjestetyt = [...ehdokkaat].sort((a, b) => b.aanet - a.aanet);

  // Ryhmitellään ehdokkaat äänimäärän mukaan
  const ryhmat = jarjestetyt.reduce((acc, ehdokas) => {
    acc[ehdokas.aanet] = acc[ehdokas.aanet] || [];
    acc[ehdokas.aanet].push(ehdokas);
    return acc;
  }, {});

  // Arvotaan saman äänimäärän saaneiden järjestys
  const arvottuJarjestys = Object.values(ryhmat).flatMap(ryhma => {
    if (ryhma.length > 1) {
      // Shuffle the group using Fisher-Yates algorithm for better randomness
      for (let i = ryhma.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ryhma[i], ryhma[j]] = [ryhma[j], ryhma[i]];
      }
      return ryhma.map(ehdokas => ({ ...ehdokas, arvottu: true }));
    }
    return ryhma;
  });

  // Laske äänien summa
  const aanetYhteensa = jarjestetyt.reduce((summa, ehdokas) => summa + ehdokas.aanet, 0);

  // Lasketaan vertausluvut: äänet / sija listassa
  return arvottuJarjestys.map((ehdokas, index) => ({
    ...ehdokas,
    vertausluku: aanetYhteensa / (index + 1)
  }));
}

export default laskeVertausluvut;
export { laskeVertausluvut };
