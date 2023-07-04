import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import { formatter } from 'src/utils/formatter';
import { formatMinutesToHours } from 'src/utils/formatMinutesToHours';
import { CartProductItem } from 'src/components/CartProductItem';
import { cartContext } from 'src/contexts/CartContext';
import { CartItem } from 'src/models/CartItem';
import { Header } from 'src/components/Header';
import { Button } from 'src/components/Button';

import styles from 'src/styles/Cart.module.css';
import { InputField } from 'src/components/InputField';
import { deliveryStore } from 'src/containers/Delivery';
import { LoadingDelivery } from 'src/components/LoadingDelivery/LoadingDelivery';
import { ModalCheckout } from 'src/components/ModalCheckout';
import { establishmentMock } from 'src/mocks/establishmentMock';
import { EstablishmentIsOpen } from 'src/utils/EstablishmentIsOpen';

const Cart = () => {
  // Shipping
  const [shippingInput, setShippingInput] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPrice, setShippingPrice] = useState(0);
  const [shippingTime, setShippingTime] = useState(0);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressValid, setAddressValid] = useState(false);
  const [deliveryLoading, setDeliveryLoading] = useState({
    isStopped: false,
    isPaused: false
  });

  const cartStore = useContext(cartContext);
  const useFormatter = formatter();

  // Product control
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    
    setCart(cartStore.itens);
  }, [cartStore.itens]);

  const handleCartChange = (newCount: number, id: number) => {
    const tempCart: CartItem[] = [...cart];
    const cartIndex = tempCart.findIndex((i) => i.id === id);
  
    if (cartIndex !== -1) {
      if (tempCart[cartIndex].qt && newCount > 0) {
        tempCart[cartIndex].qt = newCount; // Correção: atualiza corretamente a quantidade do item
      } else if (newCount > 0) {
        tempCart[cartIndex].qt = 1;
      } else {
        tempCart.splice(cartIndex, 1);
      }
      setCart(tempCart); // Correção: atualiza o estado 'cart' com o novo carrinho
    }
  };
  

  const handleShippingCalc = async () => {
    setLoadingVisible(true);
  
    try {
      const deliveryInfo = await deliveryStore.CalculateFreightAndHandleLocale(shippingInput);

      if(EstablishmentIsOpen())  window.alert("Hamburgueria fechada no momento, abre novamente às 22horas.")   
      else if (deliveryInfo && deliveryInfo.PriceDelivery > 20) {
        setShippingAddress(` ${deliveryInfo.street} - ${deliveryInfo.neighborhood} - ${deliveryInfo.localidade}`);
        setShippingPrice(0.00);
        setShippingTime(0);
        setLoadingVisible(false);
        window.alert("Frete indisponível para essa localidade!");
      } else if (deliveryInfo) {
        setAddressValid(true);
        setShippingAddress(`${deliveryInfo.street} - ${deliveryInfo.neighborhood} - ${deliveryInfo.localidade}`);
        setShippingPrice(deliveryInfo.PriceDelivery + 2);
        setShippingTime(deliveryInfo.PriceDelivery + 30);
        setLoadingVisible(false);
      }
      
    } catch (error) {
      setLoadingVisible(false);
      window.alert("CEP inválido!");
      console.error("Error:", error);
    }
  };

  const handleFinish = () => {
    if (shippingAddress !== "" && addressValid && shippingPrice > 0) {
      setModalVisible(true);
    } else {
      window.alert("Insira um CEP válido!");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sacola | Madrugão083 Burguer</title>
        <link rel="shortcut icon" href="/temp/AVATAR.png" />
      </Head>

      <Header
        backHref={`/`}
        color={establishmentMock.primaryColor}
        title="Sacola"
      />

      {modalVisible && (
        <ModalCheckout
          shippingAddress={shippingAddress}
          shippingTime={shippingTime}
          shippingPrice={shippingPrice}
          onClose={() => setModalVisible(false)}
        />
      )}

      <div className={styles.productsList}>
        {cart.map((cartItem, index) => (
          <CartProductItem
            key={index}
            color={establishmentMock.primaryColor}
            quantity={cartItem.qt}
            productId={cartItem.productId}
            cartId={cartItem.id}
            onChange={handleCartChange}
          />
        ))}
      </div>

      <div className={styles.shippingArea}>
        <div className={styles.shippingTitle}>Calcular frete e prazo</div>
        <div className={styles.shippingForm}>
          <InputField
            color={establishmentMock.primaryColor}
            placeholder="Digite seu frete"
            value={shippingInput}
            onChange={(e: any) => setShippingInput(e)}
          />
          <Button
            color={establishmentMock.primaryColor}
            label="OK"
            onClick={handleShippingCalc}
          />
        </div>

        {loadingVisible && (
          <LoadingDelivery
            isPaused={deliveryLoading.isPaused}
            isStopped={deliveryLoading.isStopped}
          />
        )}

        {shippingPrice > 0 && (
          <div className={styles.shippingInfo}>
            <div className={styles.shippingAddress}>{shippingAddress}</div>
            <div className={styles.shippingTime}>
              <div className={styles.shippingTimeText}>Recebe em até {formatMinutesToHours(shippingTime)}</div>
              <div
                className={styles.shippingPrice}
                style={{ color: establishmentMock.primaryColor }}
              >
                {useFormatter.formatPrice(shippingPrice)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.resumeArea}>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Subtotal</div>
          <div className={styles.resumeRight}>{useFormatter.formatPrice(cartStore.totalPrice)}</div>
        </div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Frete</div>
          <div className={styles.resumeRight}>{shippingPrice > 0 ? useFormatter.formatPrice(shippingPrice) : '--'}</div>
        </div>
        <div className={styles.resumeLine}></div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div
            className={styles.resumeRightBig}
            style={{ color: establishmentMock.primaryColor }}
          >
            {useFormatter.formatPrice(shippingPrice + cartStore.totalPrice)}
          </div>
        </div>
        <div className={styles.resumeButton}>
          <Button
            color={establishmentMock.primaryColor}
            label='Continuar'
            onClick={handleFinish}
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default observer(Cart);
