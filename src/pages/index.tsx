
import { useEffect, useState, useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Product } from 'src/model/Product';
import { SearchInput } from 'src/components/SearchInput';
import { ProductItem } from 'src/components/ProductItem';

import styles from 'src/styles/Home.module.css';

import { productStore } from 'src/container/Product';
import { cartContext } from 'src/contexts/CartContext';
import { observer } from "mobx-react";
import Link from 'next/link';
import Head from 'next/head';
import { GetServerSideProps } from 'next';


const Home = observer(({ products }: props) => {
  
  const { quatityItensToCart, itens } = useContext (cartContext);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const verificarStatusLanchonete = (): boolean => {
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
  };
  
  useEffect(() => {
    
    let newFilteredProducts: Product[] = [];
    for (let product of products) {
      if (product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        newFilteredProducts.push(product);
      }
    }
    setFilteredProducts(newFilteredProducts);
  }, [searchText]);

  const handleSearch = (value: string) => setSearchText(value);

  return (
    <>
      <Head>
        <title>Madrugâo083 Burguer!</title>
        <link rel="shortcut icon" href="/temp/AVATAR.png" />
      </Head>
      <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLogo}>
            <img width={80} src="/temp/AVATAR.png" alt="Logo da hmaburgueria MAdrugão083" />
          </div>
          <div className={styles.headerTopLeft}>
            <div className={styles.headerTitle}>Seja Bem Vindo (a) 👋</div>
            {verificarStatusLanchonete() ? (
              <div className={styles.headerSubtitle}>O que deseja pra hoje?</div>
            ) : (
              <div className={styles.headerSubtitle}>Hamburgueria Fechada!</div>
            )}
          </div>
          <div className={styles.headerTopRight}>
          <Link href="/cart">
            <button type="button" className={styles.cartButton}>
              <AiOutlineShoppingCart width={30} />
              <span className={styles.cartStatus}>{quatityItensToCart}</span>
            </button>
            </ Link>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <SearchInput onSearch={handleSearch} />
        </div>
      </header>
      <div className={styles.gridContent}>
        <main className={styles.gridContainer}>
          {searchText && (
            <>
              <div className={styles.searchText}>
                Procurando por: <strong>{searchText}</strong>
              </div>

              {filteredProducts.length > 0 && (
                <div className={styles.grid}>
                  {filteredProducts.map((item, index) => (
                    <ProductItem key={index} data={item} />
                  ))}
                </div>
              )}

              {filteredProducts.length === 0 && (
                <div className={styles.noProducts}>
                  {/* <NoItemsIcon color="#E0E0E0" /> */}
                  <div className={styles.noProductsText}>Ops! Não há itens com este nome</div>
                </div>
              )}
            </>
          )}

          {!searchText && (
            <>
              {/* <Banner /> */}
              <h2 className={styles.subtitlesBody}>Hamburgueres</h2>
              <div className={styles.grid}>
                {products.map((item, index) =>
                  item.categoryName === 'burguer' ? (
                    <ProductItem key={index} data={item} />
                  ) : null
                )}
              </div>
              <h2 className={styles.subtitlesBody}>Vitaminas</h2>
              <div className={styles.grid}>
                {products.map((item, index) =>
                  item.categoryName === 'vitamina' ? (
                    <ProductItem key={index} data={item} />
                  ) : null
                )}
              </div>
              <h2 className={styles.subtitlesBody}>Bebidas</h2>
              <div className={styles.grid}>
                {products.map((item, index) =>
                  item.categoryName === 'bebida' ? (
                    <ProductItem key={index} data={item} />
                  ) : null
                )}
              </div>
              <h2 className={styles.subtitlesBody}>Combos</h2>
              <div className={styles.grid}>
                {products.map((item, index) =>
                  item.categoryName === 'combo' ? (
                    <ProductItem key={index} data={item} />
                  ) : null
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
    </>
  
  );
});

export default Home;

type props = {
  products: Product[]
}
export const getServerSideProps: GetServerSideProps = async () => {
  const products = await productStore.GetAllProducts()

  return {
    props: {
      products,
    }
  }
}
