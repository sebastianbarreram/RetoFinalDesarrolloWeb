//Definición de variables
const url = 'http://localhost:8080/lista/'
const contenedor = document.getElementById("lista")
let resultados = ''

//funcion para mostrar los resultados
const mostrar = (datos) => {
    console.log(datos)
    datos.forEach(lista => {
        resultados += `<h3 class="crud-title">${lista.nombreLista}</h3>`
        lista.tareaModel.forEach(tarea => {
            resultados += `
            <li class="list-group-item d-flex justify-content-between align-items-center"><span>${tarea.idTarea}</span></li>
            <li class="list-group-item d-flex justify-content-between align-items-center"><span>${tarea.descripcionTarea}</span></li>
            <li class="list-group-item d-flex justify-content-between align-items-center"><span>${tarea.completada}</span></li>
            `
        }

        )

    })

    contenedor.innerHTML = resultados



}

// const mostrar = (datos) => {
//     console.log(datos)
//     datos.forEach(lista => {
//         resultados+=
//         console.log(lista.nombreLista)
//         lista.tareaModel.forEach(tarea => {
//             console.log(tarea.idTarea)
//         }

//         )

//     })

// }

//Procedimiento Mostrar
let res = await axios.get(url),
    json = await res.data;

console.log(json[0]);
console.log(json.length)
console.log(json[0].tareaModel.length)
mostrar(json)

