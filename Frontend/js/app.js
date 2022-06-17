//Definición de variables
const urlLista = "http://localhost:8080/lista/";
const urlTarea = "http://localhost:8080/tarea/";
const contenedor = document.querySelector("#contenedor");
const btnCrearLista = document.getElementById("btnCrearLista");
let resultados = "";
let opcion = ""

const formLista = document.querySelector("form");

//Funcion para mostrar elementos de la base de datos
const getAll = async () => {
    try {
        let res = await axios.get(urlLista),
            datos = await res.data;
        opcion = ""
        datos.forEach((lista) => {
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
        element.nextSibling.nextSibling.classList.add("text-decoration-line-through", 'text-muted')
        element.parentNode.nextSibling.nextSibling.childNodes[1].disabled = true
    })
};

//Procedimiento obtener elementos de la base de datos
document.addEventListener("DOMContentLoaded", getAll);

//Crea una nueva lista al hacer click en el boton respectivo
btnCrearLista.addEventListener("click", async (e) => {
    const nombreLista = document.getElementById("nombreListaInput");
    if (nombreLista.value !== "") {
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

//Evento para retener donde hizo click el usuario
document.addEventListener("click", async (e) => {
    //Click sobre boton elemininar lista
    if (e.target.matches(".btnBorrarLista")) {
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

    //Click sobre el boton eliminar tarea
    if (e.target.matches(".btnBorrarTarea")) {
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

    //Click sobre el boton crear tarea
    if (e.target.matches(".btnCrearTarea")) {
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

        //Click sobre el boton editar tarea
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

    //Click sobre el checkbox
    if (e.target.matches(".form-check-input")) {
        //Marca la tarea como completada. Se deshabilita la opcion crear de la tarea
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
        //Marca la tarea como no completada. Se habilita la opcion crear de la tarea
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

    //Click sobre el boton editar. Lleva los datos de la tarea al input de edicion
    if (e.target.matches(".btnEditar")) {
        var inputTarea = e.target.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[1]
        var tareaEditar = e.target.name
        var botoninputTarea = e.target.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[3]

        inputTarea.value = tareaEditar
        botoninputTarea.innerHTML = "Editar"
        opcion = "editar"
        botoninputTarea.dataset.name = e.target.id
    }
});
