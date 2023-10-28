import { Persona, Heroe, Villano } from './Persona.js';

document.addEventListener('DOMContentLoaded', function () {
    const personajes = [];

    // JSON con los datos de los personajes (héroes y villanos)
    const cadenaJSON = '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis", "publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica", "publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Allen", "edad":30, "alterego":"Flash", "ciudad":"Central", "publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500, "asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750, "asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"Kyle", "edad":23, "enemigo":"Batman", "robos":25, "asesinatos":1}]';


    // Parsear la cadena JSON en un array de objetos
    const datos = JSON.parse(cadenaJSON);

    // Agregar los objetos al array "personajes"
    for (const dato of datos) {
        if ('alterego' in dato && 'ciudad' in dato) {
            // Es un héroe
            const heroe = new Heroe(dato.id, dato.nombre, dato.apellido, dato.edad, dato.alterego, dato.ciudad, dato.publicado);
            personajes.push(heroe);
        } else if ('enemigo' in dato && 'robos' in dato && 'asesinatos' in dato) {
            // Es un villano
            const villano = new Villano(dato.id, dato.nombre, dato.apellido, dato.edad, dato.enemigo, dato.robos, dato.asesinatos);
            personajes.push(villano);
        }
    }

    console.log(datos);

    function mostrarObjetos() {
        const cuerpoTablaPersonajes = document.getElementById('cuerpoTablaPersonajes');
        cuerpoTablaPersonajes.innerHTML = ''; // Limpia el cuerpo de la tabla antes de mostrar los personajes
    
        const filtro = document.getElementById('filtro').value; // Obtener el valor del filtro seleccionado
    
        personajes.forEach(function (personaje) {
            if (filtro === 'todos' || (filtro === 'heroe' && personaje instanceof Heroe) || (filtro === 'villano' && personaje instanceof Villano)) {
                const fila = document.createElement('tr');
    
                const idCelda = document.createElement('td');
                idCelda.textContent = personaje.id;
                fila.appendChild(idCelda);
    
                const nombreCelda = document.createElement('td');
                nombreCelda.textContent = personaje.nombre;
                fila.appendChild(nombreCelda);
    
                const apellidoCelda = document.createElement('td');
                apellidoCelda.textContent = personaje.apellido;
                fila.appendChild(apellidoCelda);
    
                const edadCelda = document.createElement('td');
                edadCelda.textContent = personaje.edad;
                fila.appendChild(edadCelda);
    
                if (personaje instanceof Heroe) {
                    const alterEgoCelda = document.createElement('td');
                    alterEgoCelda.textContent = personaje.alterEgo;
                    fila.appendChild(alterEgoCelda);
    
                    const ciudadCelda = document.createElement('td');
                    ciudadCelda.textContent = personaje.ciudad;
                    fila.appendChild(ciudadCelda);
    
                    const publicadoCelda = document.createElement('td');
                    publicadoCelda.textContent = personaje.publicado;
                    fila.appendChild(publicadoCelda);
    
                    // Agrega celdas vacías para atributos específicos de Villano
                    for (let i = 0; i < 4; i++) {
                        const celdaVacia = document.createElement('td');
                        fila.appendChild(celdaVacia);
                    }
                }
    
                if (personaje instanceof Villano) {
                    // Agrega celdas vacías para atributos específicos de Héroe
                    for (let i = 0; i < 3; i++) {
                        const celdaVacia = document.createElement('td');
                        fila.appendChild(celdaVacia);
                    }
    
                    const enemigoCelda = document.createElement('td');
                    enemigoCelda.textContent = personaje.enemigo;
                    fila.appendChild(enemigoCelda);
    
                    const robosCelda = document.createElement('td');
                    robosCelda.textContent = personaje.robos;
                    fila.appendChild(robosCelda);
    
                    const asesinatosCelda = document.createElement('td');
                    asesinatosCelda.textContent = personaje.asesinatos;
                    fila.appendChild(asesinatosCelda);
                }
    
                cuerpoTablaPersonajes.appendChild(fila);
            }
        });
    }
    mostrarObjetos();

    const filtroSelect = document.getElementById('filtro');
    filtroSelect.addEventListener('change', mostrarObjetos);

    // Función para mostrar u ocultar atributos según los checkboxes seleccionados
    function actualizarTabla() {
        const tablaPersonajes = document.getElementById('tablaPersonajes');
        const filas = tablaPersonajes.getElementsByTagName('tr');

        const mostrarID = document.getElementById('mostrarID').checked;
        const mostrarNombre = document.getElementById('mostrarNombre').checked;
        const mostrarApellido = document.getElementById('mostrarApellido').checked;
        const mostrarEdad = document.getElementById('mostrarEdad').checked;
        const mostrarAlterEgo = document.getElementById('mostrarAlterEgo').checked;
        const mostrarEnemigo = document.getElementById('mostrarEnemigo').checked;
        const mostrarCiudad = document.getElementById('mostrarCiudad').checked;
        const mostrarPublicado = document.getElementById('mostrarPublicado').checked;
        const mostrarRobos = document.getElementById('mostrarRobos').checked;
        const mostrarAsesinatos = document.getElementById('mostrarAsesinatos').checked;

        // Recorremos las filas (empezamos desde 1 para omitir la fila de encabezados)
        for (let i = 1; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');

            // Agregamos o eliminamos la clase CSS "mantener-espacio" según corresponda
            celdas[0].classList.toggle('mantener-espacio', !mostrarID);
            celdas[1].classList.toggle('mantener-espacio', !mostrarNombre);
            celdas[2].classList.toggle('mantener-espacio', !mostrarApellido);
            celdas[3].classList.toggle('mantener-espacio', !mostrarEdad);

            // Verifica si el personaje es un Héroe
            if (celdas[4]) {
                celdas[4].classList.toggle('mantener-espacio', !mostrarAlterEgo);
                celdas[5].classList.toggle('mantener-espacio', !mostrarCiudad);
                celdas[6].classList.toggle('mantener-espacio', !mostrarPublicado);
                celdas[7].classList.toggle('mantener-espacio', !mostrarEnemigo);
                celdas[8].classList.toggle('mantener-espacio', !mostrarRobos);
                celdas[9].classList.toggle('mantener-espacio', !mostrarAsesinatos);
            } else if (celdas[4]) { // Verifica si el personaje es un Villano
                celdas[4].classList.toggle('mantener-espacio', !mostrarEnemigo);
                celdas[5].classList.toggle('mantener-espacio', !mostrarRobos);
                celdas[6].classList.toggle('mantener-espacio', !mostrarAsesinatos);
                celdas[7].classList.toggle('mantener-espacio', !mostrarAlterEgo);
                celdas[8].classList.toggle('mantener-espacio', !mostrarCiudad);
                celdas[9].classList.toggle('mantener-espacio', !mostrarPublicado);
            }
        }
    }

    // Agregar event listeners a las casillas de verificación
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', actualizarTabla);
    });

    // Agrega un event listener para el botón de cálculo del promedio
    const calcularPromedioButton = document.getElementById('calcularPromedioButton');
    const promedioResultado = document.getElementById('promedioResultado');

    calcularPromedioButton.addEventListener('click', function () {
        // Calcula el promedio de la edad
        const edades = personajes.map(function (personaje) {
            return personaje.edad;
        });

        if (edades.length > 0) {
            const sumaEdades = edades.reduce(function (total, edad) {
                return total + edad;
            }, 0);
            const promedio = sumaEdades / edades.length;

            // Redondea el promedio a 2 decimales y luego asigna el resultado como texto al elemento
            promedioResultado.textContent = 'Promedio de Edad: ' + promedio.toFixed(2);
        } else {
            // En caso de que no haya edades para calcular el promedio
            promedioResultado.textContent = 'No hay edades para calcular el promedio.';
        }
    });

    /***************************************************** FORM ABM *****************************************************************/
     
    // Asignamos los Forms a variables
    const formDatos = document.getElementById('formDatos');
    const formAbm = document.getElementById('formAbm');

    // Botón "Agregar" para mostrar el formulario ABM
    const mostrarFormABMButton = document.getElementById('mostrarFormABM');
    mostrarFormABMButton.addEventListener('click', function () {
        // Oculta el formulario de datos
        formDatos.style.display = 'none';
        // Muestra el formulario de Alta/Baja/Modificación
        formAbm.style.display = 'block';
    });

    // Selector para el tipo de personaje
    const tipoPersonajeSelect = document.getElementById('tipoPersonaje');
    
    // Campos específicos de Héroe y Villano
    const camposHeroe = document.getElementById('camposHeroe');
    const camposVillano = document.getElementById('camposVillano');

    // Evento para mostrar/ocultar campos según el tipo de personaje seleccionado
    tipoPersonajeSelect.addEventListener('change', function () {
        const tipoSeleccionado = tipoPersonajeSelect.value;
        if (tipoSeleccionado === 'heroe') {
            camposHeroe.style.display = 'block';
            camposVillano.style.display = 'none';
        } else if (tipoSeleccionado === 'villano') {
            camposHeroe.style.display = 'none';
            camposVillano.style.display = 'block';
        }
    });

    // Funcionalidad Boton Cancelar del FormABM
    const cancelarButton = document.getElementById('cancelarButton');
    cancelarButton.addEventListener('click', function () {
        // Ocultar el formulario de ABM
        formAbm.style.display = 'none';
    
        // Mostrar el formulario de datos
        formDatos.style.display = 'block';
    
    });

    /**********************************************VALIDACION DE DATOS****************************************** */
    function validarDatos(personaje) {
        if (!(personaje instanceof Persona)) {
            // No es una instancia de Persona
            return 'El objeto no es una instancia de Persona.';
        }
    
        if (typeof personaje.id !== 'number' || personaje.id <= 0) {
            return 'El ID debe ser un número válido y mayor que 0.';
        }
    
        if (typeof personaje.nombre !== 'string' || personaje.nombre.trim() === '') {
            return 'El nombre debe ser una cadena de texto válida.';
        }
    
        if (typeof personaje.apellido !== 'string' || personaje.apellido.trim() === '') {
            return 'El apellido debe ser una cadena de texto válida.';
        }
    
        if (typeof personaje.edad !== 'number' || personaje.edad <= 0) {
            return 'La edad debe ser un número válido y mayor que 0.';
        }
    
        if (personaje instanceof Heroe) {
            // Validaciones específicas para la clase Heroe
            if (typeof personaje.alterEgo !== 'string' || personaje.alterEgo.trim() === '') {
                return 'El Alter Ego debe ser una cadena de texto válida.';
            }
    
            if (typeof personaje.ciudad !== 'string' || personaje.ciudad.trim() === '') {
                return 'La ciudad debe ser una cadena de texto válida.';
            }
    
            if (typeof personaje.publicado !== 'number' || personaje.publicado <= 1940) {
                return 'El año de publicación debe ser un número mayor a 1940.';
            }
        } else if (personaje instanceof Villano) {
            // Validaciones específicas para la clase Villano
            if (typeof personaje.enemigo !== 'string' || personaje.enemigo.trim() === '') {
                return 'El enemigo debe ser una cadena de texto válida.';
            }
    
            if (typeof personaje.robos !== 'number' || personaje.robos <= 0) {
                return 'La cantidad de robos debe ser un número mayor que 0.';
            }
    
            if (typeof personaje.asesinatos !== 'number' || personaje.asesinatos <= 0) {
                return 'La cantidad de asesinatos debe ser un número mayor que 0.';
            }
        }
    
        // Si no se encontraron problemas de validación, retorna null
        return null;
    }
    


    /***************************************************** ALTA ******************************************************* */
    altaButton.addEventListener('click', function () {
        // Obtener los valores de los campos del formulario
        const tipoPersonaje = document.getElementById('tipoPersonaje').value;
        const id = parseInt(document.getElementById('id').value); // Obtener el valor del campo ID
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const edad = parseInt(document.getElementById('edad').value);
    
        // Variables específicas de Héroe
        const alterego = document.getElementById('alterego').value;
        const ciudad = document.getElementById('ciudad').value;
        const publicado = parseInt(document.getElementById('publicado').value);
    
        // Variables específicas de Villano
        const enemigo = document.getElementById('enemigo').value;
        const robos = parseInt(document.getElementById('robos').value);
        const asesinatos = parseInt(document.getElementById('asesinatos').value);
    
        // Crea un objeto de persona (héroe o villano) según el tipo seleccionado
        let nuevoPersonaje = null;
    
        if (tipoPersonaje === 'heroe') {
            nuevoPersonaje = new Heroe(id, nombre, apellido, edad, alterego, ciudad, publicado);
        } else if (tipoPersonaje === 'villano') {
            nuevoPersonaje = new Villano(id, nombre, apellido, edad, enemigo, robos, asesinatos);
        }
    
        // Validar los datos según el tipo de personaje
        let datosValidos = validarDatos(nuevoPersonaje);
        console.log(datosValidos);
    
        if (datosValidos === null) {
            // Agregar el nuevo personaje al listado
            personajes.push(nuevoPersonaje);
    
            mostrarObjetos();
    
            // Limpiar los campos del formulario
            document.getElementById('id').value = ''; // Limpiar el campo ID
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('alterego').value = '';
            document.getElementById('ciudad').value = '';
            document.getElementById('publicado').value = '';
            document.getElementById('enemigo').value = '';
            document.getElementById('robos').value = '';
            document.getElementById('asesinatos').value = '';
    
            // Mostrar un mensaje de éxito
            alert('Personaje agregado con éxito.');
    
            // Regresar al formulario de datos
            document.getElementById('formAbm').style.display = 'none';
            document.getElementById('formDatos').style.display = 'block';
        } else {
            alert(datosValidos);
        }
    });
    

    

});