package ar.edu.uade.models;

public enum Mensaje {
	PRODUCTO_AGREGADO_EN_PEDIDO("El producto se agregó al pedido exitosamente"),
	PEDIDO_CREADO("El pedido fue creado exitosamente"), PRODUCTO_CREADO("El producto fue creado exitosamente"),
	ERROR("Se ha producido un error, intente nuevamente"), PRODUCTO_ELIMINADO("El producto fue eliminado exitosamente"),
	PRODUCTO_MODIFICADO("El producto fue modificado exitosamente");

	private String descripcion;

	private Mensaje(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getDescripcion() {
		return descripcion;
	}
}
