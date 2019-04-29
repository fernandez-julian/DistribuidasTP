package com.UADE.TPOSpring.models;

public enum Mensaje {
	PRODUCTO_AGREGADO_EN_PEDIDO("El producto se agregó al pedido exitosamente"),
	PEDIDO_CREADO("El pedido fue creado exitosamente"), PRODUCTO_CREADO("El producto fue creado exitosamente"),
	ERROR("Se ha producido un error, intente nuevamente"), PRODUCTO_ELIMINADO("El producto fue eliminado exitosamente"),
	PRODUCTO_MODIFICADO("El producto fue modificado exitosamente"),  PEDIDO_FACTURADO("El pedido fue facturado exitosamente"), 
	CAMBIO_CONTRASENIA("El cambio de contrasenia se realizo correctamente"), PEDIDO_BY_ID_INEXISTENTE("El pedido solicitado no existe"),
	ELIMINAR_PEDIDO_INEXISTENTE("El pedido que desea eliminar no existe"), ELIMINAR_PEDIDO("El pedido se elimino exitosamente");;

	private String descripcion;

	private Mensaje(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getDescripcion() {
		return descripcion;
	}
}
