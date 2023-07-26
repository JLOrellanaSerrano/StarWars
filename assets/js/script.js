//5. variable global

let salmon = document.getElementById("numeroSalmon");
let apple = document.getElementById("numeroApple");
let blue = document.getElementById("numeroBlue");

//1.clase de personaje 4. se creo método crearTarjetas

class Personaje {
  constructor(nombre, estatura, peso, row) {
    this.nombre = nombre;
    this.estatura = estatura;
    this.peso = peso;
    this.row = row;
  }

  cargarTarjeta = (color) => {
    document.getElementById(`${this.row}`).innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 ">
            <div class="single-timeline-content d-flex wow fadeInLeft alturaTarjeta" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                <div class="timeline-icon ${color}"></div>
                <div class="timeline-text">
                    <h6>${this.nombre}</h6>
                    <p>Estatura: ${this.estatura}cm.  </p>
                    <p>Peso: ${this.peso} kg.</p>
                </div>
            </div>
        </div>
    </div>
        `;
  };
}

//2. consumo de API for fetch

/* const URL_BASE = `https://swapi.dev/api/people/` */

const traerPersonaje = async (id, color, row) => {
  try {
    let result = await fetch(`https://swapi.dev/api/people/${id}`);
    let respuesta = await result.json();
    let personaje = crearPersonaje(respuesta, row);
    personaje.cargarTarjeta(color);
  } catch (error) {
    throw new Error(error);
  }
};

//3. función crear objeto personaje

const crearPersonaje = (personaje, row) => {
  let infoPersonaje = new Personaje(
    personaje.name,
    personaje.height,
    personaje.mass,
    row
  );
  return infoPersonaje;
};

//5. Funcion generadora con 3 parámetos
function* generador(id, color, row) {
  yield traerPersonaje(id, color, row);
  id++;
  yield traerPersonaje(id, color, row);
  id++;
  yield traerPersonaje(id, color, row);
  id++;
  yield traerPersonaje(id, color, row);
  id++;
  yield traerPersonaje(id, color, row);
  id++;
}

let gen1 = generador(1, "salmon", "rowSalmon");
let gen2 = generador(6, "apple", "rowApple");
let gen3 = generador(12, "blue", "rowBlue");

//6.

salmon.addEventListener("click", async () => {
  let data = gen1.next();
  !data.done ? data.value : alert("No hay más personajes");
});

apple.addEventListener("click", async () => {
  let data = gen2.next();
  !data.done ? data.value : alert("No hay más personajes");
});
blue.addEventListener("click", async () => {
  let data = gen3.next();
  !data.done ? data.value : alert("No hay más personajes");
});
