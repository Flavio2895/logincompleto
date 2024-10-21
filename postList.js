const postList = document.querySelector(".posts");

export const setupPosts = (data) => {
    if(data.length){
        postList.innerHTML = data;
    }else{
        postList.innerHTML = '<h4 class="text-blue">Inicia sesión para ver el contenido</h4>'
    }
}