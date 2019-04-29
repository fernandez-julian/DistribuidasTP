package com.UADE.TPOSpring;

import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import controlador.Controlador;
import exceptions.CambioPasswordException;
import exceptions.LoginException;
import view.ClienteView;
import view.ProductoView;
import view.SubRubroView;



/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}

	@RequestMapping(value = "/allProductos", method = RequestMethod.GET)
	public @ResponseBody String allProductos() throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		List<ProductoView> pv = null;
		try {
			pv = Controlador.getInstancia().getProductos();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return mapper.writeValueAsString(pv);
	}
	
	@RequestMapping(value = "/allClientes", method = RequestMethod.GET)
	public @ResponseBody String allClientes() throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		List<ClienteView> cv = null;
		try {
			cv = Controlador.getInstancia().getClientes();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return mapper.writeValueAsString(cv);
	}

	
	@RequestMapping(value = "/changePassWord", method = RequestMethod.POST, produces="application/json", consumes="application/json")
	@ResponseBody
	public String changePassWord(@RequestBody String json) throws JsonProcessingException, JsonMappingException, IOException {
	    ObjectMapper mapper = new ObjectMapper();
	    Map<String, Object> auxiliar = mapper.readValue(json, Map.class);
	    String nombre = (String) auxiliar.get("nombre");
	    String clave = (String) auxiliar.get("clave");
	    try {
			Controlador.getInstancia().cambioPassword(nombre, clave);
		} catch (CambioPasswordException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    return null;

	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST, produces="application/json", consumes="application/json")
	@ResponseBody
	public String login(@RequestBody String json) throws JsonProcessingException, JsonMappingException, IOException {
	    ObjectMapper mapper = new ObjectMapper();
	    Map<String, Object> auxiliar = mapper.readValue(json, Map.class);
	    String nombre = (String) auxiliar.get("nombre");
	    String clave = (String) auxiliar.get("clave");
	    try {
			Controlador.getInstancia().login(nombre, clave);
		} catch (LoginException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (CambioPasswordException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    return null;

	}

	@RequestMapping(value = "/productos/nuevo", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	public @ResponseBody String addProducto(@RequestBody String productoView) throws JsonProcessingException {
		Respuesta respuesta = new Respuesta();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			ProductoRequestView producto = objectMapper.readValue(productoView, ProductoRequestView.class);
			Controlador.getInstancia().altaProducto(convertRequestObjectToView(producto));
			respuesta.setEstado(true);
			respuesta.setMensaje(Mensaje.PRODUCTO_CREADO.getDescripcion());
		} catch (RubroException e) {
			respuesta.setEstado(false);
			respuesta.setMensaje(e.getMessage());
		} catch (SubRubroException e) {
			respuesta.setEstado(false);
			respuesta.setMensaje(e.getMessage());
		} catch (IOException e) {
			respuesta.setEstado(false);
			respuesta.setMensaje("Parametros faltantes o invalidos");
		}
		return objectMapper.writeValueAsString(respuesta);
	}

	private ProductoView convertRequestObjectToView(ProductoRequestView producto) {
		RubroView rubro = new RubroView();
		rubro.setCodigo(producto.getCodigoRubro());
		SubRubroView subRubro = new SubRubroView();
		subRubro.setCodigo(producto.getCodigoSubRubro());
		ProductoView productoView = new ProductoView(subRubro, rubro, producto.getNombre(), producto.getMarca(),
				producto.getCodigoBarras(), producto.getPrecio());
		;
		return productoView;
	}

	@RequestMapping(value = "/productos", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody String getProductos() throws JsonProcessingException {
		Respuesta respuesta = new Respuesta();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			respuesta.setDatos(objectMapper.writeValueAsString(Controlador.getInstancia().getProductos()));
			respuesta.setEstado(true);
			return objectMapper.writeValueAsString(respuesta);
		} catch (JsonProcessingException e) {
			respuesta.setEstado(false);
			respuesta.setMensaje(Mensaje.ERROR.getDescripcion());
			return objectMapper.writeValueAsString(respuesta);
		}
	}

	@RequestMapping(value = "/productos/{identificador}", method = RequestMethod.POST, produces = "application/json")
	public @ResponseBody String bajaProducto(@PathVariable(value = "identificador") int identificadorProducto)
			throws JsonProcessingException {
		Respuesta respuesta = new Respuesta();
		ObjectMapper objectMapper = new ObjectMapper();
		ProductoView producto = new ProductoView(null, null, null, null, null, 0);
		producto.setIdentificador(identificadorProducto);
		try {
			Controlador.getInstancia().bajaProducto(producto);
			respuesta.setMensaje(Mensaje.PRODUCTO_ELIMINADO.getDescripcion());
			respuesta.setEstado(true);
		} catch (ProductoException e) {
			respuesta.setEstado(false);
			respuesta.setMensaje(e.getMessage());
		}
		return objectMapper.writeValueAsString(respuesta);
	}

	@RequestMapping(value = "/productos/{identificador}", method = RequestMethod.PUT, produces = "application/json", consumes = "application/json")
	public @ResponseBody String modificarProducto(@PathVariable(value = "identificador") int identificadorProducto)
			throws JsonProcessingException {
		Respuesta respuesta = new Respuesta();
		ObjectMapper objectMapper = new ObjectMapper();
		ProductoView producto = new ProductoView(null, null, null, null, null, 0);
		producto.setIdentificador(identificadorProducto);
		try {
			Controlador.getInstancia().modificaProducto(producto);
			respuesta.setMensaje(Mensaje.PRODUCTO_MODIFICADO.getDescripcion());
			respuesta.setEstado(true);
		} catch (ProductoException e) {
			respuesta.setEstado(false);
			respuesta.setMensaje(e.getMessage());
		}
		return objectMapper.writeValueAsString(respuesta);
	}

	@RequestMapping(value = "/pedidos/{nroPedido}/productos", method = RequestMethod.POST, produces = "application/json")
	public @ResponseBody String agregarProductosEnPedido(@PathVariable(value = "nroPedido") int nroPedido,
			@RequestParam int idProducto, @RequestParam int cantidad) throws JsonProcessingException {
		Respuesta respuesta = new Respuesta();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			Controlador.getInstancia().agregarProductoEnPedido(nroPedido, idProducto, cantidad);
			respuesta.setEstado(true);
			respuesta.setMensaje(Mensaje.PRODUCTO_AGREGADO_EN_PEDIDO.getDescripcion());
		} catch (PedidoException e) {
			respuesta.setEstado(false);
			respuesta.setMensaje(e.getMessage());
		} catch (ProductoException e) {
			respuesta.setEstado(false);
			respuesta.setMensaje(e.getMessage());
		}
		return objectMapper.writeValueAsString(respuesta);
	}

	@RequestMapping(value = "/pedidos", method = RequestMethod.POST, produces = "application/json")
	public @ResponseBody String crearPedido(@RequestParam String cuit) throws JsonProcessingException {
		Respuesta respuesta = new Respuesta();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			Map<String, Integer> datos = new HashMap<>();
			datos.put("nroPedido", Controlador.getInstancia().crearPedido(cuit));
			respuesta.setDatos(objectMapper.writeValueAsString(datos));
			respuesta.setEstado(true);
			respuesta.setMensaje(Mensaje.PEDIDO_CREADO.getDescripcion());
		} catch (ClienteException e) {
			respuesta.setEstado(false);
			respuesta.setMensaje(e.getMessage());
		}
		return objectMapper.writeValueAsString(respuesta);
	}	
}
