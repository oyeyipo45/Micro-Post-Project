import { http } from "./http";
import { ui } from "./ui";

//get post om dom load
document.addEventListener("DOMcontentloaded", getPosts);

//arrow functions does not work for asnyc methods
function getPosts(){
    
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
    
}

getPosts();



