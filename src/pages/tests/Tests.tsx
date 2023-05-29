import styles from "./tests.module.css";
import { Navbar } from "@/components/Navbar/Navbar";
// import { Header } from "@/components/Header/Header";
import { BurnoutTestBanner } from "@/components/BurnoutTestBanner/BurnoutTestBanner";
import { PsychologistInfo } from "@/components/PsychologistInfo/PsychologistInfo";
import { Records } from "@/components/Records/Records";

export const Tests = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className={styles.container}>
        {/* <Header /> */}
        <div className={styles.tests}>
          <h2 className={styles.title}>Тесты</h2>
            <div className={styles.banerblock}>
              <BurnoutTestBanner />
              <PsychologistInfo />
            </div>
            <div className={styles.records}>
              <h3 className={styles.subtitle}>Пройденные тесты</h3>
              <Records />
            </div>
        </div>
      </div>
      
    </div>
  );
};
