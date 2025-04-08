
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { observer } from "mobx-react";

import { Button } from 'src/components/Button';
import { Header } from 'src/components/Header';
import { Quantity } from 'src/components/Quantity';
import { cartContext } from 'src/contexts/CartContext';
import { productStore } from 'src/containers/Product';
import { formatter } from 'src/utils/formatter';
import { UniqueIdGenerator } from 'src/utils/UniqueIdGenerator';

import { Product } from 'src/models/Product';

import styles from 'src/styles/Product-id.module.css';
import { establishmentMock } from 'src/mocks/establishmentMock';

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
  const cartStore = useContext(cartContext);
  const [adicionaisMarcados, setAdicionaisMarcados] = useState<Record<string, AdicionalState>>({});
  const [aditionalsToProduct, setAditionalsToProduct] = useState<Aditional[]>([]);
  const [qtCount, setQtCount] = useState(1);
  const [price, setPrice] = useState(product.price * qtCount);

  const router = useRouter();

  useEffect(() => {
    const precoTotal = (product.price + getSelectedAditionalsTotalPrice()) * qtCount;
    setPrice(precoTotal);
  }, [qtCount, adicionaisMarcados, product]);

  const getSelectedAditionalsTotalPrice = (): number => {
    let totalPrice = 0;
    for (const adicionalId in adicionaisMarcados) {
      const adicional = adicionaisMarcados[adicionalId];
      if (adicional && adicional.selected) {
        totalPrice += adicional.price;
      }
    }
    return totalPrice;
  };

  const handleCheckboxChange = (adicional: Aditional) => {
    setAdicionaisMarcados((prevAdicionaisMarcados) => {
      const updatedAdicionaisMarcados: any = { ...prevAdicionaisMarcados };

      if (updatedAdicionaisMarcados[adicional.id]) {
        setAditionalsToProduct((prevAditionals) => prevAditionals.filter((ad) => ad !== adicional));
        updatedAdicionaisMarcados[adicional.id].selected = !updatedAdicionaisMarcados[adicional.id].selected;
      } else {
        setAditionalsToProduct((prevAditionals) => [...prevAditionals, adicional]);
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
    const { id } = product;
    const totalPrice = cartStore.PriceToProductWithAdicional(id);

    await cartStore.AddItem({
      id: UniqueIdGenerator.generateUniqueId(),
      productId: id,
      prdouctName: product.name,
      productPrice: price / qtCount,
      aditionals: aditionalsToProduct,
      qt: qtCount,
    });
    
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
          color={establishmentMock.primaryColor}
          backHref={`/`}
          title="Produto"
          invert
        />
      </div>
      <div
        className={styles.headerBg}
        style={{ backgroundColor: establishmentMock.primaryColor }}
      ></div>

      <div className={styles.productImage}>
        <img src={product.image} width={"100%"} />
      </div>

      <div className={styles.category}>{product.categoryName}</div>
      <div
        className={styles.title}
        style={{ borderBottomColor: establishmentMock.primaryColor }}
      >
        {product.name}
      </div>
      <div className={styles.line}></div>

      <div className={styles.description}>{product.description}</div>


      {product.aditionals &&
        product.aditionals.map((prod: any) => (
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
           
            color={establishmentMock.primaryColor}
            count={qtCount}
            onUpdateCount={handleUpdateQt}
            min={1}
          />
        </div>
        <div
          className={styles.areaRight}
          style={{ color: establishmentMock.primaryColor }}
        >
          {fixPrice.formatPrice(price)}
        </div>
      </div>

      <div className={styles.buttonArea}>
        <Button
          color={establishmentMock.primaryColor}
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