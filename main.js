let precioProd = 0;
const nodoPrecioTotal = document.querySelector("#precioTotal");
const iconoCarrito = document.querySelector(".contadorCarrito");
const data = JSON.parse(localStorage.getItem("MI_CARRITO")) || [];
let miCarrito = new Carrito(data);
const url = "./data/productos.json";
// let prods = miCarrito.productos;
const botonVerCarrito = document.querySelector("#ver");
const carrito = document.querySelector(".carrito");
const botonVaciarCarrito = document.querySelector("#botonVaciar");
const botonFinalizarCompra = document.querySelector("#botonFinalizar");
const botonFormulario = document.querySelector("#enviar");

const botonesCarrito = ()=>{
    //esta funcion inserta los productos con sus imagenes y botones de "agregar producto" en el documento HTML, tmabién le da su funcionalidad a este último botón. Los datos de los productos son tomados de un documento en formato JSON mediante un fetch

    const contenedorProductos = document.querySelector(".productos");

    fetch(url)
    .then((r)=>r.json())
    .then((monitores)=>{
        monitores.forEach((monitor)=>{

            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
            <img src=${monitor.imagen} style="height:120px; object-fit:cover">
            <h4 class="modelo">${monitor.modelo}</h4>
            <h4 class="precio">$${monitor.precio}</h4>
            <button id="agregar${monitor.id}">Agregar producto</button>`;
            contenedorProductos.appendChild(div);
    
            const botonAgregar = document.querySelector(`#agregar${monitor.id}`);
    
            botonAgregar.addEventListener("click", ()=>{
                
                agregarAlCarrito(monitor.id);
                actualizarCarrito();
                Toastify({
                    text:"El producto fue agregado con éxito!",
                    duration:1500,
                    position:"left",
                }).showToast();
            })
        })
    });

    
}

const agregarAlCarrito = (prodId)=>{
    // esta funcion verifica si el producto agregado ya se encontraba en el carrito, de ser así, incrementa la cantidad de este producto en 1 y de no estar ya agregado este producto, lo agrega al carrito.

    fetch(url)
    .then((r)=>r.json())
    .then((monitores)=>{

        const existe = data.some (prod => prod.id === prodId);
        if(existe){

            const prod = data.map(prod => {

                if(prod.id === prodId){
                    prod.cantidad++
                }
            })
        }
        else{
            let item = monitores.find((prod) => prod.id === prodId);
            miCarrito.addProducto(item);
        }
        actualizarCarrito();
    });
}

const actualizarCarrito = ()=>{

    let contenedor = document.getElementById("carritoDeCompras");
    contenedor.innerHTML = "";

    data.forEach(monitor=>{

        let nodoLi = document.createElement("div");
        nodoLi.innerHTML = `${monitor.modelo} - $${monitor.precio} - Cantidad:${monitor.cantidad}<i class="fa-solid fa-circle-minus" id="eliminar${monitor.id}"></i>`
        contenedor.appendChild(nodoLi);

        const botonEliminar = document.querySelector(`#eliminar${monitor.id}`);

        botonEliminar.addEventListener("click", () => {
            
            if(monitor.cantidad>1){
                monitor.cantidad--;
            }
            else{
                eliminarDelCarrito(monitor.id);
            }
            actualizarCarrito();
        })
    })
    iconoCarrito.innerHTML = `${data.length}`;
    precioTotal = data.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    nodoPrecioTotal.innerText = `Precio total: $${precioTotal}`;
    miCarrito.guardar();
}

const eliminarDelCarrito = (prodId) => {
    const item = data.find((prod) => prod.id === prodId);
    const indice = data.indexOf(item);
    if (item === undefined || !item){
        swal.fire({
            title:"Ese producto no está en el carrito",
            icon:"warning"
        })
    }
    else{
        miCarrito.productos.splice(indice, 1);
    }
    actualizarCarrito();   
}

const botonesModal = () =>{
    
    botonVaciarCarrito.addEventListener("click", ()=>{data.length = 0; actualizarCarrito();});

    botonFinalizarCompra.addEventListener("click", ()=>{
        
        swal.fire({

            title:"¿Seguro desea finalizar su compra?",
            showCancelButton:true,
            confirmButtonText:"Sí, estoy seguro",
            cancelButtonText:"No, quiero seguir comprando",
            icon:"warning"
        }).then((result) => {

            if(result.isConfirmed){

                if(data.length > 0){
                    swal.fire({
                        title:"Compra finalizada",
                        text:"Gracias por elegirnos, le enviaremos un mail con la confirmación de su compra",
                        icon:"success"
                    });
                    data.length = 0;
                    actualizarCarrito();
                }
                else{
                    swal.fire({
                        title:"Compra no finalizada",
                        text:"Debe seleccionar al menos un producto para poder finalizar la compra",
                        icon:"warning"
                    });
                }
            }
        })
        
    })
}

const enviarFormulario = () => {

    const nombre = document.querySelector("#nombre");
    const telefono = document.querySelector("#telefono");
    const mail = document.querySelector("#mail");
    const consulta = document.querySelector("#consulta");

    botonFormulario.addEventListener("click", () => {

        if(nombre.value.trim() !=="" && telefono.value.length >= 8 && consulta.value.length >= 12 && mail.value.length >= 5 && mail.value.search("@")!== -1){
            swal.fire({
                title:"Su consulta fue recibida con éxito",
                text:"Enviaremos su respuesta lo antes posible",
                icon:"success",
            })
        }
        // else{
        //     swal.fire({
        //         title:"Error al enviar su consulta",
        //         text:"Por favor, complete bien todos los campos",
        //         icon:"warning"
        //     })
        // }
            
    })
}

function init(){
    botonesCarrito();
    actualizarCarrito();
    botonesModal();
    enviarFormulario();
}

init();


