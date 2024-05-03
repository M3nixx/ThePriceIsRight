"use strict"
/** @type {HTMLLIElement[]} */ //each destructured element is recognized as an HTMLLIElement
const [
  loremListElem, repellatListElem, natusListElem, recusandaeListElem, undeListElem
] = [...document.querySelectorAll("body > main > ol > li")]

export function setButtonActions() {
  /** @type {HTMLButtonElement[]} */
  const [
    loremButton, repellatButton, natusButton, recusandaeButton
  ] = [...document.querySelectorAll("body > aside > button")]
  loremButton.onclick = lorem
  repellatButton.onclick = repellat
  natusButton.onclick = natus
  recusandaeButton.onclick = recusandae
}

export function lorem(event) {
  alert("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi provident, totam asperiores vero minus ab corrupti optio aperiam? Debitis hic sint eum non reprehenderit aliquid optio! Aliquid recusandae odit deleniti?");
  console.log("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi provident, totam asperiores vero minus ab corrupti optio aperiam? Debitis hic sint eum non reprehenderit aliquid optio! Aliquid recusandae odit deleniti?");
}

export function repellat(event) {
  repellatListElem.style.color = "burlywood";
  console.log("repellat");
}

export function natus(event) {
  natusListElem.innerHTML += "mehr";
  console.log("natus");
}

export function myRandomness(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let recusandaeCounter = 0;
export function recusandae(event) {
  recusandaeListElem.innerHTML = myRandomness(5,27) + ' ist ein Zufallswert zwischen 5 und 27, generiert durch Betätigung des "Recusandae"-Knopfes und unter Nutzung der eigenen "myRandomness"-Funktion. Der Knopf wurde bereits " + ++recusandaeCounter + "-mal betätigt.'
}
setButtonActions();