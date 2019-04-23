package test;

import java.util.List;

import daos.PedidoDAO;
import daos.ProductoDAO;
import negocio.ItemPedido;
import negocio.Pedido;
import negocio.Producto;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
/*		SubRubro r1 = SubRubroDao.getInstancia().findByCodigo(2);	
		System.out.println(r1.getDescripcion() + " "  + r1.getRubro().getDescripcion());
		List<SubRubro> rubros = SubRubroDao.getInstancia().findAll();
		for(SubRubro r : rubros)
			System.out.println(r.getDescripcion() + " " + r.getRubro().getDescripcion());*/
		
		
 
		//System.out.println(p.getNombre());
		List<Producto> ps =  ProductoDAO.getInstancia().findProductoByMarca("Coca-Cola");
		for(Producto pp : ps)
			System.out.println(pp.getCodigoBarras() + ":" + pp.getNombre() + " - " + pp.getRubro().getDescripcion());
		
		//Controlador.getInstancia().getRubros();
		//Controlador.getInstancia().getSubRubros();
/*		System.out.println(Controlador.getInstancia().getProductos().size());
		SubRubroView aux = new SubRubroView();
		aux.setCodigo(18);
		System.out.println(Controlador.getInstancia().getProductosBySubRubro(aux).size());*/
		
/*		Producto p  = ProductoDAO.getInstancia().findProductoByIdentificador(2450);
		System.out.println(p.getPrecio());
		p.setPrecio(1500.50f);
		p.update();
		p  = ProductoDAO.getInstancia().findProductoByIdentificador(2450);
		System.out.println(p.getPrecio());*/
/*		RubroView r1 = Controlador.getInstancia().getRubros().get(2);
		SubRubroView sr1 = Controlador.getInstancia().getSubRubros().get(2);
		ProductoView alta = new ProductoView(sr1, r1, "Chotaaaaiiii", "Chotto", "12345678912", 2345.67f);
		Controlador.getInstancia().altaProducto(alta);
		Producto p  = ProductoDAO.getInstancia().findProductoByIdentificador(2463);
		p.delete();*/
		//Usuario aux = UsuarioDAO.getInstancia().getUsuarioByNombre("User_01");
		//System.out.println(aux.getNombre() + " " + aux.getPassword());
		//try {
			//aux.deshabilitarUsario();

		//} catch (CambioPasswordException e) {
			//e.printStackTrace();
		//}
		//String[] lista = aux.getUltimasPasswords();
		//for(int i=0; i<aux.getCantidadPasswords(); i++)
			//System.out.println(lista[i]);
		
/*		try {
			//Controlador.getInstancia().login("User_01", "CacaMann2");
			Controlador.getInstancia().cambioPassword("User_04", "CambioNro01");
			System.out.println("Cambiado???");
		} catch (CambioPasswordException e) {
			// TODO Auto-generated catch block
			System.out.println(e.getMessage());
		}*/
		
		//System.out.println(Controlador.getInstancia().getClientes().size());
/*		try {
			System.out.println(ClienteDAO.getInstancia().findClienteByCuit("30-31374667-1").getNombre());
		} catch (ClienteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		
		/*Pedido p = PedidoDAO.getInstancia().findPedidoByNumero(1);
		Producto pr = ProductoDAO.getInstancia().findProductoByIdentificador(8);
		p.addProductoEnPedido(pr, 333);
		System.out.println(p.getCliente().getNombre());
		for(ItemPedido ip : p.getItems())
			System.out.println("\t" + ip.getProducto().getNombre());
		PedidoDAO.getInstancia().save(p);
		*/
	
	}

}
