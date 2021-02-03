
document.addEventListener('DOMContentLoaded', () => {
    fetchData(getRandom(1, 898));
})

const fetchData = async (id) => {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        console.log(data)
        pintarCard(modelData(data, id))
    }catch(error){
        console.log(error)
    }
}



function pintarCard(poke){
    console.log(poke)
    
    const flex = document.querySelector('.flex')
    const template = document.getElementById('template-card').content
    const clone = template.cloneNode(true) 
    const fragment = document.createDocumentFragment()
    
    clone.querySelector('.card-body-img').setAttribute('src', poke.img)
    clone.querySelector('.card-body-title').innerHTML = `${poke.name} <span>#${poke.order}</span>`
    clone.querySelector('.card-body-text').textContent = poke.type
    clone.querySelector('#hp').textContent = poke.stats.hp
    clone.querySelector('#attack').textContent = poke.stats.attack
    clone.querySelector('#defense').textContent = poke.stats.defense
    clone.querySelector('#speed').textContent = poke.stats.speed
    clone.querySelector('#spatk').textContent = poke.stats.spatk
    clone.querySelector('#spdef').textContent = poke.stats.spdef

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}

function modelData(data, id){
    const sprites = [
        data.sprites.front_default,
        data.sprites.front_female,
        data.sprites.front_shiny,
        data.sprites.front_shiny_female
    ]
    let img
    let name = capitalizeFirstLetter(data.name)
    let order = id
    const type = []
    const stats = {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        spatk: data.stats[3].base_stat,
        spdef: data.stats[4].base_stat,
    }

    //IMG
    if(getRandom(0, 2) === 1){
        img = sprites[getRandom(0, sprites.length-1)]
    }else{
        img = sprites[getRandom(0, 1)]
    }
    if(img === null)
        img = data.sprites.front_default

    //TYPE
    for (let i = 0; i <= data.types.length-1; i++) {
        type[i] = " " + capitalizeFirstLetter(data.types[i].type.name)
    }
    console.log(type)
    
    return {
        img,
        name,
        order,
        type,
        stats
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}