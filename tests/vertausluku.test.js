import laskeVertausluvut from "../vertausluku.js";
import ehdokasRekisteri from "../ehdokasRekisteri.js";

import { afterEach, beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";

describe("laskeVertausluvut", () => {
  beforeEach(() => {
    const lista = [
      { numero: 101, nimi: "Maija Meikäläinen", aanet: 1 },
      { numero: 102, nimi: "Kalle Korhonen", aanet: 4 },
      { numero: 103, nimi: "Sari Virtanen", aanet: 2 },
      { numero: 104, nimi: "Jukka Jokinen", aanet: 5 },
      { numero: 105, nimi: "Pekka Peloton", aanet: 2 }
    ];

    mock.method(ehdokasRekisteri, 'haeLista', () => {
      return lista;
    });
  });
  afterEach(() => {
    mock.reset();
  });

  it('listan eniten ääniä saaneen ehdokkaan vertausluku on listan äänten summa', () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[0].vertausluku, 14);
  });
  it('listan toiseksi eniten ääniä saaneen ehdokkaan vertausluku on puolet listan äänien summasta', () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[1].vertausluku, 7);
  });
  it('saman äänimäärän saaneet ehdokkaat on merkitty arvottu: true', () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    const samanAanet = tulos.filter(e => e.aanet === 2);
    assert.ok(samanAanet.every(e => e.arvottu === true));
  });
  it('saman äänimäärän saaneiden järjestys on satunnainen', () => {
    const tulos1 = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    const tulos2 = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    const samanAanet1 = tulos1.filter(e => e.aanet === 2).map(e => e.numero);
    const samanAanet2 = tulos2.filter(e => e.aanet === 2).map(e => e.numero);
    assert.notDeepEqual(samanAanet1, samanAanet2);
  });
});