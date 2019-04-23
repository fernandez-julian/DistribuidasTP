package controlador;

import java.util.ArrayList;
import java.util.List;

import daos.ClienteDAO;
import daos.ProductoDAO;
import daos.RubroDao;
import daos.SubRubroDao;
import daos.UsuarioDAO;
import exceptions.CambioPasswordException;
import exceptions.ClienteException;
import exceptions.LoginException;
import exceptions.RubroException;
import negocio.Cliente;
import negocio.Producto;
import negocio.Rubro;
import negocio.SubRubro;
import negocio.Usuario;
import view.ClienteView;
import view.ProductoView;
import view.RubroView;
import view.SubRubroView;

public class Controlador {
	
	private static Controlador instancia;
	
	private Controlador(){ }
	
	public static Controlador getInstancia(){
		if(instancia == null)
			instancia = new Controlador();
		return instancia;
	}

	/**
	 * Verifica el login y el password ingresado, si son incorrecto lanza un LoginException
	 * 
	 * Si el password tiene mas de x d�as lanza un CambioPasswordException indicando que la password est� vencida
	 * 
	 * */
	public boolean login(String nombre, String password) throws LoginException, CambioPasswordException{
		Usuario usuario = UsuarioDAO.getInstancia().getUsuarioByNombre(nombre);
		if(usuario.getPassword().equals(password)){
			if(usuario.debeCambiar()) {
				throw new CambioPasswordException("La password esta vencida, debe cambiarla");
			}
			return true;
		}
		else{
			throw new LoginException("Los datos ingresado no son corrector, reingrese");
		}
	}
	
	public void cambioPassword(String nombre, String password) throws CambioPasswordException{
		Usuario usuario = UsuarioDAO.getInstancia().getUsuarioByNombre(nombre);
		usuario.actualizoPassword(password);
	}
	
	public void altaProducto(ProductoView recibido) throws RubroException{
		Rubro auxR = RubroDao.getInstancia().findByCodigo(recibido.getRubro().getCodigo());
		SubRubro auxSR = SubRubroDao.getInstancia().findByCodigo(recibido.getSubRubro().getCodigo());
		Producto producto = new Producto(auxSR,auxR,recibido.getNombre(), recibido.getMarca(), recibido.getCodigoBarras(), recibido.getPrecio());
		producto.save();
	}
	
	public void bajaProducto(ProductoView recibido){
		Producto producto = ProductoDAO.getInstancia().findProductoByIdentificador(recibido.getIdentificador());
		producto.delete();
		producto = null;
	}
	
	public void modificaProducto(ProductoView recibido){
		Producto producto = ProductoDAO.getInstancia().findProductoByIdentificador(recibido.getIdentificador());
		producto.update();
	}
	
	public int crearPedido(){
		return 0;
	}
	
	public void agregarProductoEnPedido(int numero){
		
	}
	
	public void eliminarPedido(int numero){
		
	}

	public void facturarPedido(int numero){
		
	}
	
	public List<RubroView> getRubros(){
		List<RubroView> resultado = new ArrayList<RubroView>();
		for(Rubro r : RubroDao.getInstancia().findAll())
			resultado.add(r.toView());
		return resultado;
	}
	
	public List<SubRubroView> getSubRubros(){
		List<SubRubroView> resultado = new ArrayList<SubRubroView>();
		for(SubRubro r : SubRubroDao.getInstancia().findAll())
			resultado.add(r.toView());
		return resultado;
	}
	
	public List<ProductoView> getProductos(){
		List<ProductoView> resultado = new ArrayList<ProductoView>();
		List<Producto> productos = ProductoDAO.getInstancia().findAll();
		for(Producto producto : productos)
			resultado.add(producto.toView());
		return resultado;
	}
	
	public List<ProductoView> getProductosByRubro(RubroView rubro){
		List<ProductoView> resultado = new ArrayList<ProductoView>();
		List<Producto> productos = ProductoDAO.getInstancia().findProductoByRubro(rubro.getCodigo());
		for(Producto producto : productos)
			resultado.add(producto.toView());
		return resultado;
	}
	
	public List<ProductoView> getProductosBySubRubro(SubRubroView subRubro){
		List<ProductoView> resultado = new ArrayList<ProductoView>();
		List<Producto> productos = ProductoDAO.getInstancia().findProductoBySubRubro(subRubro.getCodigo());
		for(Producto producto : productos)
			resultado.add(producto.toView());
		return resultado;
	}
	
	public List<ClienteView> getClientes(){
		List<ClienteView> resultado = new ArrayList<ClienteView>();
		List<Cliente> clientes = ClienteDAO.getInstancia().findAll();
		for(Cliente cliente : clientes)
			resultado.add(cliente.toView());
		return resultado;
	}
}
