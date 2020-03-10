import { http } from "./http";
import { ui } from "./ui";

//Get post om DOM load
document.addEventListener("DOMContentLoaded", getPosts);

//listen for delete
document.querySelector('.post-submit').addEventListener("click", submitPost);

//listen for delete
document.querySelector('#posts').addEventListener("click", deletePost);

function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}


//Add posts
function submitPost(){
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;

    const data = {
        //since the key and the title are thesame in ES6 you can just write the value like that
        title: title,
        body: body
    }

    //Create post, making a http post request
    http.post("http://localhost:3000/posts", data)
    .then(data => {
        ui.showAlert('Post added', "alert alert-success");
        ui.clearFields();
        getPosts();
    })
    .catch(err => console.log(err));
}


//Delete Post
function deletePost(e){
    e.preventDefault();
    //checking is the parent element contains a delete class so the delete effect can take place on the click
    if(e.target.parentElement.classList.contains("delete")){
        //creating an Id to differentiate which post you want to delete using their id in the UI
        const id = e.target.parentElement.dataset.id;
        //asking for confirmation of delete
        if(confirm("Please confirm delete?")){
            http
            //deleting the data from the db using the ${id} as declared above
            .delete(`http://localhost:3000/posts/${id}`)
            //handling the promise result
            .then(data => {
                //the alert-success class makes it automatically a green alert
                ui.showAlert("Posts Removed", "alert alert-success")
                //after deleting the get ppost gets the remaining posts in the db to the ui
                getPosts();
            })
            .catch(err => console.log(err));
        }
    }
}