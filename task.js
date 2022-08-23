
// Make a copy of objectA called objectB
// Except objectB's "otherProperty" value should be 20
// objectA must not change
// Print both objects

const objectA = { id: 1, otherProperty: 15 }
const objectB = Object.assign({}, objectA, { otherProperty: 20 })
const objectC = { ...objectA, otherProperty: 20 }

console.log(objectA)
console.log(objectB)
console.log(objectC)