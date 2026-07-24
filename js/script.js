/* ================================================================
   SCRIPT PRINCIPAL — Caso S&OP Mercado Envios
   ================================================================
   Este archivo hace 3 cosas:
   1. Carga los datos desde data/resultados.json
   2. Inyecta esos datos en el HTML (KPIs, hallazgos, tablas, etc.)
   3. Controla el menu lateral (resaltar seccion activa + boton movil)

   Los graficos NO se generan aqui todavia -- busca los comentarios
   "AQUI VA TU GRAFICA" mas abajo para saber exactamente donde pegar
   tu codigo de Chart.js o Plotly.
   ================================================================ */


/* ----------------------------------------------------------------
   1. CARGA DE DATOS
   ---------------------------------------------------------------- */

// fetch() lee el archivo JSON. Si cambias el nombre o la ubicacion
// de data/resultados.json, actualiza esta ruta tambien.
fetch('data/resultados.json')
  .then(function (respuesta) {
    return respuesta.json();
  })
  .then(function (datos) {
    // Una vez que los datos llegan, llenamos cada seccion.
    // Si agregas una nueva seccion que necesite datos, agrega aqui
    // tu propia funcion "renderX(datos)" siguiendo el mismo patron.
    renderKPIs(datos.kpis);
    renderHallazgos(datos.hallazgos);
    renderTimeline(datos.timeline);
    renderTabla('tablaSensibilidad', datos.tabla_sensibilidad);
    renderListaSimple('conclusionesContainer', datos.conclusiones);
    renderListaSimple('recomendacionesContainer', datos.recomendaciones);

    // Cuando los datos ya estan listos, es el mejor momento para
    // inicializar tus graficas (porque ya tienes numeros reales
    // disponibles en la variable "datos").
    inicializarGraficos(datos);
  })
  .catch(function (error) {
    console.error('No se pudo cargar data/resultados.json:', error);
  });


/* ----------------------------------------------------------------
   2. FUNCIONES QUE INYECTAN DATOS EN EL HTML
   ---------------------------------------------------------------- */

// Dibuja las tarjetas de KPI dentro de <div id="kpiContainer">
function renderKPIs(kpis) {
  var contenedor = document.getElementById('kpiContainer');
  if (!contenedor) return;

  // AQUI PUEDES AGREGAR OTRO KPI: no edites esta funcion, agrega un
  // objeto nuevo en el array "kpis" de data/resultados.json y se
  // va a dibujar automaticamente con el mismo estilo.
  kpis.forEach(function (kpi) {
    var tarjeta = document.createElement('div');
    tarjeta.className = 'kpi-card' + (kpi.tipo === 'alerta' ? ' alerta' : '');
    tarjeta.innerHTML =
      '<span class="kpi-valor">' + kpi.valor + '</span>' +
      '<span class="kpi-etiqueta">' + kpi.etiqueta + '</span>';
    contenedor.appendChild(tarjeta);
  });
}

// Dibuja las tarjetas de hallazgos dentro de <div id="hallazgosContainer">
function renderHallazgos(hallazgos) {
  var contenedor = document.getElementById('hallazgosContainer');
  if (!contenedor) return;

  hallazgos.forEach(function (h) {
    var tarjeta = document.createElement('div');
    // La clase "severidad-alta" / "severidad-media" cambia el color del borde (ver CSS)
    tarjeta.className = 'hallazgo-card severidad-' + h.severidad;
    tarjeta.innerHTML =
      '<h4>' + h.titulo + '</h4>' +
      '<p>' + h.descripcion + '</p>';
    contenedor.appendChild(tarjeta);
  });
}

// Dibuja la linea de tiempo dentro de <div id="timelineContainer">
function renderTimeline(eventos) {
  var contenedor = document.getElementById('timelineContainer');
  if (!contenedor) return;

  eventos.forEach(function (evento) {
    var item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML =
      '<div class="timeline-fecha">' + evento.fecha + '</div>' +
      '<div class="timeline-evento">' + evento.evento + '</div>';
    contenedor.appendChild(item);
  });
}

// Dibuja una tabla generica. Sirve para cualquier tabla que tenga
// la forma { encabezados: [...], filas: [[...], [...]] } en el JSON.
// Para usarla con otra tabla, solo llama:
//   renderTabla('idDeTuTabla', datos.nombre_de_tu_tabla)
function renderTabla(idTabla, datosTabla) {
  var tabla = document.getElementById(idTabla);
  if (!tabla || !datosTabla) return;

  var encabezadoHTML = '<thead><tr>' +
    datosTabla.encabezados.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
    '</tr></thead>';

  var filasHTML = '<tbody>' +
    datosTabla.filas.map(function (fila) {
      return '<tr>' + fila.map(function (celda) { return '<td>' + celda + '</td>'; }).join('') + '</tr>';
    }).join('') +
    '</tbody>';

  tabla.innerHTML = encabezadoHTML + filasHTML;
}

// Dibuja una lista simple (usada en Conclusiones y Recomendaciones).
// Para usarla en otra lista, llama: renderListaSimple('idDelUL', datos.tu_array)
function renderListaSimple(idContenedor, items) {
  var contenedor = document.getElementById(idContenedor);
  if (!contenedor || !items) return;

  items.forEach(function (texto) {
    var li = document.createElement('li');
    li.textContent = texto;
    contenedor.appendChild(li);
  });
}


/* ----------------------------------------------------------------
   3. GRAFICOS — aqui es donde TU vas a pegar tu codigo
   ---------------------------------------------------------------- */

function inicializarGraficos(datos) {

  // ============================================================
  // AQUI VA TU GRAFICA DE CHART.JS
  // ============================================================
  // 1) Agrega en el <head> de index.html:
  //    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  // 2) Descomenta y adapta este bloque de ejemplo:
  //
  // new Chart(document.getElementById('graficoCapacidad'), {
  //   type: 'line',
  //   data: {
  //     labels: ['27-may', '28-may', '29-may'],   // <- pon aqui tus fechas reales
  //     datasets: [{
  //       label: 'Capacidad instalada (m3)',
  //       data: [4540, 4530, 4460],                 // <- pon aqui tus valores reales
  //       borderColor: '#3483FA'
  //     }]
  //   }
  // });
  //
  // Tip: si generaste la grafica en Python, puedes exportar tus
  // arrays de fechas/valores con este codigo en tu notebook:
  //   print(list(fechas))
  //   print(list(valores))
  // y pegar el resultado directo en el arreglo "data" y "labels" de arriba.


  // ============================================================
  // AQUI VA TU GRAFICA DE PLOTLY
  // ============================================================
  // 1) Agrega en el <head> de index.html:
  //    <script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></script>
  // 2) Descomenta y adapta este bloque de ejemplo:
  //
  // var datosGrafica = [{
  //   x: ['26-jun', '27-jun', '28-jun'],   // <- fechas reales
  //   y: [3406, 3406, 2998],                 // <- valores reales
  //   type: 'scatter',
  //   mode: 'lines'
  // }];
  // var layoutGrafica = { title: 'Proyeccion de m3' };
  // Plotly.newPlot('graficoProyeccion', datosGrafica, layoutGrafica);


  // ============================================================
  // ALTERNATIVA MAS SIMPLE: usar una imagen en vez de una grafica interactiva
  // ============================================================
  // Si prefieres no usar Chart.js ni Plotly, exporta tu grafica desde
  // Python con plt.savefig('capacidad.png'), colocala en la carpeta
  // images/, y en index.html reemplaza el <canvas> o <div> del
  // contenedor por:
  //   <img src="images/capacidad.png" alt="Capacidad instalada">

}


/* ----------------------------------------------------------------
   4. NAVEGACION DEL MENU LATERAL
   ---------------------------------------------------------------- */

// Boton hamburguesa: abre/cierra el sidebar en movil
var botonMenu = document.getElementById('menuToggle');
var sidebar = document.getElementById('sidebar');

if (botonMenu && sidebar) {
  botonMenu.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar-abierto');
  });
}

// Resaltar el link del menu correspondiente a la seccion que se esta viendo.
// Usa IntersectionObserver: es la forma moderna y eficiente de detectar
// "que seccion esta visible en pantalla ahora mismo" sin escuchar el
// evento scroll manualmente.
var secciones = document.querySelectorAll('.page-section');
var linksDelMenu = document.querySelectorAll('.nav-link');

var observador = new IntersectionObserver(
  function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        var idVisible = entrada.target.getAttribute('id');

        // Quita "active" de todos los links...
        linksDelMenu.forEach(function (link) {
          link.classList.remove('active');
        });
        // ...y se lo pone solo al link que corresponde a la seccion visible
        var linkActivo = document.querySelector('.nav-link[data-section="' + idVisible + '"]');
        if (linkActivo) {
          linkActivo.classList.add('active');
        }
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' } // considera "visible" cuando la seccion esta cerca del centro de la pantalla
);

secciones.forEach(function (seccion) {
  observador.observe(seccion);
});

// En movil, cerrar el menu automaticamente despues de tocar un link
// (para que no se quede tapando el contenido)
linksDelMenu.forEach(function (link) {
  link.addEventListener('click', function () {
    if (sidebar) {
      sidebar.classList.remove('sidebar-abierto');
    }
  });
});
