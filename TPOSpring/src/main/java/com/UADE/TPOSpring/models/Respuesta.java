package com.UADE.TPOSpring.models;

public class Respuesta {
	private Boolean estado;
	private String mensaje;
	private String datos;

	public Boolean getEstado() {
		return estado;
	}

	public void setEstado(Boolean status) {
		this.estado = status;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String message) {
		this.mensaje = message;
	}

	public String getDatos() {
		return datos;
	}

	public void setDatos(String data) {
		this.datos = data;
	}

}
