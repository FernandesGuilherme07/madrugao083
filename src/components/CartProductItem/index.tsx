
import { Product } from 'src/models/Product';
import { Quantity } from '../Quantity';
import styles from './styles.module.css';
import { formatter } from 'src/utils/formatter';
import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { productStore } from 'src/containers/Product';
import { cartContext } from 'src/contexts/CartContext';
import { CartItem } from 'src/models/CartItem';

type Props = {
    color: string;
    quantity: number;
    productId: number;
    cartId: number;
    onChange: (newCount: number, id: number) => void;
    noEdit?: boolean;
}

export const CartProductItem = observer(({ color, quantity, productId, cartId, onChange, noEdit }: Props) => {
  const cartstore = useContext(cartContext)
  const [product, setProduct] = useState<Product>()
  const [cart, setCart] = useState<CartItem>()

  const handleState = async () => {
    const prod = await productStore.GetProductById(productId);
    setProduct(prod)

  }

  useEffect(() => {
    (async() => await handleState() )()
    setCart(cartstore.GetItemToCartById(cartId))
  }, [])
  

    const useFormatter = formatter();

    return ( 
        <>
            {product !== undefined && (
            <div className={styles.container}>
            <div className={styles.productImage}>
                <img src={product?.image} alt="" />
            </div>
            <div className={styles.productInfo}>
                <div className={styles.productCategory}>{product.categoryName}</div>
                <div className={styles.productName}>{product.name}</div>
                {cart?.aditionals ? cart.aditionals.map((aditional) =>(
                   <>
                      <div key={aditional.id} className={styles.productCategory}>
                        + {aditional.name}
                      </div>
                   </>
                )) : null}
                {cart?.aditionals &&(
                   <br />
                )}
                <div 
                    className={styles.productPrice}
                    style={{color: color}}
                >   
                    {useFormatter.formatPrice(cartstore.PriceToProductWithAdicional(cartId)) }
                </div>
                {cart?.aditionals &&(
                   <br />
                )}
            </div>
            <div className={styles.qtControl}>
                {noEdit && 
                    <div className={styles.qtArea}>
                        <div className={styles.qtTitle} style={{ color}}>Qnt.</div>
                        <div className={styles.qtCount} style={{ color}}>{quantity}</div>
                    </div>
                }
                {!noEdit && 
                    <Quantity 
                        color={color}
                        count={quantity}
                        cartItem={cartstore.GetItemToCartById(cartId)}
                        min={0}
                        max={10}
                        small
                    />
                }
            </div>
        </div>       
        )}
        </>
        
    );
})