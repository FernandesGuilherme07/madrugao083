import { useEffect, useState, useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Product } from 'src/models/Product';
import { SearchInput } from 'src/components/SearchInput';
import { ProductItem } from 'src/components/ProductItem';

import styles from 'src/styles/Home.module.css';

import { productStore } from 'src/containers/Product';
import { cartContext } from 'src/contexts/CartContext';
import { observer } from "mobx-react";
import Link from 'next/link';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { establishmentMock } from 'src/mocks/establishmentMock';
import { EstablishmentIsOpen } from 'src/utils/EstablishmentIsOpen';


const Home = observer(({ products }: props) => {
  
  const { quatityItensToCart } = useContext (cartContext);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);


  
  useEffect(() => {
    let newFilteredProducts: Product[] = [];
    for (let product of products) {
      if (product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        newFilteredProducts.push(product);
      }
    }
    setFilteredProducts(newFilteredProducts);
  }, [searchText]);

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(products.map((product) => product.categoryName)));
    setCategories(uniqueCategories);
  }, [products]);

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
              <img width={80} src="/temp/AVATAR.png" alt="Logo da hamburgueria MAdrugão083" />
            </div>
            <div className={styles.headerTopLeft}>
              <div className={styles.headerTitle}>Seja Bem Vindo (a) 👋</div>
              {EstablishmentIsOpen() ? (
                <div className={styles.headerSubtitle}>O que deseja pra hoje?</div>
              ) : (
                <div className={styles.headerSubtitle}>Hamburgueria Fechada!</div>
              )}
            </div>
            <div className={styles.headerTopRight}>
              <Link href="/cart">
                <button type="button" style={{ color: establishmentMock.primaryColor }} className={styles.cartButton}>
                  <AiOutlineShoppingCart width={30} />
                  <span className={styles.cartStatus}>{quatityItensToCart}</span>
                </button>
              </Link>
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

                {filteredProducts.length > 0 ? (
                  <div className={styles.grid}>
                    {filteredProducts.map((item, index) => (
                      <ProductItem key={index} data={item} />
                    ))}
                  </div>
                ) : (
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
                {categories.map((category, index) => (
                  <div key={index}>
                    <h2 className={styles.subtitlesBody}>{category}</h2>
                    <div className={styles.grid}>
                      {products.map((item, itemIndex) =>
                        item.categoryName === category ? (
                          <ProductItem key={itemIndex} data={item} />
                        ) : null
                      )}
                    </div>
                  </div>
                ))}
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
  const products = await productStore.GetAllProducts();

  return {
    props: {
      products,
    }
  }
}
