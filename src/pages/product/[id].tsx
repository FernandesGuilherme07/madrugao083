
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { observer } from "mobx-react";
import Cookies from 'js-cookie';

import { Button } from 'src/components/Button';
import { Header } from 'src/components/Header';
import { Quantity } from 'src/components/Quantity';
import { cartContext } from 'src/contexts/CartContext';
import { productStore } from 'src/container/Product';
import { formatter } from 'src/utils/formatter';
import { UniqueIdGenerator } from 'src/utils/UniqueIdGenerator';
import { CartItem } from 'src/model/CartItem';
import { Product } from 'src/model/Product';

import styles from 'src/styles/Product-id.module.css';

interface Props {
  product: Product;
}

interface AdicionalState {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

type Aditional = {
  id: number;
  name: string;
  price: number;
}
  const fixPrice = formatter();

const ProductPage = observer(({ product }: Props) => {
  const cartStore = useContext(cartContext)
  const [adicionaisMarcados, setAdicionaisMarcados] = useState<Record<string, AdicionalState>>({});
  const [aditionalsToProduct, setAditionalsToProduct] = useState<Aditional[]>([])
  const [qtCount, setQtCount] = useState(1);
  const [price, setPrice] = useState(product.price * qtCount);

  const router = useRouter()


  useEffect(() => {

    let precoTotal = product!.price * qtCount;
    for (const adicionalId in adicionaisMarcados) {
      const adicional = adicionaisMarcados[adicionalId];
      if (adicional && adicional.selected) {
        precoTotal += adicional.price;
      }
    }
    setPrice(precoTotal);
  }, [qtCount, adicionaisMarcados, product]);

  const handleCheckboxChange = (adicional: Aditional) => {

    const aditionalRemoved = aditionalsToProduct.filter(ad => ad === adicional)
    setAdicionaisMarcados((prevAdicionaisMarcados) => {
      const updatedAdicionaisMarcados: any = { ...prevAdicionaisMarcados };
        
      if (updatedAdicionaisMarcados[adicional.id]) {
        setAditionalsToProduct(aditionalRemoved)
        updatedAdicionaisMarcados[adicional.id].selected = !updatedAdicionaisMarcados[adicional.id].selected;
      } else {
        setAditionalsToProduct([...aditionalsToProduct, adicional])
        updatedAdicionaisMarcados[adicional.id] = {
          id: adicional.id,
          selected: true,
          price: adicional.price,
        };
      }

      return updatedAdicionaisMarcados;
    });
  };

  const handleAddToCart = async () => {
    let cart: CartItem[] = [];

    const cartCookie = Cookies.get('cart');
    if (typeof cartCookie === 'string') {
      const cartJson: CartItem[] = JSON.parse(cartCookie);
      for (let i in cartJson) {
        if (cartJson[i].qt && cartJson[i].productId) {
          cart.push(cartJson[i]);
        }
      }
    }

    const { id, price } = product;
      await cartStore.AddItem({id: UniqueIdGenerator.generateUniqueId() , productId: id, prdouctName: product.name, productPrice: price, aditionals:  aditionalsToProduct , qt: qtCount })
      cart.push({id: UniqueIdGenerator.generateUniqueId() , productId: id, productPrice: price, prdouctName: product.name, aditionals:  aditionalsToProduct , qt: qtCount });
    
    // going to cart
    router.push(`/cart`);
  };

  const handleUpdateQt = (newCount: number) => {
    setQtCount(newCount);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {product.name} | Madrugão083 Burguer
        </title>
          <link rel="shortcut icon" href={product.image} />

      </Head> 
      <div className={styles.headerArea}>
        <Header
          color={"#FB9400"}
          backHref={`/`}
          title="Produto"
          invert
        />
      </div>
      <div
        className={styles.headerBg}
        style={{ backgroundColor: "#FB9400" }}
      ></div>

      <div className={styles.productImage}>
        <img src={product.image} width={"100%"} />
      </div>

      <div className={styles.category}>{product.categoryName}</div>
      <div
        className={styles.title}
        style={{ borderBottomColor: "#FB9400" }}
      >
        {product.name}
      </div>
      <div className={styles.line}></div>

      <div className={styles.description}>{product.description}</div>


{product.aditionals?.map((prod: any) => (
  <div key={`${prod.id}-${prod.name}`} className={styles.aditional}>
    <div>{prod.name}</div>
    <div>
      {`R$${fixPrice.formatPrice(prod.price)}`}
      {" "}
      <input
        type="checkbox"
        checked={adicionaisMarcados[prod.id]?.selected}
        onChange={() => handleCheckboxChange(prod)}
      />
    </div>
  </div>
))}

      <div className={styles.qtText}>Quantidade</div>

      <div className={styles.area}>
        <div className={styles.areaLeft}>
          <Quantity
           
            color={"#FB9400"}
            count={qtCount}
            onUpdateCount={handleUpdateQt}
            min={1}
          />
        </div>
        <div
          className={styles.areaRight}
          style={{ color: "#FB9400" }}
        >
          {fixPrice.formatPrice(price)}
        </div>
      </div>

      <div className={styles.buttonArea}>
        <Button
          color={"#FB9400"}
          label="Adicionar ao carrinho"
          onClick={handleAddToCart}
          fill
        />
      </div>
    </div>
  );
});

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    const product = await productStore.GetProductById(Number(id))
    if (!product) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  
    return {
      props: {
        product,
      }
    }
  }