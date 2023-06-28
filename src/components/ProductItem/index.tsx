
import Link from 'next/link';
import styles from './styles.module.css';
import { Product } from 'src/model/Product';
import { formatter } from 'src/utils/formatter';
import { observer } from 'mobx-react-lite';

type Props = {
    data: Product;
}

export const ProductItem = observer(({ data }: Props) => {
    const fixPrice = formatter()

    return (
        <Link  className={styles.container} href={`/product/${data.id}`}>
                    
                <div className={styles.head} style={{ backgroundColor: "#FB9400" }}></div>
                <div className={styles.info}>
                    <div className={styles.img}>
                        <img src={data.image} alt="" />
                    </div>
                    <div className={styles.catName}>{data.categoryName}</div>
                    <div className={styles.name}>{data.name}</div>
                    <div className={styles.price} style={{ color: "#FB9400" }}>{fixPrice.formatPrice(data.price)}</div>
                </div>
            
        </Link>
    );
})