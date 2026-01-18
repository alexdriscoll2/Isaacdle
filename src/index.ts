import { fetchItembyId } from "./ItemSearcher";

let item = fetchItembyId(2); // Math.floor(Math.random() * 732) + 1

console.log(item.getId());

console.log(item.name);
