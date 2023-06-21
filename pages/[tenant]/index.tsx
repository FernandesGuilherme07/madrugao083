import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Banner } from '../../components/Banner';
import { ProductItem } from '../../components/ProductItem';
import { SearchInput } from '../../components/SearchInput';
import { Sidebar } from '../../components/Sidebar';
import { useAppContext } from '../../contexts/app';
import { frontApi } from '../../libs/frontApi';
import styles from '../../styles/Home.module.css';
import { Product } from '../../types/Product';
import { Tenant } from '../../types/Tenant';
import { getCookie } from 'cookies-next';
import { User } from '../../types/User';
import { useAuthContext } from '../../contexts/auth';
import NoItemsIcon from '../../public/assets/noitems.svg';
import { CartItem } from '../../types/CartItem';
import Image from 'next/image';
import { url } from 'inspector';
import { URL } from 'url';

const Home = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  const [products, setProducts] = useState<Product[]>(data.products);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  function verificarStatusLanchonete(): boolean {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Domingo, 1 = Segunda-feira, ...
  
    const isOpen = currentHour >= 22 || currentHour < 4;
    const isWeekday = currentDay >= 2 && currentDay <= 6; // 2 = Terça-feira, 6 = Sábado
  
    if (isOpen && isWeekday) {
      return true;
    } else {
      return false;
    }
  }
  
  const status = verificarStatusLanchonete();
  console.log(status);

  const router = useRouter();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) {
      setUser(data.user);
    }
  }, [])

  useEffect(() => {
    let newFilteredProducts: Product[] = [];
    for(let product of data.products) {
      if(product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        newFilteredProducts.push(product);
      }
    }
    setFilteredProducts(newFilteredProducts)
  },[searchText])

  const handleSearch = (value: string) => setSearchText(value)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLogo}>
            <img
            width={80}
            src="/temp/AVATAR.png"
            alt="Logo da hmaburgueria MAdrugão083" 
            />
          
          <div className={styles.headerTopLeft}>
            <div className={styles.headerTitle}>Seja Bem Vindo (a) 👋</div>
            {verificarStatusLanchonete() ? (
            <div className={styles.headerSubtitle}>O que deseja pra hoje?</div>
            ) : (
              <div className={styles.headerSubtitle}>Hamburgueria Fechada!</div>
            )}
          </div>
        </div>
            <div className={styles.headerTopRight}>
          
                <button
                    type="button"
                    className={styles.cartButton}
                    onClick={() => router.push(`/${data.tenant.slug}/cart`)}
                  >
                    <AiOutlineShoppingCart width={30}/>
                    { data.cart?.length > 0 && <span  className={styles.cartStatus}>{data.cart.length}</span> }
                  </button>
              
            
            </div>
        </div>
        <div className={styles.headerBottom}>
          <SearchInput onSearch={handleSearch} />
        </div>
      </header>
      <div className={styles.gridContent}>
      <main  className={styles.gridContainer}>
         {searchText && 
        <>
          <div className={styles.searchText}>
            Procurando por: <strong>{searchText}</strong>
          </div>

          {filteredProducts.length > 0 &&
            <div className={styles.grid}>
              {filteredProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  data={item}
                />
              ))}
            </div>
          }

          
          {filteredProducts.length === 0 &&
            <div className={styles.noProducts}>
              <NoItemsIcon color="#E0E0E0" />
              <div className={styles.noProductsText}>Ops! Não há itens com este nome</div>
            </div>
          }

        </>
      }

      {!searchText && 
        <>
          {/* <Banner /> */}
          <h2  className={styles.subtitlesBody}>Hamburgueres</h2>
          <div className={styles.grid}>        
            {products.map((item, index) => 
              item.categoryName === "burguer" && (
                 <ProductItem
                  key={index}
                  data={item}
                />
              ) 
             
            )}
          </div>
          <h2  className={styles.subtitlesBody}>Vitaminas</h2>
          <div className={styles.grid}>        
          {products.map((item, index) => 
              item.categoryName === "vitamina" && (
                 <ProductItem
                  key={index}
                  data={item}
                />
              ) 
             
            )}
          </div>
            <h2 className={styles.subtitlesBody} >Bebidas</h2>
            <div className={styles.grid}>        
            {products.map((item, index) => 
              item.categoryName === "bebida" && (
                 <ProductItem
                  key={index}
                  data={item}
                />
              ) 
             
            )}
          </div>

          {/* <h2 className={styles.subtitlesBody} >Combos</h2>
            <div className={styles.grid}>        
            {products.map((item, index) => 
              item.categoryName === "combo" && (
                 <ProductItem
                  key={index}
                  data={item}
                />
              ) 
             
            )}
          </div> */}
        </>
      }
      </main>
     </div>

    </div>
  );
}

export default Home

type Props = {
  tenant: Tenant,
  products: Product[],
  cart: CartItem[],
  token: string,
  user: User | null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = frontApi(tenantSlug as string);

  // Get Tenant
  const tenant = await api.getTenant();
  if (!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // Get Logged User
  const token = getCookie('token', context) ?? ''
  const user = await api.authorizeToken(token as string);

  
  // Get Cart Products
  const cartCookie = getCookie('cart', context);
  const cart = await api.getCartProducts(cartCookie as string);

  // Get Products
  const products = await api.getAllProducts();

  return {
    props: {
      tenant,
      products,
      user,
      token,
      cart
    }
  }
}