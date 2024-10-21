import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { auth } from "./firebase.js";
import { mostrarMensaje } from "./mostrarMensajes.js";

const ingresarForm = document.getElementById("ingresar-form");

ingresarForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const email = ingresarForm["ingresar-email"].value;
    const password = ingresarForm["ingresar-password"].value;

    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        const IngresarModal = document.getElementById("IngresarModal");
        const modal = bootstrap.Modal.getInstance(IngresarModal);
        modal.hide();

        ingresarForm.reset();
        mostrarMensaje("Bienvenido "+ userCredential.user.email);
    }catch(error){
        if(error.code === 'auth/wrong-password'){
            mostrarMensaje("Password equivocado","error")
        }else if(error.code === 'auth/user-not-found'){
            mostrarMensaje("No existe el usuario","error")
        }else if(error.code){
            mostrarMensaje("Algo salió mal","error")
        }
    }
})