import { signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { auth } from "./firebase.js";

const logout = document.getElementById("logout");

logout.addEventListener("click", async(e)=>{
    e.preventDefault();
    try{
        await signOut(auth);
    }catch(error){
        console.log(error)
    }
})