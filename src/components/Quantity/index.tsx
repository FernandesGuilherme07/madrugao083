import { useEffect, useState, useContext } from 'react';
import styles from './styles.module.css';
import { formatter } from 'src/utils/formatter';
import { cartContext } from 'src/contexts/CartContext';
import { CartItem } from 'src/model/CartItem';
import { observer } from 'mobx-react-lite';

type Props = {

    color: string;
    count: number;
    cartItem?: CartItem | undefined;
    onUpdateCount?: (newCount: number) => void;
    min?: number;
    max?: number;
    small?: boolean;
}
export const Quantity = observer(({onUpdateCount, color, count, cartItem, small }: Props) => {
    const cartStore = useContext(cartContext)

    const fixPrice = formatter();

    const handleRemove = () => {
        if(cartItem) {
            cartStore.RemoveItem(cartItem.id)
        }

        if(onUpdateCount) {
            onUpdateCount(count - 1);
        }
        
    }

    const handleAdd = () => {
        if(cartItem) {
            cartStore.AddItem({...cartItem, qt: 1})
        }

        if(onUpdateCount) {
            onUpdateCount(count + 1);
        }
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.button}
                onClick={handleRemove}
                style={{
                    color:"#fff",
                    backgroundColor: color,
                    width: small ? 42 : 48,
                    height: small ? 42 : 48,
                }}
            >
                -
            </div>
            <div
                className={styles.qt}
                style={{ fontSize: small ? 16 : 18 }}
            >
                {fixPrice.formatQuantity(count, 2)}
            </div>
            <div
                className={styles.button}
                onClick={handleAdd}
                style={{
                    color:"#fff",
                    backgroundColor: color,
                    width: small ? 42 : 48,
                    height: small ? 42 : 48,
                }}
            >
                +
            </div>
        </div>
    );
})