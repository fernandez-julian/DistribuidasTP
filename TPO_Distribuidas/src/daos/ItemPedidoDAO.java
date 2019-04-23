package daos;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import entities.ItemPedidoEntity;
import entities.ProductoEntity;
import hibernate.HibernateUtil;
import negocio.ItemPedido;
import negocio.Producto;

public class ItemPedidoDAO {

	private static ItemPedidoDAO instancia;
	
	private ItemPedidoDAO() {}
	
	public static ItemPedidoDAO getInstancia(){
		if(instancia == null)
			instancia = new ItemPedidoDAO();
		return instancia;
	}
	
/*	public Producto findProductoByCodigo(String codigoBarras){
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		ProductoEntity recuperado = (ProductoEntity) s.createQuery("from ProductoEntity where codigoBarras = ?").setString(0, codigoBarras).uniqueResult();	
		return this.toNegocio(recuperado);
	}
	
	public Producto findProductoByIdentificador(int identificador) {
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		ProductoEntity recuperado = (ProductoEntity) s.createQuery("from ProductoEntity where identificador = ?").setInteger(0, identificador).uniqueResult();	
		return this.toNegocio(recuperado);
	}
	
	public List<Producto> findAll() {
		List<Producto> resultado = new ArrayList<Producto>();
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		List<ProductoEntity> recuperados = s.createQuery("from ProductoEntity").list();	
		for(ProductoEntity pe : recuperados)
			resultado.add(this.toNegocio(pe));
		return resultado;
	}
	
	public List<Producto> findProductoByRubro(int identificadorRubro){
		List<Producto> resultado = new ArrayList<Producto>();
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		List<ProductoEntity> recuperados = s.createQuery("from ProductoEntity where rubro.codigo = ?").setInteger(0, identificadorRubro).list();	
		for(ProductoEntity pe : recuperados)
			resultado.add(this.toNegocio(pe));
		return resultado;
	}

	public List<Producto> findProductoBySubRubro(int identificadorSubRubro){
		List<Producto> resultado = new ArrayList<Producto>();
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		List<ProductoEntity> recuperados = s.createQuery("from ProductoEntity where subRubro.codigo = ?").setInteger(0, identificadorSubRubro).list();	
		for(ProductoEntity pe : recuperados)
			resultado.add(this.toNegocio(pe));
		return resultado;
	}
	
	public List<Producto> findProductoByMarca(String marca){
		List<Producto> resultado = new ArrayList<Producto>();
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		List<ProductoEntity> recuperados = s.createQuery("from ProductoEntity where marca = ?").setString(0, marca).list();	
		for(ProductoEntity pe : recuperados)
			resultado.add(this.toNegocio(pe));
		return resultado;
	}
	
	public void save(Producto producto){ 
		ProductoEntity pe = this.toEntity(producto);
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		s.saveOrUpdate(pe);
		s.getTransaction().commit();
		producto.setIdentificador(pe.getIdentificador());
	}


	public void save(ItemPedido ip) {
		ItemPedidoEntity ipe = toEntity(ip);
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		s.saveOrUpdate(ipe);
		s.getTransaction().commit();
		
	}
	

	public void update(Producto producto) {
		ProductoEntity pe = this.toEntity(producto);
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		s.update(pe);
		s.getTransaction().commit();
	}

	public void delete(Producto producto) {
		ProductoEntity pe = this.toEntity(producto);
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		s.delete(pe);
		s.getTransaction().commit();
	}
*/	
	ItemPedido toNegocio(ItemPedidoEntity recuperado){
		Producto producto = ProductoDAO.getInstancia().findProductoByIdentificador(recuperado.getProducto().getIdentificador());
		ItemPedido aux = new ItemPedido(recuperado.getNumero(), producto, recuperado.getCantidad(), recuperado.getPrecio());
		return aux;	
	}
	
	ItemPedidoEntity toEntity(ItemPedido item) {
		ProductoEntity producto = ProductoDAO.getInstancia().toEntity(item.getProducto());
		ItemPedidoEntity aux = new ItemPedidoEntity(item.getNumero(), producto, item.getCantidad(), item.getPrecio());
		return aux;
	}


}
