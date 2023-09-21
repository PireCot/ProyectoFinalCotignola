const apiUrl = 'https://thesimpsonsquoteapi.glitch.me/quotes?count=10'
const contenedor = document.getElementById('contenedorDePersonajes')


const traerPersonajesApi = async () =>{
    const personajes = await fetch(apiUrl).then((data)=>data.json()) //Aplico JSON y Fetch
    return personajes
}
const crearTarjetaPersonaje = (imagenDelPersonaje ,nombreDelPersonaje ,citaDelPersonaje) => {
    const tarjeta = document.createElement('div')
    tarjeta.setAttribute('id',nombreDelPersonaje)
    tarjeta.classList.add('tarjeta')
    tarjeta.innerHTML = `
    <img height=250 src=${imagenDelPersonaje}>
    <h2>${nombreDelPersonaje}</h2>
    <p>${citaDelPersonaje}</p>
    <button id="marcarComoFavorito-${nombreDelPersonaje}">Marcar como favorito ❤️</button>
    `
    contenedor.appendChild(tarjeta)
}

const crearListaDePersonajes = async () => {
    const personajes = await traerPersonajesApi()
    personajes.forEach((personaje)=>{
        crearTarjetaPersonaje(personaje.image, personaje.character, personaje.quote)
        const buttonMarcarComoFavorito = document.getElementById(`marcarComoFavorito-${personaje.character}`)
        buttonMarcarComoFavorito.addEventListener('click',()=>{
            marcarComoFavorito(buttonMarcarComoFavorito.getAttribute('id').split('-')[1])
        })
        const tarjeta = document.getElementById(personaje.character)
        gsap.fromTo(tarjeta,{opacity: 0, y:-20, duration: 1}, {opacity:1, y:0})

    })

}

const comprobarFavorito = () =>{
    const personajeFavorito = localStorage.getItem('personajeFavorito')
    if(personajeFavorito){
        document.getElementById('tituloPersonajeFavorito').innerText = `Mi personaje favorito: ${personajeFavorito}`
    }else{
        document.getElementById('tituloPersonajeFavorito').innerText = 'Todavia no seleccionaste ningun personaje como favorito  😪 '
    }
}



const marcarComoFavorito = (nombreDelPersonaje) =>{
    localStorage.setItem('personajeFavorito', nombreDelPersonaje)
    comprobarFavorito()
}


crearListaDePersonajes()
comprobarFavorito()


