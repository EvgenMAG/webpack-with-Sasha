import css from "./css/styles.css";

class User {
  constructor(name) {
  this._name = name
}
  get name() {
   return this._name
 }
}
const mango = new User('MANGO')
console.log(mango.name);