const db = firebase.database();
const auth = firebase.auth();

function logout() {
  auth.signOut();
}

$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();

  $('#fecha').val(moment().format('YYYY-MM-DD'));

  db.ref('costosProduccion/').on('value', (datos) => {
    localStorage.setItem('productos', JSON.stringify(datos));
  }); 

  mostrarProductos();
  llenarSelectCategorias();
  llenarSelectProductos();

  $.toaster({
    settings: {
      'timeout': 3000
    }
  });
});

function mostrarProductos() {
  let productos = JSON.parse(localStorage.getItem('productos'));
  let thumbnailsXs = "", thumbnailsSm = "", thumbnailsMd = "", thumbnailsLg = "";

  for(let producto in productos) {
    thumbnailsXs += `<div class="col-xs-12">
                      <a class="thumbnail-a" onclick="abrirModalProducto('${producto}')">
                        <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${productos[producto].nombre}">
                          <div class="panel-heading">
                            <h3 class="text-center">${producto}</h3>
                          </div>
                          <img src="img/${producto}.jpg" style="height: 200px;">
                          <div class="panel-footer">
                            <h4 class="text-center">Peso: ${productos[producto].kilos} Kg</h4>
                            <h4 class="text-center">Costo: $ ${productos[producto].costo}</h4>
                          </div>
                        </div>
                      </a>
                    </div>`;

    thumbnailsSm += `<div class="col-sm-6">
                      <a class="thumbnail-a" onclick="abrirModalProducto('${producto}')">
                        <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${productos[producto].nombre}">
                          <div class="panel-heading">
                            <h3 class="text-center">${producto}</h3>
                          </div>
                          <img src="img/${producto}.jpg" style="height: 200px;">
                          <div class="panel-footer">
                            <h4 class="text-center">Peso: ${productos[producto].kilos} Kg</h4>
                            <h4 class="text-center">Costo: $ ${productos[producto].costo}</h4>
                          </div>
                        </div>
                      </a>
                    </div>`;

    thumbnailsMd += `<div class="col-md-3">
                      <a class="thumbnail-a" onclick="abrirModalProducto('${producto}')">
                        <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${productos[producto].nombre}">
                          <div class="panel-heading">
                            <h3 class="text-center">${producto}</h3>
                          </div>
                          <img src="img/${producto}.jpg" style="height: 200px;">
                          <div class="panel-footer">
                            <h4 class="text-center">Peso: ${productos[producto].kilos} Kg</h4>
                            <h4 class="text-center">Costo: $ ${productos[producto].costo}</h4>
                          </div>
                        </div>
                      </a>
                    </div>`;

    thumbnailsLg += `<div class="col-lg-2">
                      <a class="thumbnail-a" onclick="abrirModalProducto('${producto}')">
                        <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${productos[producto].nombre}">
                          <div class="panel-heading">
                            <h3 class="text-center">${producto}</h3>
                          </div>
                          <img src="img/${producto}.jpg" style="height: 200px;">
                          <div class="panel-footer">
                            <h4 class="text-center">Peso: ${productos[producto].kilos} Kg</h4>
                            <h4 class="text-center">Costo: $ ${productos[producto].costo}</h4>
                          </div>
                        </div>
                      </a>
                    </div>`;
  }

  $('#fila-xs').html(thumbnailsXs);
  $('#fila-sm').html(thumbnailsSm);
  $('#fila-md').html(thumbnailsMd);
  $('#fila-lg').html(thumbnailsLg);
  $('[data-toggle="tooltip"]').tooltip();
}

/* function mostrarProductos() {
  let costos = db.ref('costosProduccion');
  costos.on('value', function(datos) {
    let productos = datos.val();
    let thumbnailsXs = "", thumbnailsSm = "", thumbnailsMd = "", thumbnailsLg = "";

    for(let producto in productos) {
      thumbnailsXs += `<div class="col-xs-12">
                        <a class="thumbnail-a" onclick="abrirModalProducto('${producto}')">
                          <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${productos[producto].nombre}">
                            <div class="panel-heading">
                              <h3 class="text-center">${producto}</h3>
                            </div>
                            <img src="img/${producto}.jpg" style="height: 200px;">
                            <div class="panel-footer">
                              <h4 class="text-center">Peso: ${productos[producto].kilos} Kg</h4>
                              <h4 class="text-center">Costo: $ ${productos[producto].costo}</h4>
                            </div>
                          </div>
                        </a>
                      </div>`;

      thumbnailsSm += `<div class="col-sm-6">
                        <a class="thumbnail-a" onclick="abrirModalProducto('${producto}')">
                          <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${productos[producto].nombre}">
                            <div class="panel-heading">
                              <h3 class="text-center">${producto}</h3>
                            </div>
                            <img src="img/${producto}.jpg" style="height: 200px;">
                            <div class="panel-footer">
                              <h4 class="text-center">Peso: ${productos[producto].kilos} Kg</h4>
                              <h4 class="text-center">Costo: $ ${productos[producto].costo}</h4>
                            </div>
                          </div>
                        </a>
                      </div>`;

      thumbnailsMd += `<div class="col-md-3">
                        <a class="thumbnail-a" onclick="abrirModalProducto('${producto}')">
                          <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${productos[producto].nombre}">
                            <div class="panel-heading">
                              <h3 class="text-center">${producto}</h3>
                            </div>
                            <img src="img/${producto}.jpg" style="height: 200px;">
                            <div class="panel-footer">
                              <h4 class="text-center">Peso: ${productos[producto].kilos} Kg</h4>
                              <h4 class="text-center">Costo: $ ${productos[producto].costo}</h4>
                            </div>
                          </div>
                        </a>
                      </div>`;

      thumbnailsLg += `<div class="col-lg-2">
                        <a class="thumbnail-a" onclick="abrirModalProducto('${producto}')">
                          <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${productos[producto].nombre}">
                            <div class="panel-heading">
                              <h3 class="text-center">${producto}</h3>
                            </div>
                            <img src="img/${producto}.jpg" style="height: 200px;">
                            <div class="panel-footer">
                              <h4 class="text-center">Peso: ${productos[producto].kilos} Kg</h4>
                              <h4 class="text-center">Costo: $ ${productos[producto].costo}</h4>
                            </div>
                          </div>
                        </a>
                      </div>`;
    }

    $('#fila-xs').html(thumbnailsXs);
    $('#fila-sm').html(thumbnailsSm);
    $('#fila-md').html(thumbnailsMd);
    $('#fila-lg').html(thumbnailsLg);
    $('[data-toggle="tooltip"]').tooltip();
  });
} */

$('#modalProducto').on('hide.bs.modal', function() {
  let claveProducto = $('#claveProducto').val();
  $(`#grafica-${claveProducto}`).remove();
});

function abrirModalProducto(claveProducto) {
  let tabla = $(`#tabla-subProductos`).DataTable({
    destroy: true,
    "lengthChange": false,
    "scrollY": "300px",
    "scrollCollapse": true,
    "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
    },
    "ordering": false
  });
  $('#modalProducto').modal('show');

  let costosProduccion = db.ref(`costosProduccion/${claveProducto}`);
  costosProduccion.once('value', function(snap) {
    let nombreProducto = snap.val().nombre;
    let kilos = snap.val().kilos;
    let piezas = snap.val().piezas;
    let costo = snap.val().costo;
    let subProductos = snap.val().subProductos;
    let fechaCaptura = snap.val().fechaCaptura;
    let fechaFinalizada = snap.val().fechaFinalizada;
    //let historialCostos = snap.val().

    $('#img-producto').attr('src', `img/${claveProducto}.jpg`);
    $('#claveProducto').val(claveProducto);
    $('#nombreProducto').val(nombreProducto);
    $('#costo').val(costo);
    $('#kilos').val(kilos);
    $('#piezas').val(piezas);
    $('#fechaCaptura').val(fechaCaptura);
    $('#fechaFinalizada').val(fechaFinalizada);

    //let filas = "";
    tabla.clear();

    for(let subProducto in subProductos) {
      let rutaSubProducto = db.ref(`subProductos/${subProducto}`);
      rutaSubProducto.once('value', function(datos) {
        if(datos.hasChildren()) {
          let precio = datos.val().precio;

          let fila = `<tr>
                      <td>${subProducto}</td>
                      <td>${subProductos[subProducto].nombre}</td>
                      <td>${subProductos[subProducto].valorConstante}</td>
                      <td>${precio}</td>
                      <td>${(subProductos[subProducto].valorConstante * precio).toFixed(4)}</td>
                    </tr>`;

          tabla.rows.add($(fila))
          tabla.columns.adjust().draw();
        }
      });
    }

    $('#contenedorGrafica').append(`<canvas id="grafica-${claveProducto}"></canvas>`);
    let rutaBatidas = db.ref('batidas');
    rutaBatidas.orderByChild("claveProducto").equalTo(claveProducto).limitToLast(7).once('value', function (snapshot) {
      let batidas = snapshot.val();
      let fechas = [], costos = [];

      for(let batida in batidas) {
        fechas.push(batidas[batida].fechaCaptura);
        costos.push(batidas[batida].costo);
      }

      let canvas = document.getElementById(`grafica-${claveProducto}`);
      let ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let chart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: fechas,
              datasets: [{
                  label: claveProducto,
                  backgroundColor: '#ffad32',
                  borderColor: '#ffad32',
                  data: costos,
              }]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              position: "top",
              text: "Costos",
              fontSize: 18,
              fontColor: "#111"
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Precio'
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$ ' + value.toFixed(4);
                    }
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Fecha'
                }
              }]
            }
          }
      });
    });
  });
}

$('#modalProducto').on('shown.bs.modal', function() {
  $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
});

$('#collapseSubProductos').on('shown.bs.collapse', function () {
  $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
})

$('#collapseSubProductos').on('show.bs.collapse', function () {
  $('#verSubProductos').text('Ocultar sub productos');
})

$('#collapseSubProductos').on('hide.bs.collapse', function () {
  $('#verSubProductos').text('Ver sub productos');
})

function haySesion() {
  auth.onAuthStateChanged(function (user) {
    //si hay un usuario
    if (user) {
      mostrarContador();
    }
    else {
      $(location).attr("href", "index.html");
    }
  });
}

haySesion();

function mostrarNotificaciones() {
  let usuario = auth.currentUser.uid;
  let notificacionesRef = db.ref('notificaciones/almacen/'+usuario+'/lista');
  notificacionesRef.on('value', function(snapshot) {
    let lista = snapshot.val();
    let lis = "";

    let arrayNotificaciones = [];
    for(let notificacion in lista) {
      arrayNotificaciones.push(lista[notificacion]);
    }

    arrayNotificaciones.reverse();

    for(let i in arrayNotificaciones) {
      let date = arrayNotificaciones[i].fecha;
      moment.locale('es');
      let fecha = moment(date, "MMMM DD YYYY, HH:mm:ss").fromNow();

      lis += '<li>' +
               '<a>' +
                '<div>' +
                  '<i class="fa fa-comment fa-fw"></i> ' + arrayNotificaciones[i].mensaje +
                    '<span class="pull-right text-muted small">'+fecha+'</span>' +
                '</div>' +
               '</a>' +
             '</li>';
    }

    $('#contenedorNotificaciones').empty().append('<li class="dropdown-header">Notificaciones</li><li class="divider"></li>');
    $('#contenedorNotificaciones').append(lis);
  });
}

function mostrarContador() {
  let uid = auth.currentUser.uid;
  let notificacionesRef = db.ref('notificaciones/almacen/'+uid);
  notificacionesRef.on('value', function(snapshot) {
    let cont = snapshot.val().cont;

    if(cont > 0) {
      $('#spanNotificaciones').html(cont).show();
    }
    else {
      $('#spanNotificaciones').hide();
    }
  });
}

function verNotificaciones() {
  let uid = auth.currentUser.uid;
  let notificacionesRef = db.ref('notificaciones/almacen/'+uid);
  notificacionesRef.update({cont: 0});
}

$('#campana').click(function() {
  verNotificaciones();
});

function llenarSelectCategorias() {
  let rutaCategorias = db.ref('categoriasPT');
  rutaCategorias.on('value', function(snap) {
    let categorias = snap.val();
    let options = '<option selected disabled value="">Categoría</option>';

    for(let i in categorias) {
      options += `<option value="${categorias[i].nombre}">${categorias[i].nombre}</option>`;
    }

    $('#categoria').html(options);
  });
}

$('#categoria').change(function() {
  let categoria = $(this).val();

  let costos = db.ref('costosProduccion');
  costos.orderByChild('categoria').equalTo(categoria).on('value', function(datos) {
    let productos = datos.val();
    let thumbnailsXs = "", thumbnailsSm = "", thumbnailsMd = "", thumbnailsLg = "";

    for(let producto in productos) {
      thumbnailsXs += `<div class="col-xs-12">
                        <a class="thumbnail-a" onclick="abrirModalProducto('${producto}')">
                          <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${productos[producto].nombre}">
                            <div class="panel-heading">
                              <h3 class="text-center">${producto}</h3>
                            </div>
                            <img src="img/${producto}.jpg" style="height: 200px;">
                            <div class="panel-footer">
                              <h4 class="text-center">Peso: ${productos[producto].kilos} Kg</h4>
                              <h4 class="text-center">Costo: $ ${productos[producto].costo}</h4>
                            </div>
                          </div>
                        </a>
                      </div>`;

      thumbnailsSm += `<div class="col-sm-6">
                        <a class="thumbnail-a" onclick="abrirModalProducto('${producto}')">
                          <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${productos[producto].nombre}">
                            <div class="panel-heading">
                              <h3 class="text-center">${producto}</h3>
                            </div>
                            <img src="img/${producto}.jpg" style="height: 200px;">
                            <div class="panel-footer">
                              <h4 class="text-center">Peso: ${productos[producto].kilos} Kg</h4>
                              <h4 class="text-center">Costo: $ ${productos[producto].costo}</h4>
                            </div>
                          </div>
                        </a>
                      </div>`;

      thumbnailsMd += `<div class="col-md-3">
                        <a class="thumbnail-a" onclick="abrirModalProducto('${producto}')">
                          <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${productos[producto].nombre}">
                            <div class="panel-heading">
                              <h3 class="text-center">${producto}</h3>
                            </div>
                            <img src="img/${producto}.jpg" style="height: 200px;">
                            <div class="panel-footer">
                              <h4 class="text-center">Peso: ${productos[producto].kilos} Kg</h4>
                              <h4 class="text-center">Costo: $ ${productos[producto].costo}</h4>
                            </div>
                          </div>
                        </a>
                      </div>`;

      thumbnailsLg += `<div class="col-lg-2">
                        <a class="thumbnail-a" onclick="abrirModalProducto('${producto}')">
                          <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${productos[producto].nombre}">
                            <div class="panel-heading">
                              <h3 class="text-center">${producto}</h3>
                            </div>
                            <img src="img/${producto}.jpg" style="height: 200px;">
                            <div class="panel-footer">
                              <h4 class="text-center">Peso: ${productos[producto].kilos} Kg</h4>
                              <h4 class="text-center">Costo: $ ${productos[producto].costo}</h4>
                            </div>
                          </div>
                        </a>
                      </div>`;
    }

    $('#fila-xs').html(thumbnailsXs);
    $('#fila-sm').html(thumbnailsSm);
    $('#fila-md').html(thumbnailsMd);
    $('#fila-lg').html(thumbnailsLg);
    $('[data-toggle="tooltip"]').tooltip();
  });
});

$('#producto').change(function() {
  let claveProducto = $(this).val();

  let costos = db.ref(`costosProduccion/${claveProducto}`);
  costos.on('value', function(datos) {
    let producto = datos.val();
    let thumbnailsXs = "", thumbnailsSm = "", thumbnailsMd = "", thumbnailsLg = "";


      thumbnailsXs += `<div class="col-xs-12">
                        <a class="thumbnail-a" onclick="abrirModalProducto('${claveProducto}')">
                          <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${producto.nombre}">
                            <div class="panel-heading">
                              <h3 class="text-center">${claveProducto}</h3>
                            </div>
                            <img src="img/${claveProducto}.jpg" style="height: 200px;">
                            <div class="panel-footer">
                              <h4 class="text-center">Peso: ${producto.kilos} Kg</h4>
                              <h4 class="text-center">Costo: $ ${producto.costo}</h4>
                            </div>
                          </div>
                        </a>
                      </div>`;

      thumbnailsSm += `<div class="col-sm-6">
                        <a class="thumbnail-a" onclick="abrirModalProducto('${claveProducto}')">
                          <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${producto.nombre}">
                            <div class="panel-heading">
                              <h3 class="text-center">${claveProducto}</h3>
                            </div>
                            <img src="img/${claveProducto}.jpg" style="height: 200px;">
                            <div class="panel-footer">
                              <h4 class="text-center">Peso: ${producto.kilos} Kg</h4>
                              <h4 class="text-center">Costo: $ ${producto.costo}</h4>
                            </div>
                          </div>
                        </a>
                      </div>`;

      thumbnailsMd += `<div class="col-md-3">
                        <a class="thumbnail-a" onclick="abrirModalProducto('${claveProducto}')">
                          <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${producto.nombre}">
                            <div class="panel-heading">
                              <h3 class="text-center">${claveProducto}</h3>
                            </div>
                            <img src="img/${claveProducto}.jpg" style="height: 200px;">
                            <div class="panel-footer">
                              <h4 class="text-center">Peso: ${producto.kilos} Kg</h4>
                              <h4 class="text-center">Costo: $ ${producto.costo}</h4>
                            </div>
                          </div>
                        </a>
                      </div>`;

      thumbnailsLg += `<div class="col-lg-2">
                        <a class="thumbnail-a" onclick="abrirModalProducto('${claveProducto}')">
                          <div class="thumbnail card" data-toggle="tooltip" data-placement="bottom" title="${producto.nombre}">
                            <div class="panel-heading">
                              <h3 class="text-center">${claveProducto}</h3>
                            </div>
                            <img src="img/${claveProducto}.jpg" style="height: 200px;">
                            <div class="panel-footer">
                              <h4 class="text-center">Peso: ${producto.kilos} Kg</h4>
                              <h4 class="text-center">Costo: $ ${producto.costo}</h4>
                            </div>
                          </div>
                        </a>
                      </div>`;


    $('#fila-xs').html(thumbnailsXs);
    $('#fila-sm').html(thumbnailsSm);
    $('#fila-md').html(thumbnailsMd);
    $('#fila-lg').html(thumbnailsLg);
    $('[data-toggle="tooltip"]').tooltip();
  });
});


function llenarSelectProductos() {
  let rutaCostosProduccion = db.ref('costosProduccion');
  rutaCostosProduccion.on('value', function(snap) {
    let productos = snap.val();
    let options = '<option selected disabled value="">Producto</option>';

    for(let producto in productos) {
      options += `<option value="${producto}">${producto} - ${productos[producto].nombre}</option>`;
    }
    $('#producto').html(options);
  });
}

Chart.plugins.register({
  afterDatasetsDraw: function(chart, easing) {
    // To only draw at the end of animation, check for easing === 1
    var ctx = chart.ctx;
    chart.data.datasets.forEach(function (dataset, i) {
      var meta = chart.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach(function(element, index) {
          // Draw the text in black, with the specified font
          ctx.fillStyle = 'rgb(0, 0, 0)';
          var fontSize = 16;
          var fontStyle = 'normal';
          var fontFamily = 'Helvetica Neue';
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
          // Just naively convert to string for now
          var dataString = dataset.data[index].toString();
          // Make sure alignment settings are correct
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var padding = 5;
          var position = element.tooltipPosition();
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
        });
      }
    });
  }
});
