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

fetch(url)
.then((r)=>r.json())
.then((p)=>{
        let [id1,id2,id3,id4] = p;
        let {precio:precio1} = id1;
        let {precio:precio2} = id2;
        let {precio:precio3} = id3;
        let {precio:precio4} = id4;
    });



function calcularPrecioCuotas(){

    cantidadCuotas = parseInt(prompt("Indique la cantidad de cuotas mediante las que desea abonar (1, 3, 6 o 12): ")); 

    while(cantidadCuotas !== 1 && cantidadCuotas !== 3 && cantidadCuotas !== 6 && cantidadCuotas !== 12){

        cantidadCuotas = parseInt(prompt("Indique la cantidad de cuotas mediante las que desea abonar (1, 3, 6 o 12): "));

    }

    if(art === 1){

        totalCuotas = precio1/cantidadCuotas;
        alert(`Usted debe abonar ${cantidadCuotas} cuotas de $${totalCuotas}`);
        

    }
    else if(art === 2){

        totalCuotas = precio2/cantidadCuotas;
        alert(`Usted debe abonar ${cantidadCuotas} cuotas de $${totalCuotas}`);
        

    }
    else if(art === 3){

        totalCuotas = precio3/cantidadCuotas;
        alert(`Usted debe abonar ${cantidadCuotas} cuotas de $${totalCuotas}`)
        
    }
    else if(art === 4){

        totalCuotas = precio4/cantidadCuotas;
        alert(`Usted debe abonar ${cantidadCuotas} cuotas de $${totalCuotas}`)
    }
}

function darBienvenida(){

    let nombre = prompt(`Ingresa tu nombre: `);
    const myTitle = document.getElementById("titulo");
    myTitle.innerText += ` ${nombre}, al carrito de compras`;
}



const botonesCarrito = ()=>{

    const contenedorProductos = document.querySelector(".productos");

    fetch(url)
    .then((r)=>r.json())
    .then((p)=>{
        p.forEach((monitor)=>{

            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
            <img src=${monitor.imagen} style="height:120px; object-fit:cover">
            <h4 class="modelo">${monitor.modelo}</h4>
            <h4 class="precio">$${monitor.precio}</h4>
            <button id="agregar${monitor.id}">Agregar producto</button>
            <button id="eliminar${monitor.id}">Eliminar producto</button>`;
            contenedorProductos.appendChild(div);
    
            const botonAgregar = document.querySelector(`#agregar${monitor.id}`);
    
            const botonEliminar = document.querySelector(`#eliminar${monitor.id}`);
    
            botonAgregar.addEventListener("click", ()=>{
                
                agregarAlCarrito(monitor.id);
                actualizarNumeroCarrito();
                Toastify({
                    text:"El producto fue agregado con éxito!",
                    duration:3000,
                    position:"left",
                }).showToast();
            })
    
            botonEliminar.addEventListener("click", () => {
    
                eliminarDelCarrito(monitor.id)
                actualizarNumeroCarrito();
            })
        })
    });

    
}

const agregarAlCarrito = (prodId)=>{
    fetch(url)
    .then((r)=>r.json())
    .then((p)=>{

        const existe = prods.some (prod => prod.id === prodId);
        if(existe){

            const prod = prods.map(prod => {

                if(prod.id === prodId){
                    
                    prod.cantidad++
                }
            })
        }
        else{
            let item = p.find((prod) => prod.id === prodId);
            miCarrito.addProducto(item);
        }
    });
    actualizarCarrito();
    
}

const actualizarCarrito = ()=>{

    let contenedor = document.getElementById("carritoDeCompras");
    contenedor.innerHTML = "";

    prods.forEach(monitor=>{

        let nodoLi = document.createElement("div");
        nodoLi.innerHTML = `${monitor.modelo} - $${monitor.precio} - Cantidad:${monitor.cantidad}`
        contenedor.appendChild(nodoLi);
    })
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

function init(){
    actualizarCarrito();
    actualizarNumeroCarrito()
    // darBienvenida();
    botonesCarrito();
    // calcularPrecioCuotas();
}

init();
