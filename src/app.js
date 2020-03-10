import { http } from "./http";
import { ui } from "./ui";

//Get post om DOM load
document.addEventListener("DOMContentLoaded", getPosts);

//listen for delete
document.querySelector('.post-submit').addEventListener("click", submitPost);

//listen for delete
document.querySelector('#posts').addEventListener("click", deletePost);

//listen for edit state
document.querySelector("#posts").addEventListener("click", enableEdit);
// i also used event delegation to check for some logic when running the function

//Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);


//get posts
function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}


//Add posts
function submitPost(){
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;
    const id = document.querySelector("#id").value;

    //putting the values into the data object
    const data = {
        //since the key and the title are thesame in ES6 you can just write the value like that
        title: title,
        body: body
    }


    //stopping adding of empty post OR Validation Input
    if(title === '' || body === ''){
        ui.showAlert("Please fill in all fields",' alert alert-danger');
    } else {
        //check for hidden id
        if(id === ''){
            //Create Post
            //Create post, making a http post request
            http.post("http://localhost:3000/posts", data)
            .then(data => {
                ui.showAlert('Post added', "alert alert-success");
                ui.clearFields();
                getPosts();
            })
            .catch(err => console.log(err));
        } else {
            //Update the Post
            http.put(`http://localhost:3000/posts/${id}`, data)
            .then(data => {
                ui.showAlert('Post updated', "alert alert-success");
                ui.changeFormState('add');
                getPosts();
            })
            .catch(err => console.log(err));

        }
        
    
        
    }

    
}


//Delete Post
function deletePost(e){
    
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

    e.preventDefault();
}

//enable Edit State
function enableEdit(e){

    if(e.target.parentElement.classList.contains("edit")){  
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
        
        const data = {
            id,
            title,
            body
        }

        //Fill form with current post
        ui.fillForm(data);
    
    }

    e.preventDefault();
}

//Cancel Edit State
function cancelEdit(e){
    if(e.target.classList.contains("post-cancel")){
        ui.changeFormState('add');
    }

    e.preventDefault();
}