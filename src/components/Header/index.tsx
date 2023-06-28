import styles from "./styles.module.css";
import {BackIcon} from './backIcon';
import Link from "next/link";
import { observer } from "mobx-react-lite";

type Props = {
    backHref: string,
    color: string,
    title?: string,
    subtitle?: string,
    invert?: boolean;
}

export const Header = observer(({ backHref, color, title, subtitle, invert }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <Link href={backHref} className={invert ? styles.buttonTransparent : ""}>
                        <BackIcon color={invert ? "#FFF" : color} />
                </Link>
            </div>
            <div className={styles.centerSide}>
                {title &&
                    <div
                        className={styles.title}
                        style={{ color: invert ? "#FFF" : '#1B1B1B' }}
                    >
                        {title}
                    </div>
                }
                {subtitle &&
                    <div className={styles.subtitle}>{subtitle}</div>
                }
            </div>
            <div className={styles.rightSide}></div>
        </div>
    );
})