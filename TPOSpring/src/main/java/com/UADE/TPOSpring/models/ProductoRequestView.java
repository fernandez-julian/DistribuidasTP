package com.UADE.TPOSpring.models;

public class ProductoRequestView {
	private int codigoSubRubro;
	private int codigoRubro;
	private String nombre;
	private String marca;
	private String codigoBarras;
	private float precio;

	public ProductoRequestView() {
		super();

	}

	public ProductoRequestView(int codigoSubRubro, int codigoRubro, String nombre, String marca, String codigoBarras,
			float precio) {
		super();
		this.codigoSubRubro = codigoSubRubro;
		this.codigoRubro = codigoRubro;
		this.nombre = nombre;
		this.marca = marca;
		this.codigoBarras = codigoBarras;
		this.precio = precio;
	}

	public int getCodigoSubRubro() {
		return codigoSubRubro;
	}

	public void setCodigoSubRubro(int codigoSubRubro) {
		this.codigoSubRubro = codigoSubRubro;
	}

	public int getCodigoRubro() {
		return codigoRubro;
	}

	public void setCodigoRubro(int codigoRubro) {
		this.codigoRubro = codigoRubro;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getCodigoBarras() {
		return codigoBarras;
	}

	public void setCodigoBarras(String codigoBarras) {
		this.codigoBarras = codigoBarras;
	}

	public float getPrecio() {
		return precio;
	}

	public void setPrecio(float precio) {
		this.precio = precio;
	}

}
