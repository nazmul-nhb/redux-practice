import { Map } from "immutable";
import { produce } from "immer";

// Raw JS
// let book = { title: "Harry Potter" };

// function publish(book) {
//   return book.isPublished: true;
// }

// const pBook = publish(book);

// console.log(book);
// console.log(pBook);

// immutable.js
// let book = Map({ title: "Harry Potter" });

// function publish(book) {
//   return  book.set("isPublished", true);
// }

// const pBook = publish(book);

// console.log(book.get("title"));
// console.log(pBook.toJS());

// immer
let book = { title: "Harry Potter" };

function publish(book) {
    return produce(book, draftBook => {
        draftBook.isPublished = true;
    })
}
let pBook = publish(book);

console.log(book);
console.log(pBook);
