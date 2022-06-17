//Definición de variables
const url = 'http://localhost:8080/lista/'
const contenedor = document.querySelector('#contenedor')
let resultados = ''

//funcion para mostrar los resultados
const mostrar = (datos) => {
    // console.log(datos)
    datos.forEach(lista => {
        // console.log(lista)
        resultados += `<h3>${lista.nombreLista}
        <button class="btnBorrar btn btn-danger">Eliminar</button></h3>
        <table id="${lista.id}" class="tabla${lista.id}" >
        <thead>
          <tr class="text-center">
            <th>ID</th>
            <th>Tarea</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>`
        lista.tareaModel.forEach(tarea => {
            // console.log(tarea)
            // ${tarea.completada}
            resultados += `
            <tr>
            <th>${tarea.idTarea}</th>
            <th>
              <input class="form-check-input me-1" type="checkbox"/>
              <label class="form-check-label">${tarea.descripcionTarea}</label>
            </th>
            <th>
              <button class="btnEditar btn btn-primary" id="${tarea.idTarea}">Editar</button>
              <button class="btnBorrar btn btn-danger">Eliminar</button>
            </th>
          </tr>`
        })
        resultados += `</tbody></table>`
        // console.log(contenedor)
        // console.log(resultados)
        contenedor.innerHTML=resultados
    })

    //contenedor.innerHTML = resultados
    // console.log(resultados)


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

// console.log(json[0]);
// console.log(json.length)
// console.log(json[0].tareaModel.length)
mostrar(json)

// const checkInput = document.getElementById("checkbox")
// const texto = document.getElementById("checkbox2")
// const checkInput2 = document.getElementById("checkbox3")
// const texto2 = document.getElementById("checkbox4")
// const botonEditar = document.getElementById("9");
// const botonEditar2= document.getElementById("10")
// checkInput.addEventListener("click", subrayar);
// checkInput2.addEventListener("click", subrayar);
// checkInput.checked = true
// checkInput2.checked = true


// function subrayar() {
//     //console.log("check")
//     let checkboxes = document.querySelectorAll("input:checked")

//     console.log(checkInput.checked)
//     console.log(checkboxes)

//     checkboxes.forEach(element => {
//         console.log(element.parentNode)
//     });
    
//     if (checkInput.checked) {
//         //console.log("si esta check")
//         texto.classList.add("text-decoration-line-through",'text-muted')
//         botonEditar.disabled=true
//     }
//     else{
//         texto.classList.remove("text-decoration-line-through","text-muted")
//         botonEditar.disabled=false
//     }
//     if (checkInput2.checked) {
//         // console.log("si esta check")
//         texto2.classList.add("text-decoration-line-through",'text-muted')
//         botonEditar2.disabled=true
//     }
//     else{
//         texto2.classList.remove("text-decoration-line-through","text-muted")
//         botonEditar2.disabled=false
//     }

// }

// if (checkInput.checked) {
//     //console.log("si esta check")
//     texto.classList.add("text-decoration-line-through",'text-muted')
//     botonEditar.disabled=true
// }

// if (checkInput2.checked) {
//     // console.log("si esta check")
//     texto2.classList.add("text-decoration-line-through",'text-muted')
//     botonEditar2.disabled=true
// }

// let checkboxes = document.querySelectorAll("input:checked")


// document.addEventListener("click", subrayar)