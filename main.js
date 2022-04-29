let cantidadCuotas = 0;
let totalCuotas = 0;
let art = 0;
const iconoCarrito = document.querySelector(".contadorCarrito");
let [id1,id2,id3,id4] = monitores;
let {precio:precio1} = id1;
let {precio:precio2} = id2;
let {precio:precio3} = id3;
let {precio:precio4} = id4;
const data = JSON.parse(localStorage.getItem("MI_CARRITO"));
let miCarrito = new Carrito([]);
if(!miCarrito){

    miCarrito = new Carrito([]);
}
else{

    miCarrito = new Carrito(data);
}


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

    monitores.forEach((monitor)=>{

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img src=${monitor.imagen} style="height:120px; object-fit:cover">
        <h4>${monitor.modelo}</h4>
        <button id="agregar${monitor.id}">Agregar producto</button>`;
        contenedorProductos.appendChild(div);

        const boton = document.querySelector(`#agregar${monitor.id}`);

        boton.addEventListener("click", ()=>{
            
            agregarAlCarrito(monitor.id);
            actualizarNumeroCarrito();
            swal.fire({
                title:"Su producto ha sido agregado correctamente",
                icon:"success"
            })
        })
    })
}

const agregarAlCarrito = (prodId)=>{

    let item = monitores.find((prod) => prod.id === prodId);
    miCarrito.addProducto(item);
    actualizarCarrito();
    

}

const actualizarCarrito = ()=>{

    let contenedor = document.getElementById("carritoDeCompras");
    contenedor.innerHTML = "";

    let prods = miCarrito.productos;
    prods.forEach(monitor=>{

        let nodoLi = document.createElement("div");
        nodoLi.innerHTML = `${monitor.modelo} - $${monitor.precio}`;
        contenedor.appendChild(nodoLi);
    })
    miCarrito.guardar();
}

const actualizarNumeroCarrito = ()=>{

    iconoCarrito.innerHTML = `${miCarrito.productos.length}`
}


function init(){
    // darBienvenida();
    botonesCarrito();
    // calcularPrecioCuotas();
}

init();
