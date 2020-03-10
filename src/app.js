import { http } from "./http";
import { ui } from "./ui";

//get post om DOM load
document.addEventListener("DOMcontentloaded", getPosts);

//listen for add posts
document.querySelector("DOMcontentloaded", submitPost)

//arrow functions does not work for asnyc methods
function getPosts(){
    
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
    
}


//Add posts
getPosts();

function submitPost(){
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;

    
}

