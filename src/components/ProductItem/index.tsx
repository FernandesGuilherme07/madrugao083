
import Link from 'next/link';
import styles from './styles.module.css';
import { Product } from 'src/models/Product';
import { formatter } from 'src/utils/formatter';
import { observer } from 'mobx-react-lite';
import { establishmentMock } from 'src/mocks/establishmentMock';

type Props = {
    data: Product;
}

export const ProductItem = observer(({ data }: Props) => {
    const fixPrice = formatter()

    return (
        <Link  className={styles.container} href={`/product/${data.id}`}>
                    
                <div className={styles.head} style={{ backgroundColor: establishmentMock.primaryColor }}></div>
                <div className={styles.info}>
                    <div className={styles.img}>
                        <img src={data.image} alt="" />
                    </div>
                    <div className={styles.catName}>{data.categoryName}</div>
                    <div className={styles.name}>{data.name}</div>
                    <div className={styles.price} style={{ color: establishmentMock.primaryColor }}>{fixPrice.formatPrice(data.price)}</div>
                </div>
            
        </Link>
    );
})