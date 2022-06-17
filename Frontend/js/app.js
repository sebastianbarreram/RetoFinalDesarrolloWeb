//Definición de variables
const urlLista = "http://localhost:8080/lista/";
const urlTarea = "http://localhost:8080/tarea/";
const contenedor = document.querySelector("#contenedor");
const btnCrearLista = document.getElementById("btnCrearLista");
let resultados = "";
let opcion = ""

const formLista = document.querySelector("form");

//funcion para mostrar los resultados
const getAll = async () => {
    try {
        let res = await axios.get(urlLista),
            datos = await res.data;
        opcion = ""
        // console.log(datos)
        datos.forEach((lista) => {
            // console.log(lista)
            resultados += `<div class="contenedorLista"><h3 >${lista.nombreLista}
        <button class="btnBorrarLista btn btn-danger" id="${lista.id}">Eliminar</button></h3>
                <div class="input-group mb-3">
          <input type="text" id="nombreListaInput" class="form-control" placeholder="¿Qué piensas hacer?" required>
          <button class="btn btn-outline-secondary btnCrearTarea" type="button" id="${lista.id}">Nueva tarea</button>
        </div>
        <table id="${lista.id}" class="tabla${lista.id} table mt-2" >
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
            <th>${tarea.idTarea}</th>`
                if (tarea.completada) {
                    resultados += `<th>
                    <input class="form-check-input me-1" type="checkbox" checked/>
                    <label class="form-check-label">${tarea.descripcionTarea}</label>
                  </th>`
                }
                else {
                    resultados += `<th>
                    <input class="form-check-input me-1" type="checkbox"/>
                    <label class="form-check-label">${tarea.descripcionTarea}</label>
                  </th>`
                }
                resultados += `
            <th class="text-center">
              <button class="btnEditar btn btn-primary" id="${tarea.idTarea}" name="${tarea.descripcionTarea}">Editar</button>
              <button class="btnBorrarTarea btn btn-danger" id="${tarea.idTarea}">Eliminar</button>
            </th>
          </tr>`;
            });
            resultados += `</tbody></table></div><br><br>`;
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
    let checkboxes = document.querySelectorAll("input:checked")

    checkboxes.forEach(element => {
        // console.log(element.nextSibling.nextSibling)
        element.nextSibling.nextSibling.classList.add("text-decoration-line-through", 'text-muted')
        element.parentNode.nextSibling.nextSibling.childNodes[1].disabled = true
    })
};

//Procedimiento Mostrar
document.addEventListener("DOMContentLoaded", getAll);

btnCrearLista.addEventListener("click", async (e) => {
    const nombreLista = document.getElementById("nombreListaInput");
    if (nombreLista.value !== "") {
        // console.log(typeof(nombreLista.value))
        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    nombreLista: nombreLista.value.toUpperCase(),
                }),
            },
                res = await axios(urlLista, options),
                json = await res.data;
            location.reload();
        } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            $form.insertAdjacentHTML(
                "afterend",
                `<p><b>Error ${err.status}: ${message}</b></p>`
            );
        }
    }
});

document.addEventListener("click", async (e) => {
    if (e.target.matches(".btnBorrarLista")) {
        // console.log("click")
        // console.log(e.target.id)
        try {
            let options = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                },
            },
                res = await axios(urlLista + e.target.id, options),
                json = await res.data;

            location.reload();
        } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            alert(`Error ${err.status}: ${message}`);
        }
    }

    if (e.target.matches(".btnBorrarTarea")) {
        // console.log("click");
        try {
            let options = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=utf-8",
                },
            },
                res = await axios(urlTarea + e.target.id, options),
                json = await res.data;

            location.reload();
        } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            alert(`Error ${err.status}: ${message}`);
        }
    }
    if (e.target.matches(".btnCrearTarea")) {
        // console.log("click crear tarea")
        // console.log(e.target.id)
        // console.log(e.target.previousSibling.previousSibling.value)
        if (e.target.previousSibling.previousSibling.value !== "" && opcion !== "editar") {
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify({
                        descripcionTarea: e.target.previousSibling.previousSibling.value,
                        completada: false,
                        idLista: {
                            id: e.target.id
                        }
                    })
                },
                    res = await axios(urlTarea, options),
                    json = await res.data;
                location.reload();
            } catch (err) {
                let message = err.statusText || "Ocurrió un error";
                alert(`Error ${err.status}: ${message}`);
            }
        }
        if (e.target.previousSibling.previousSibling.value !== "" && opcion == "editar") {
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify({
                        descripcionTarea: e.target.previousSibling.previousSibling.value,
                        completada: false,
                        idLista: {
                            id: e.target.id
                        },
                        idTarea: e.target.dataset.name
                    })
                },
                    res = await axios(urlTarea, options),
                    json = await res.data;

                location.reload();
            } catch (err) {
                let message = err.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
            }
        }

    }
    if (e.target.matches(".form-check-input")) {
        // console.log(e.target)
        // console.log(e.target.nextSibling.nextSibling)
        // console.log(e.target.parentNode.nextSibling.nextSibling.childNodes[1])
        // console.log(e.target.parentNode.nextSibling.nextSibling.childNodes[1].name)
        // console.log(e.target.parentNode.nextSibling.nextSibling.childNodes[1].id)
        // console.log(e.target.parentNode.parentNode.parentNode.parentNode.id)
        
        if (e.target.checked) {
            e.target.nextSibling.nextSibling.classList.add("text-decoration-line-through", 'text-muted')
            e.target.parentNode.nextSibling.nextSibling.childNodes[1].disabled = true

            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify({
                        descripcionTarea: e.target.parentNode.nextSibling.nextSibling.childNodes[1].name,
                        completada: true,
                        idLista: {
                            id: e.target.parentNode.parentNode.parentNode.parentNode.id
                        },
                        idTarea: e.target.parentNode.nextSibling.nextSibling.childNodes[1].id
                    })
                },
                    res = await axios(urlTarea, options),
                    json = await res.data;

            } catch (err) {
                let message = err.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
            }
            
        }
        else {
            e.target.nextSibling.nextSibling.classList.remove("text-decoration-line-through", 'text-muted')
            e.target.parentNode.nextSibling.nextSibling.childNodes[1].disabled = false
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify({
                        descripcionTarea: e.target.parentNode.nextSibling.nextSibling.childNodes[1].name,
                        completada: false,
                        idLista: {
                            id: e.target.parentNode.parentNode.parentNode.parentNode.id
                        },
                        idTarea: e.target.parentNode.nextSibling.nextSibling.childNodes[1].id
                    })
                },
                    res = await axios(urlTarea, options),
                    json = await res.data;

            } catch (err) {
                let message = err.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
            }
        }
    }
    if (e.target.matches(".btnEditar")) {
        // console.log(e.target.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[1])
        // console.log(e.target.parentNode.previousSibling.previousSibling.childNodes[3].innerHTML)
        var inputTarea = e.target.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[1]
        var tareaEditar = e.target.name
        // console.log(inputTarea)
        // console.log(tareaEditar)
        // console.log(e.target.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes)
        var botoninputTarea = e.target.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[3]

        inputTarea.value = tareaEditar
        botoninputTarea.innerHTML = "Editar"
        opcion = "editar"
        botoninputTarea.dataset.name = e.target.id
        // console.log(opcion)
    }
});
