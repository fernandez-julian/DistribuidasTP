package daos;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;

import entities.ClienteEntity;
import entities.ItemPedidoEntity;
import entities.PedidoEntity;
import hibernate.HibernateUtil;
import negocio.Cliente;
import negocio.ItemPedido;
import negocio.Pedido;
import negocio.Producto;

public class PedidoDAO {
	
	private static PedidoDAO instancia;
	
	private PedidoDAO() {}
	
	public static PedidoDAO getInstancia(){
		if(instancia == null)
			instancia = new PedidoDAO();
		return instancia;
	}
	
	public Pedido findPedidoByNumero(int numero){
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		PedidoEntity recuperado = (PedidoEntity) s.createQuery("from PedidoEntity where numeroPedido = ?").setInteger(0, numero).uniqueResult();	
		s.getTransaction().commit();
		return this.toNegocio(recuperado);
	}
	
	public List<Pedido> findPedidoByCliente(Cliente cliente){
		return null;
	}
	
	public List<Pedido> findPedidoByEstado(String estado){
		return null;
	}
	
	public void save(Pedido pedido){
		PedidoEntity aux = this.toEntity(pedido);
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		s.saveOrUpdate(aux);	
	}
	
	public void updatePedido(Pedido pedido){
		
	}
	
	public void addProductoToPedido(Pedido pedido, Producto producto){
		
	}
	
	Pedido toNegocio(PedidoEntity pe){
		Cliente cliente = ClienteDAO.getInstancia().toNegocio(pe.getCliente());
		Pedido pedido = new Pedido(pe.getNumeroPedido(), cliente, pe.getFechaPedido(), pe.getEstado());
		List<ItemPedidoEntity> auxItems = pe.getItems();
		for(ItemPedidoEntity ipe : auxItems){
			Producto producto = ProductoDAO.getInstancia().toNegocio(ipe.getProducto());
			pedido.addProductoEnPedido(ipe.getNumero(), producto, ipe.getCantidad(), ipe.getPrecio());
		}
		return pedido;
	}
	
	PedidoEntity toEntity(Pedido p){
		PedidoEntity pedido = new PedidoEntity();
		ClienteEntity cliente = ClienteDAO.getInstancia().toEntity(p.getCliente());
		pedido.setCliente(cliente);
		pedido.setEstado(p.getEstado());
		pedido.setFechaPedido((java.sql.Date)p.getFechaPedido());
		pedido.setNumeroPedido(pedido.getNumeroPedido());
		List<ItemPedido> lista = p.getItems();
		List<ItemPedidoEntity> items = new ArrayList<ItemPedidoEntity>();
		for(ItemPedido ip : lista)
			items.add(ItemPedidoDAO.getInstancia().toEntity(ip));
		pedido.setItems(items);
		return pedido;
	}
}
