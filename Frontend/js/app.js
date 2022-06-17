//Definición de variables
const urlLista = "http://localhost:8080/lista/";
const urlTarea = "http://localhost:8080/tarea/"
const contenedor = document.querySelector("#contenedor");
const btnCrearLista = document.getElementById("btnCrearLista")
let resultados = "";
var opcion = ''

const formLista = document.querySelector('form')

btnCrearLista.addEventListener('click', () => {
    nombreLista.value = ''
    opcion = 'crearLista'
})

//funcion para mostrar los resultados
const getAll = async () => {
    try {
        let res = await axios.get(urlLista),
            datos = await res.data;
        // console.log(datos)
        datos.forEach((lista) => {
            // console.log(lista)
            resultados += `<h3 >${lista.nombreLista}
        <button class="btnBorrarLista btn btn-danger" id="${lista.id}">Eliminar</button></h3>
        <table id="${lista.id}" class="tabla${lista.id}" >
        <thead>
          <tr class="text-center">
            <th>ID</th>
            <th>Tarea</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>`;
            lista.tareaModel.forEach((tarea) => {
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
              <button class="btnBorrarTarea btn btn-danger" id="${tarea.idTarea}">Eliminar</button>
            </th>
          </tr>`;
            });
            resultados += `</tbody></table>`;
            // console.log(contenedor)
            // console.log(resultados)
            contenedor.innerHTML = resultados;
        });
    } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        contenedor.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}: ${message}</b></p>`
        );
    }
};

//Procedimiento Mostrar
document.addEventListener("DOMContentLoaded", getAll);

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


btnCrearLista.addEventListener("click", async e => {
    const nombreLista = document.getElementById("nombreListaInput")
    if (nombreLista.value!=="") {
        try {
            let options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    nombreLista: nombreLista.value,
                })
            },
                res = await axios(urlLista, options),
                json = await res.data;
    
            location.reload();
        } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
        }
    }
});

document.addEventListener("click", async e =>{
    if (e.target.matches(".btnBorrarLista")) {
        // console.log("click")
        // console.log(e.target.id)
        try {
            let options = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                }
            },
                res = await axios(urlLista +e.target.id, options),
                json = await res.data;

            location.reload();
        } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            alert(`Error ${err.status}: ${message}`);
        }
    }

    if(e.target.matches(".btnBorrarTarea")){
        console.log("click")
        try {
            let options = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                }
            },
                res = await axios(urlTarea +e.target.id, options),
                json = await res.data;

            location.reload();
        } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            alert(`Error ${err.status}: ${message}`);
        }
    }
})