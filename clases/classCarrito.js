class Carrito {
  constructor(productos) {
    this.productos = productos;
  }

  addProducto(producto) {
    this.productos.push(producto);
  }

  guardar() {
    localStorage.setItem("MI_CARRITO", JSON.stringify(this.productos));
  }
}
