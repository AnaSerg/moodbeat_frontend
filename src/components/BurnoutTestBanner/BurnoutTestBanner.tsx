import styles from "./BurnoutTestBanner.module.scss";
import image from "./assets/banner-background.png";
import { Link } from "react-router-dom";
import {JSX} from "react";
import {Button} from "@/shared/ui/Button/Button.tsx";

interface BurnoutTestProps {
  id?: string;
}

export const BurnoutTestBanner = ({id}: BurnoutTestProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.textTop}>
          <h1 className={styles.textHeading}>Пройдите тест о выгорании</h1>
        </div>
        <div className={styles.textBottom}>
          <p className={styles.textDescription}>
            Профессиональное выгорание трудно распознать оно может серьёзно
            подорвать здоровье и привести к депрессии.
          </p>
          <Link to={`/tests/${id}`} className={styles.link}>
            <Button mode="primary" title="Пройти тест" width="284px"/>
          </Link>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt="burnout image"/>
      </div>
    </div>
  );
};
