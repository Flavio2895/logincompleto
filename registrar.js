import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { auth } from "./firebase.js";
import { mostrarMensaje } from "./mostrarMensajes.js";

const registrarForm = document.getElementById("registrar-form");

registrarForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const email = registrarForm["registrar-email"].value;
    const password = registrarForm["registrar-password"].value;

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        const RegistrarModal = document.getElementById("RegistrarModal");
        const modal = bootstrap.Modal.getInstance(RegistrarModal);
        modal.hide();

        registrarForm.reset();
        mostrarMensaje("Bienvenido "+ userCredential.user.email);
    }catch(error){
        if(error.code === 'auth/invalid-email'){
            mostrarMensaje("Email inválido","error")
        }else if(error.code === 'auth/weak-password'){
            mostrarMensaje("Password muy corto","error")
        }else if(error.code ==='auth/email-already-in-use'){
            mostrarMensaje("Email en uso","error")
        }else if(error.code){
            mostrarMensaje("Algo salio mal","error")
        }
    }
})