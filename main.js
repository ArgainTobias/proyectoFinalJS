let cantidadCuotas = 0;
let totalCuotas = 0;
let art = 0;
const iconoCarrito = document.querySelector(".contadorCarrito");
const data = JSON.parse(localStorage.getItem("MI_CARRITO"));
let miCarrito = new Carrito([]);
if(!miCarrito){

    miCarrito = new Carrito([]);
}
else{

    miCarrito = new Carrito(data);
}
const url = "./data/productos.json";
let prods = miCarrito.productos;
const botonVerCarrito = document.querySelector("#ver");
const carrito = document.querySelector(".carrito");
const botonVaciarCarrito = document.querySelector("#botonVaciar");

fetch(url)
.then((r)=>r.json())
.then((p)=>{
        let [id1,id2,id3,id4] = p;
        let {precio:precio1} = id1;
        let {precio:precio2} = id2;
        let {precio:precio3} = id3;
        let {precio:precio4} = id4;
    });


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
                actualizarNumeroCarrito();
                Toastify({
                    text:"El producto fue agregado con éxito!",
                    duration:3000,
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

        const existe = prods.some (prod => prod.id === prodId);
        if(existe){

            const prod = prods.map(prod => {

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

    prods.forEach(monitor=>{

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
    actualizarNumeroCarrito();
    miCarrito.guardar();
}

const actualizarNumeroCarrito = ()=>{

    iconoCarrito.innerHTML = `${prods.length}`
}

const eliminarDelCarrito = (prodId) => {
    const item = prods.find((prod) => prod.id === prodId);
    const indice = prods.indexOf(item);
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

const vaciarCarrito = () =>{
    
    const botonVaciarCarrito = document.querySelector("#botonVaciar");
    botonVaciarCarrito.addEventListener("click", ()=>{prods.length = 0; actualizarCarrito();});
}

function init(){
    actualizarCarrito();
    actualizarNumeroCarrito()
    botonesCarrito();
    vaciarCarrito();
}

init();
