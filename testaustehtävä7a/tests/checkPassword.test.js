import tarkistaSalasana from "../checkPassword.js";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("tarkistaSalasana", () => {
  it("palauttaa false, jos salasana on alle 10 merkkiä pitkä", () => {
    assert.strictEqual(tarkistaSalasana("Lyhyt1!"), false);
  });

  it("palauttaa false, jos salasanassa ei ole isoja kirjaimia", () => {
    assert.strictEqual(tarkistaSalasana("pienetkirjaimet1!"), false);
  });

  it("palauttaa false, jos salasanassa ei ole pieniä kirjaimia", () => {
    assert.strictEqual(tarkistaSalasana("ISOTKIRJAIMET1!"), false);
  });

  it("palauttaa false, jos salasanassa ei ole numeroita", () => {
    assert.strictEqual(tarkistaSalasana("EiNumeroita!"), false);
  });

  it("palauttaa false, jos salasanassa ei ole erikoismerkkejä", () => {
    assert.strictEqual(tarkistaSalasana("EiErikoismerkkejä123"), false);
  });

  it("palauttaa true, jos salasana täyttää kaikki vaatimukset", () => {
    assert.strictEqual(tarkistaSalasana("Kelpo1Salasana!"), true);
  });
});
