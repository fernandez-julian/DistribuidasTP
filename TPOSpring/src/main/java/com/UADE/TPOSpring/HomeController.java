package com.UADE.TPOSpring;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.UADE.TPOSpring.models.Mensaje;
import com.UADE.TPOSpring.models.ProductoRequestView;
import com.UADE.TPOSpring.models.Respuesta;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import controlador.Controlador;
import exceptions.CambioPasswordException;
import exceptions.ClienteException;
import exceptions.LoginException;
import exceptions.PedidoException;
import exceptions.ProductoException;
import exceptions.RubroException;
import exceptions.SubRubroException;
import exceptions.UsuarioException;
import view.ClienteView;
import view.PedidoView;
import view.ProductoView;
import view.RubroView;
import view.SubRubroView;

@Controller
public class HomeController
{

    @RequestMapping( value = "/login", method = RequestMethod.POST, produces = "application/json", consumes = "application/json" )
    @ResponseBody
    public String login( @RequestBody String json )
        throws JsonProcessingException, JsonMappingException, IOException
    {
        ObjectMapper mapper = new ObjectMapper();
        Respuesta respuesta = new Respuesta();
        Map<String, Object> auxiliar = mapper.readValue( json, Map.class );
        String nombre = (String) auxiliar.get( "nombre" );
        String clave = (String) auxiliar.get( "clave" );
        try
        {
            Controlador.getInstancia().login( nombre, clave );
            respuesta.setMensaje( Mensaje.LOGIN_EXITOSO.getDescripcion() );
            respuesta.setEstado( true );
        }
        catch ( LoginException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( e.getMessage() );
        }
        catch ( CambioPasswordException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( e.getMessage() );
        }
        return mapper.writeValueAsString( respuesta );

    }

    @RequestMapping( value = "/changePassWord", method = RequestMethod.POST, produces = "application/json", consumes = "application/json" )
    @ResponseBody
    public String changePassWord( @RequestBody String json )
        throws JsonProcessingException, JsonMappingException, IOException
    {
        ObjectMapper mapper = new ObjectMapper();
        Respuesta respuesta = new Respuesta();
        Map<String, Object> auxiliar = mapper.readValue( json, Map.class );
        String nombre = (String) auxiliar.get( "nombre" );
        String clave = (String) auxiliar.get( "clave" );
        try
        {
            Controlador.getInstancia().cambioPassword( nombre, clave );
            respuesta.setMensaje( Mensaje.CAMBIO_CONTRASENIA.getDescripcion() );
            respuesta.setEstado( true );
        }
        catch ( CambioPasswordException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( e.getMessage() );
        }
        catch ( UsuarioException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( e.getMessage() );
        }

        return mapper.writeValueAsString( respuesta );

    }

    @RequestMapping( value = "/allClientes", method = RequestMethod.GET, produces = "application/json" )
    public @ResponseBody String allClientes()
        throws JsonProcessingException
    {
        Respuesta respuesta = new Respuesta();
        ObjectMapper mapper = new ObjectMapper();
        List<ClienteView> cv = null;
        cv = Controlador.getInstancia().getClientes();
        respuesta.setDatos( mapper.writeValueAsString( cv ) );
        respuesta.setEstado( true );
        return mapper.writeValueAsString( respuesta );
    }

    @RequestMapping( value = "/allProductos", method = RequestMethod.GET, produces = "application/json" )
    public @ResponseBody String allProductos()
        throws JsonProcessingException
    {
        Respuesta respuesta = new Respuesta();
        ObjectMapper mapper = new ObjectMapper();
        List<ProductoView> pv = null;
        pv = Controlador.getInstancia().getProductos();
        respuesta.setDatos( mapper.writeValueAsString( pv ) );
        respuesta.setEstado( true );
        return mapper.writeValueAsString( respuesta );
    }

    @RequestMapping( value = "/productos/nuevo", method = RequestMethod.POST, produces = "application/json", consumes = "application/json" )
    public @ResponseBody String addProducto( @RequestBody String productoView )
        throws JsonProcessingException
    {
        Respuesta respuesta = new Respuesta();
        ObjectMapper objectMapper = new ObjectMapper();
        try
        {
            ProductoRequestView producto = objectMapper.readValue( productoView, ProductoRequestView.class );
            Controlador.getInstancia().altaProducto( convertRequestObjectToView( producto ) );
            respuesta.setEstado( true );
            respuesta.setMensaje( Mensaje.PRODUCTO_CREADO.getDescripcion() );
        }
        catch ( RubroException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( e.getMessage() );
        }
        catch ( SubRubroException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( e.getMessage() );
        }
        catch ( IOException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( Mensaje.DATOS_INVALIDOS.getDescripcion() );
        }
        return objectMapper.writeValueAsString( respuesta );
    }

    private ProductoView convertRequestObjectToView( ProductoRequestView producto )
    {
        RubroView rubro = new RubroView();
        rubro.setCodigo( producto.getCodigoRubro() );
        SubRubroView subRubro = new SubRubroView();
        subRubro.setCodigo( producto.getCodigoSubRubro() );
        return new ProductoView( subRubro, rubro, producto.getNombre(), producto.getMarca(), producto.getCodigoBarras(),
                                 producto.getPrecio() );
    }

    @RequestMapping( value = "/allProductosByRubro", method = RequestMethod.GET, produces = "application/json" )
    public @ResponseBody String allProductosByRubro( @RequestParam( value = "codigo", required = true ) int codigo )
        throws IOException
    {
        Respuesta respuesta = new Respuesta();
        ObjectMapper mapper = new ObjectMapper();
        List<ProductoView> productos = null;
        RubroView rv = new RubroView();
        rv.setCodigo( codigo );
        productos = Controlador.getInstancia().getProductosByRubro( rv );
        respuesta.setDatos( mapper.writeValueAsString( productos ) );
        respuesta.setEstado( true );
        return mapper.writeValueAsString( respuesta );
    }

    @RequestMapping( value = "/allProductosBySubRubro", method = RequestMethod.GET, produces = "application/json" )
    public @ResponseBody String allProductosBySubRubro( @RequestParam( value = "codigo", required = true ) int codigo )
        throws IOException
    {
        Respuesta respuesta = new Respuesta();
        ObjectMapper mapper = new ObjectMapper();
        List<ProductoView> productos = null;
        SubRubroView srv = new SubRubroView();
        srv.setCodigo( codigo );
        productos = Controlador.getInstancia().getProductosBySubRubro( srv );
        respuesta.setDatos( mapper.writeValueAsString( productos ) );
        respuesta.setEstado( true );
        return mapper.writeValueAsString( respuesta );
    }

    @RequestMapping( value = "/productos/eliminar", method = RequestMethod.POST, produces = "application/json" )
    public @ResponseBody String bajaProducto( @RequestParam( value = "idProducto", required = true ) int idProducto )
        throws JsonProcessingException
    {
        Respuesta respuesta = new Respuesta();
        ObjectMapper objectMapper = new ObjectMapper();
        ProductoView producto = new ProductoView( null, null, null, null, null, 0 );
        producto.setIdentificador( idProducto );
        try
        {
            Controlador.getInstancia().bajaProducto( producto );
            respuesta.setMensaje( Mensaje.PRODUCTO_ELIMINADO.getDescripcion() );
            respuesta.setEstado( true );
        }
        catch ( ProductoException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( e.getMessage() );
        }
        return objectMapper.writeValueAsString( respuesta );
    }

       @RequestMapping( value = "/productos/modificar", method = RequestMethod.POST, produces = "application/json" )
	   public @ResponseBody String modificarProducto( @RequestParam( value = "idProducto", required = true ) int idProducto, @RequestParam( value = "precio", required = true ) float precio )
	        throws JsonProcessingException
	    {
	        Respuesta respuesta = new Respuesta();
	        ObjectMapper objectMapper = new ObjectMapper();
	        ProductoView producto = new ProductoView( null, null, null, null, null, precio );
	        producto.setIdentificador( idProducto );
	        try
	        {
	            Controlador.getInstancia().modificaProducto( producto );
	            respuesta.setMensaje( Mensaje.PRODUCTO_MODIFICADO.getDescripcion() );
	            respuesta.setEstado( true );
	        }
	        catch ( ProductoException e )
	        {
	            respuesta.setEstado( false );
	            respuesta.setMensaje( e.getMessage() );
	        }
	        return objectMapper.writeValueAsString( respuesta );
	    }

    @RequestMapping( value = "/pedidos/{nroPedido}/productos", method = RequestMethod.POST, produces = "application/json" )
    public @ResponseBody String agregarProductosEnPedido( @PathVariable( value = "nroPedido" ) int nroPedido,
                                                          @RequestParam( value = "idProducto", required = true ) int idProducto,
                                                          @RequestParam( value = "cantidad", required = true ) int cantidad )
        throws JsonProcessingException
    {
        Respuesta respuesta = new Respuesta();
        ObjectMapper objectMapper = new ObjectMapper();
        try
        {
            Controlador.getInstancia().agregarProductoEnPedido( nroPedido, idProducto, cantidad );
            respuesta.setEstado( true );
            respuesta.setMensaje( Mensaje.PRODUCTO_AGREGADO_EN_PEDIDO.getDescripcion() );
        }
        catch ( PedidoException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( e.getMessage() );
        }
        catch ( ProductoException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( e.getMessage() );
        }
        return objectMapper.writeValueAsString( respuesta );
    }

    @RequestMapping( value = "/pedidos", method = RequestMethod.POST, produces = "application/json" )
    public @ResponseBody String crearPedido( @RequestParam( value = "cuit", required = true ) String cuit )
        throws JsonProcessingException
    {
        Respuesta respuesta = new Respuesta();
        ObjectMapper objectMapper = new ObjectMapper();
        try
        {
            Map<String, Integer> datos = new HashMap<String, Integer>();
            datos.put( "nroPedido", Controlador.getInstancia().crearPedido( cuit ) );
            respuesta.setDatos( objectMapper.writeValueAsString( datos ) );
            respuesta.setEstado( true );
            respuesta.setMensaje( Mensaje.PEDIDO_CREADO.getDescripcion() );
        }
        catch ( ClienteException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( e.getMessage() );
        }
        return objectMapper.writeValueAsString( respuesta );
    }

    @RequestMapping( value = "/facturarPedido", method = RequestMethod.POST, produces = "application/json", consumes = "application/json" )
    @ResponseBody
    public String facturarPedido( @RequestParam( value = "numero", required = true ) int numero )
        throws JsonParseException, JsonMappingException, IOException
    {
        ObjectMapper mapper = new ObjectMapper();
        Respuesta respuesta = new Respuesta();
        try
        {
            Controlador.getInstancia().facturarPedido( numero );
            respuesta.setMensaje( Mensaje.PEDIDO_FACTURADO.getDescripcion() );
            respuesta.setEstado( true );
        }
        catch ( PedidoException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( e.getMessage() );
        }
        return mapper.writeValueAsString( respuesta );
    }

    @RequestMapping( value = "/allRubros", method = RequestMethod.GET, produces = "application/json" )
    public @ResponseBody String allRubros()
        throws JsonProcessingException
    {
        Respuesta respuesta = new Respuesta();
        ObjectMapper mapper = new ObjectMapper();
        List<RubroView> rubros = null;
        rubros = Controlador.getInstancia().getRubros();
        respuesta.setDatos( mapper.writeValueAsString( rubros ) );
        respuesta.setEstado( true );
        return mapper.writeValueAsString( respuesta );
    }

    @RequestMapping( value = "/allSubRubros", method = RequestMethod.GET, produces = "application/json" )
    public @ResponseBody String allSubRubros()
        throws JsonProcessingException
    {
        Respuesta respuesta = new Respuesta();
        ObjectMapper mapper = new ObjectMapper();
        List<SubRubroView> subRubros = null;
        subRubros = Controlador.getInstancia().getSubRubros();
        respuesta.setDatos( mapper.writeValueAsString( subRubros ) );
        respuesta.setEstado( true );
        return mapper.writeValueAsString( respuesta );
    }

    @RequestMapping( value = "/allPedidoById", method = RequestMethod.GET, produces = "application/json" )
    public @ResponseBody String allPedidosById( @RequestParam( value = "numero", required = true ) int numero )
        throws IOException
    {
        ObjectMapper mapper = new ObjectMapper();
        Respuesta respuesta = new Respuesta();
        PedidoView pedidos = null;
        try
        {
            pedidos = Controlador.getInstancia().getPedidoById( numero );
            respuesta.setEstado( true );
            respuesta.setDatos( mapper.writeValueAsString( pedidos ) );
        }
        catch ( PedidoException e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( Mensaje.PEDIDO_BY_ID_INEXISTENTE.getDescripcion() );
        }
        return mapper.writeValueAsString( respuesta );
    }

    @RequestMapping( value = "/deletePedidoById", method = RequestMethod.POST, produces = "application/json" )
    public @ResponseBody String deletePedidoById( @RequestParam( value = "numero", required = true ) int numero )
        throws IOException
    {
        Respuesta respuesta = new Respuesta();
        ObjectMapper mapper = new ObjectMapper();
        try
        {
            Controlador.getInstancia().eliminarPedido( numero );
            respuesta.setEstado( true );
            respuesta.setMensaje( Mensaje.ELIMINAR_PEDIDO.getDescripcion() );
        }
        catch ( Exception e )
        {
            respuesta.setEstado( false );
            respuesta.setMensaje( Mensaje.ELIMINAR_PEDIDO_INEXISTENTE.getDescripcion() );
        }
        return mapper.writeValueAsString( respuesta );
    }

}
