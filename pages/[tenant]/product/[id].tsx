import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Quantity } from '../../../components/Quantity';
import { useAppContext } from '../../../contexts/app';
import { formatter } from '../../../libs/formatter';
import { frontApi } from '../../../libs/frontApi';
import styles from '../../../styles/Product-id.module.css';
import { CartCookie } from '../../../types/CartCookie';
import { Product } from '../../../types/Product';
import { Tenant } from '../../../types/Tenant';

interface Props {
  product: Product;
  tenant: Tenant;
}

interface AdicionalState {
  id: string;
  price: number;
  selected?: boolean;
}

type Aditional = {
  id: number
  name: string;
  price: number;
}

const ProductPage = ({ product, tenant }: Props) => {
  const { setTenant } = useAppContext();
  const [adicionaisMarcados, setAdicionaisMarcados] = useState<Record<string, AdicionalState>>({});
  const [qtCount, setQtCount] = useState(1);
  const [price, setPrice] = useState(product.price * qtCount);
  const router = useRouter();
  const fixPrice = formatter();

  useEffect(() => {
    let precoTotal = product.price * qtCount;
    for (const adicionalId in adicionaisMarcados) {
      const adicional = adicionaisMarcados[adicionalId];
      if (adicional && adicional.selected) {
        precoTotal += adicional.price;
      }
    }
    setPrice(precoTotal);
  }, [qtCount, adicionaisMarcados]);
 
  const handleCheckboxChange = (adicional: Aditional) => {
    setAdicionaisMarcados((prevAdicionaisMarcados) => {
      const updatedAdicionaisMarcados: any = { ...prevAdicionaisMarcados };

      if (updatedAdicionaisMarcados[adicional.id]) {
        updatedAdicionaisMarcados[adicional.id].selected = !updatedAdicionaisMarcados[adicional.id].selected;
      } else {
        updatedAdicionaisMarcados[adicional.id] = {
          id: adicional.id,
          selected: true,
          price: adicional.price,
        };
      }

      return updatedAdicionaisMarcados;
    });
  };
  

  const handleAddToCart = () => {
    let cart: CartCookie[] = [];

    // create or get existing cart
    if (hasCookie('cart')) {
      const cartCookie = getCookie('cart');
      const cartJson: CartCookie[] = JSON.parse(cartCookie as string);
      for (let i in cartJson) {
        if (cartJson[i].qt && cartJson[i].id) {
          cart.push(cartJson[i]);
        }
      }
    }

    // search product in cart
    const cartIndex = cart.findIndex((item) => item.id === product.id);
    if (cartIndex > -1) {
      cart[cartIndex].qt += qtCount;
    } else {
      cart.push({ id: product.id, qt: qtCount });
    }

    // setting cookie
    setCookie('cart', JSON.stringify(cart));

    // going to cart
    router.push(`/${tenant.slug}/cart`);
  };

  const handleUpdateQt = (newCount: number) => {
    setQtCount(newCount);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>
          {product.name} | {tenant.name}
        </title>
      </Head>
      <div className={styles.headerArea}>
        <Header
          color={tenant.mainColor}
          backHref={`/${tenant.slug}`}
          title="Produto"
          invert
        />
      </div>
      <div
        className={styles.headerBg}
        style={{ backgroundColor: tenant.mainColor }}
      ></div>

      <div className={styles.productImage}>
        <img src={product.image} width={"100%"} />
      </div>

      <div className={styles.category}>{product.categoryName}</div>
      <div
        className={styles.title}
        style={{ borderBottomColor: tenant.mainColor }}
      >
        {product.name}
      </div>
      <div className={styles.line}></div>

      <div className={styles.description}>{product.description}</div>

      <div className={styles.description}>{product.description}</div>

{product.aditionals?.map((prod: any) => (
  <div key={`${prod.id}-${prod.name}`} className={styles.aditional}>
    <div>{prod.name}</div>
    <div>
      {`R$${fixPrice.formatPrice(prod.price)}`}
      <input
        type="checkbox"
        checked={adicionaisMarcados[prod.id]?.selected}
        onChange={() => handleCheckboxChange(prod)}
      />
    </div>
  </div>
))}

      <div className={styles.description}>{product.description}</div>

      <div className={styles.qtText}>Quantidade</div>

      <div className={styles.area}>
        <div className={styles.areaLeft}>
          <Quantity
            color={tenant.mainColor}
            count={qtCount}
            onUpdateCount={handleUpdateQt}
            min={1}
          />
        </div>
        <div
          className={styles.areaRight}
          style={{ color: tenant.mainColor }}
        >
          {fixPrice.formatPrice(price)}
        </div>
      </div>

      <div className={styles.buttonArea}>
        <Button
          color={tenant.mainColor}
          label="Adicionar ao carrinho"
          onClick={handleAddToCart}
          fill
        />
      </div>
    </div>
  );
};

export default ProductPage;


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, id } = context.query;
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

    // Get Product
    const product = await api.getProduct(parseInt(id as string));

    return {
        props: {
            tenant,
            product
        }
    }
}