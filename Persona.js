// Clase Persona
export class Persona {
    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

// Clase Héroe heredada de Persona
export class Heroe extends Persona {
    constructor(id, nombre, apellido, edad, alterEgo, ciudad, publicado) {
        super(id, nombre, apellido, edad);
        this.alterEgo = alterEgo;
        this.ciudad = ciudad;
        this.publicado = publicado;
    }
}

// Clase Villano heredada de Persona
export class Villano extends Persona {
    constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos) {
        super(id, nombre, apellido, edad);
        this.enemigo = enemigo;
        this.robos = robos;
        this.asesinatos = asesinatos;
    }
}

// Ejemplo de creación de objetos
// const heroe1 = new Heroe(1, 'Peter', 'Parker', 25, 'Spider-Man', 'Nueva York', 1962);
// const villano1 = new Villano(2, 'Norman', 'Osborn', 45, 'Green Goblin', 7, 3);

// Puedes crear más héroes y villanos de la misma manera
