import styles from './balancewheelresult.module.scss';
import { parseISO } from 'date-fns';
import { Radar } from "@/pages/balancewheel/components/Radar/Radar";
import { ProgressBar } from "@/pages/balancewheel/components/ProgressBar/ProgressBar";
import { Button } from "@/shared/ui/Button/Button";
import {ReactElement, useEffect, useState} from "react";
import {Data, WheelResultItem, WheelResultsInfo} from "@/types";
import {formatDateToDdMmYy} from "@/shared/helpers.ts";


interface BalanceWheelResultProps {
  step: number;
  goToFirstQuestion?: () => void;
  data: Data[];
  location?: string;
}

export const BalanceWheelResult = ({ step, goToFirstQuestion, data, location }: BalanceWheelResultProps): ReactElement => {
  const [priorityResults, setPriorityResults] = useState<WheelResultsInfo | undefined>(undefined);
  const [currentResults, setCurrentResults] = useState<WheelResultsInfo | undefined>(undefined);
  const [chartData, setChartData] = useState<WheelResultItem[]>([]);

  useEffect(() => {
    if (data) {
      setPriorityResults(data.find(item => item.set_priority)  || undefined);
      setCurrentResults(data.find(item => !item.set_priority)  || undefined);
    }
  }, [data]);

  useEffect(() => {
    if ((priorityResults && priorityResults.results.length !== 0) && (currentResults && currentResults.results.length !== 0)) {
      setChartData([
        {
          "life-direction": "Отношения",
          "Приоритет": priorityResults.results[0].result,
          "Текущее состояние": currentResults.results[0].result,
        },
        {
          "life-direction": "Окружение",
          "Приоритет": priorityResults.results[1].result,
          "Текущее состояние": currentResults.results[1].result,
        },
        {
          "life-direction": "Работа",
          "Приоритет": priorityResults.results[2].result,
          "Текущее состояние": currentResults.results[2].result,
        },
        {
          "life-direction": "Обеспеченность",
          "Приоритет": priorityResults.results[3].result,
          "Текущее состояние": currentResults.results[3].result,
        },
        {
          "life-direction": "Яркость жизни",
          "Приоритет": priorityResults.results[4].result,
          "Текущее состояние": currentResults.results[4].result,
        },
        {
          "life-direction": "Саморазвитие",
          "Приоритет": priorityResults.results[5].result,
          "Текущее состояние": currentResults.results[5].result,
        },
        {
          "life-direction": "Духовность",
          "Приоритет": priorityResults.results[6].result,
          "Текущее состояние": currentResults.results[6].result,
        },
        {
          "life-direction": "Здоровье",
          "Приоритет": priorityResults.results[7].result,
          "Текущее состояние": currentResults.results[7].result,
        }
      ]);
    } else {
      setChartData([]);
    }
  }, [priorityResults, currentResults]);

  if(location === 'balance-wheel') {
    return (
      <div>
        <div className={styles.resultArea}>
          <div className={styles.resultInfo}>
            <h4 className={styles.title}>Ваше колесо жизненного баланса готово</h4>
            <ul className={styles.legend}>
              <li className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.legendColorPriority}`}></div>
                <p className={styles.text}>Приоритет жизненных сфер</p>
              </li>
              <li className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.legendColorCurrent}`}></div>
                <p className={styles.text}>Оценка текущего состояния</p>
              </li>
            </ul>
            <p className={styles.text}>Все сферы нашего бытия тесно взаимосвязаны. Работая над одной, подтягиваешь и другие. Не нужно пытаться достичь самого высокого показателя по каждой сфере, но важно найти их наиболее гармоничное сочетание, при котором вы чувствуете себя счастливым.</p>
            <p className={`${styles.text} ${styles.textLast}`}>Точки роста — там, где приоритет высокий, а удовлетворённость низкая. Но стоит помнить, что ваша цель — не стать отличником и получить десятку по всем критериям, а объективно взглянуть на свою жизнь.</p>
          </div>
          <div className={styles.chartArea}>
            {chartData.length !== 0 && priorityResults && currentResults && (
              <Radar step={step} chartData={chartData} location={location}/>
            )}
          </div>
        </div>
        <div className={styles.bottomArea}>
          <Button handleClick={goToFirstQuestion} mode="primary" title="Обновить" width="200px" />
          <ProgressBar step={step} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={`${styles.resultArea} ${styles.resultAreaProfile}`}>
          <h4 className={styles.titleProfile}>Колесо жизненного баланса</h4>
          {chartData.length !== 0 && priorityResults && currentResults
            ?
            <>
              <p className={styles.dateCaption}>{`Дата составления ${formatDateToDdMmYy(parseISO(data[0].date), true)}`}</p>
              <div className={`${styles.chartArea} ${styles.chartAreaSmall}`}>
                  <Radar step={step} chartData={chartData} location={location}/>
              </div>
              <ul className={`${styles.legend} ${styles.legendProfile}`}>
                <li className={styles.legendItem}>
                  <div className={`${styles.legendColor} ${styles.legendColorProfile} ${styles.legendColorPriority}`}></div>
                  <p className={`${styles.text} ${styles.textProfile}`}>Приоритет жизненных сфер</p>
                </li>
                <li className={styles.legendItem}>
                  <div className={`${styles.legendColor} ${styles.legendColorProfile} ${styles.legendColorCurrent}`}></div>
                  <p className={`${styles.text} ${styles.textProfile}`}>Оценка текущего состояния</p>
                </li>
              </ul>
            </>
            :
            <p className={styles.noDataMessage}>Нет данных</p>
          }
        </div>
      </div>
    )
  }
};
