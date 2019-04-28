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

	@RequestMapping(value = "/productos", method = RequestMethod.POST)
	public @ResponseBody String addProducto(@RequestBody String productoView) throws JsonProcessingException {
		ResponseObject response = new ResponseObject();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			ProductoRequestView producto = objectMapper.readValue(productoView, ProductoRequestView.class);
			Controlador.getInstancia().altaProducto(convertRequestObjectToView(producto));
			response.setStatus(true);
		} catch (RubroException e) {
			response.setStatus(false);
			response.setMessage(e.getMessage());
		} catch (IOException e) {
			response.setStatus(false);
			response.setMessage("Parametros faltantes o invalidos");
		}
		return objectMapper.writeValueAsString(response);
	}

	private ProductoView convertRequestObjectToView(ProductoRequestView producto) {
		ProductoView productoView = new ProductoView();
		productoView.setCodigoBarras(producto.getCodigoBarras());
		productoView.setMarca(producto.getMarca());
		productoView.setNombre(producto.getNombre());
		RubroView rubro = new RubroView();
		rubro.setCodigo(producto.getCodigoRubro());
		productoView.setRubro(rubro);
		SubRubroView subRubro = new SubRubroView();
		subRubro.setCodigo(producto.getCodigoSubRubro());
		productoView.setSubRubro(subRubro);
		productoView.setPrecio(producto.getPrecio());
		return productoView;
	}

	@RequestMapping(value = "/productos/{identificador}", method = RequestMethod.DELETE)
	public @ResponseBody String bajaProducto(@PathVariable(value = "identificador") int identificadorProducto)
			throws JsonProcessingException {
		ResponseObject response = new ResponseObject();
		ObjectMapper objectMapper = new ObjectMapper();
		ProductoView producto = new ProductoView();
		producto.setIdentificador(identificadorProducto);
		Controlador.getInstancia().bajaProducto(producto);
		response.setStatus(true);
		return objectMapper.writeValueAsString(response);
	}

	@RequestMapping(value = "/productos/{identificador}", method = RequestMethod.PUT)
	public @ResponseBody String modificarProducto(@PathVariable(value = "identificador") int identificadorProducto)
			throws JsonProcessingException {
		ResponseObject response = new ResponseObject();
		ObjectMapper objectMapper = new ObjectMapper();
		ProductoView producto = new ProductoView();
		producto.setIdentificador(identificadorProducto);
		Controlador.getInstancia().modificaProducto(producto);
		response.setStatus(true);
		return objectMapper.writeValueAsString(response);
	}
	
}
