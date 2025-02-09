import { auth, getPost1, onGetPosts, updatePost } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import './registrar.js'
import './ingresar.js'
import './salir.js'
import './loginCheck.js'
import './postList.js'
import { loginCheck } from "./loginCheck.js";
import { setupPosts } from "./postList.js";
import { savePost, getPost, deletePost } from "./firebase.js";

onAuthStateChanged(auth, async(user)=>{
    const taskForm = document.getElementById("task-form");
    let editStatus = false;
    let id = '';
    // Si hay algún listener previo, lo removemos
    if (taskForm.listener) {
        taskForm.removeEventListener("submit", taskForm.listener);
    }

    if (user) {
        loginCheck(user);
        const correo = user.email;

        // Definimos el nuevo listener y lo asociamos al form
        taskForm.listener = (e) => {
            e.preventDefault();
            const title = taskForm["task-title"].value;
            const description = taskForm["task-description"].value;

            if(!editStatus){
                savePost(title, description, correo);
            }else{
                updatePost(id,{title,description});
                editStatus = false;
                document.getElementById('titulo').innerHTML = "Agregar Post"
            }
            
            taskForm.reset();
        };

        // Añadimos el listener actualizado
        taskForm.addEventListener("submit", taskForm.listener);
        try{
            const querySnapshot = await getPost();
            const tasksContainer = document.getElementById("tasks-container");
    
            onGetPosts((querySnapshot) => {
                let html = '';
                querySnapshot.forEach(doc => {
                    const post = doc.data();
                    if(post.userMail == correo){
                        html += `
                            <li class="list-group-item list-group-item-action mt-2">
                                <h5>${post.title}</h5>
                                <p>${post.description}</p>
                                <div>
                                    <button class="btn btn-primary btn-delete" data-id="${doc.id}">Borrar</button>
                                    <button class="btn btn-secondary btn-edit" data-id="${doc.id}">Editar</button>
                                </div>
                        `;
                    }
                })
                tasksContainer.innerHTML = html

                const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');
                btnsDelete.forEach(btn =>{
                    btn.addEventListener('click', (event) =>{
                        deletePost(event.target.dataset.id)
                    })
                })

                const btnsEdit = tasksContainer.querySelectorAll('.btn-edit');
                btnsEdit.forEach(btn =>{
                    btn.addEventListener('click', async (event) =>{
                        const doc = await getPost1(event.target.dataset.id);
                        const post = doc.data();
                        taskForm['task-title'].value = post.title;
                        taskForm['task-description'].value = post.description;

                        editStatus = true;
                        id = event.target.dataset.id;
                        taskForm['btn-task-form'].innerText = 'Actualizar'
                        document.getElementById('titulo').innerHTML = "Actualizar Post"
                    })
                })
            })
        }catch(error){
            console.log(error);
        }
    }else{
        //const mensaje = "";
        //setupPosts(mensaje);
        loginCheck(user);
        const tasksContainer = document.getElementById("tasks-container");
        tasksContainer.innerHTML = '<h3>Inicia sesión para ver las publicaciones</h3>'
    }
});

