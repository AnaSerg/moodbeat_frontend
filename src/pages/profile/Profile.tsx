import { Navbar } from "@/components/Navbar/Navbar.tsx";
// import { ContainerContent } from "@/shared/components/ContainerContent/ContainerContent";
import styles from "./profile.module.scss";
import { useParams } from "react-router-dom";
import { useRequest } from "@/shared/hooks/useRequest.tsx";
import {
  getActivityTypes,
  getBalanceWheelValues,
  getEmployeeInfo,
  getEmployeeTestResults,
} from "@/shared/api/Api.ts";
import { Info } from "@/pages/profile/components/Info/Info.tsx";
import { About } from "@/pages/profile/components/About/About.tsx";
import { Hobbies } from "@/pages/profile/components/Hobbies/Hobbies.tsx";
import { Meetings } from "@/pages/profile/components/Meetings/Meetings.tsx";
import { TestResults } from "@/pages/profile/components/TestResults/TestResults.tsx";
import { ReactElement, useEffect, useState } from "react";
import { PopupWithBackground } from "@/shared/ui/PopupWithBackground/PopupWithBackground";
import { AddMeetingForm } from "@/pages/profile/components/AddMeetingForm/AddMeetingForm";
import {
  Data,
  MeetingInfo,
  MeetingInterface,
  UserBurnoutLevel,
  UserConditionRecieved,
} from "@/types";
import * as Api from "@/shared/api/Api";
import { MoodGraph } from "@/components/MoodGraph/MoodGraph";
import { BurnoutLevel } from "@/components/BurnoutLevel/BurnoutLevel";
import { BalanceWheelResult } from "@/pages/balancewheel/components/BalanceWheelResult/BalanceWheelResult";
import { ButtonTelegramm } from "@/components/ButtonTelegramm/ButtonTelegramm";
import {PieChart} from "@/pages/main/components/PieChart/PieChart.tsx";

interface Props {
  handleAddMeetingInfo: ({
    userId,
    formattedDate,
    comment,
    level,
  }: MeetingInfo) => void;
}
export const Profile = ({ handleAddMeetingInfo }: Props): ReactElement => {
  const [activitiesData] = useRequest(getActivityTypes);
  const { userId } = useParams();
  const [userInfo] = useRequest(() => getEmployeeInfo(userId));
  const [testResults] = useRequest(() => getEmployeeTestResults(userId));
  const [meetingsList, setMeetingsList] = useState<MeetingInterface[]>([]);
  const [addPopupVisible, setAddPopupVisible] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [burnOutData, setBurnOutData] = useState<UserBurnoutLevel[]>([]);
  const [conditionsData, setConditionsData] = useState<UserConditionRecieved[]>(
    []
  );

  console.log(data);

  useEffect(() => {
    if (userId) {
      getData(userId);
      getEmployeeBurnout(userId);
      getEmployeeConditions(userId);
    }
  }, [userId]);

  async function getData(id: string | number): Promise<void> {
    try {
      const response = await getBalanceWheelValues(id);
      setData(response.data.results);
    } catch (err) {
      console.log(err);
    }
  }

  async function getEmployeeBurnout(id: string | number) {
    if (userId) {
      try {
        const response = await Api.getUserBurnoutsGraph(id);
        if (response) {
          setBurnOutData(response.data);
        }
      } catch (err: any) {
        console.log(err);
      }
    }
  }

  async function getEmployeeConditions(id: string) {
    try {
      const response = await Api.getEmployeeConditions(id);
      setConditionsData(response.data.results);
    } catch (err: any) {
      console.log(err);
    }
  }

  console.log(userInfo);

  const openAddPopup = () => {
    setAddPopupVisible(true);
  };

  useEffect(() => {
    handleGetMeetings(userId);
  }, [triggerUpdate]);

  const updateMeetingsList = () => {
    setTriggerUpdate(!triggerUpdate);
  };

  async function handleGetMeetings(userId: string | undefined): Promise<void> {
    try {
      const response = await Api.getMeetingsInfo(userId);
      const meetings: MeetingInterface[] = response.data.results;
      setMeetingsList(meetings);
    } catch (err) {
      console.log(err);
    }
  }

  if (userInfo) {
    return (
      <>
        <div className="page-container">
          <Navbar />
          <div className={styles.profile}>
          {/* <ContainerContent> */}
            <div className={styles.profileContainer}>
              <h1 className={styles.profileTitle}>Профиль сотрудника</h1>
              <div className={styles.innerContainer}>
                <div className={styles.contactsSection}>
                  <Info
                    avatar={userInfo.avatar}
                    firstName={userInfo.first_name}
                    lastName={userInfo.last_name}
                    position={userInfo.position}
                    department={userInfo.department}
                    phone={userInfo.phone}
                    email={userInfo.email}
                  />
                  <About
                    firstName={userInfo.first_name}
                    about={userInfo.about}
                  />
                  <Hobbies hobbies={userInfo.hobbies} />
                </div>
                <div className={styles.analyticsSection}>
                  <Meetings
                    openAddPopup={openAddPopup}
                    meetingsList={meetingsList && meetingsList}
                  />
                  {testResults && <TestResults results={testResults.results} />}
                  <div className={styles.statics}>
                    <h2 className={styles.staticsTitle}>Статистика</h2>
                    <BurnoutLevel burnOutData={burnOutData && burnOutData} />
                    <MoodGraph
                      conditionsData={conditionsData && conditionsData}
                    />
                    <div className={styles.circleChartsSection}>
                      <div className={styles.pieChartContainer}>
                        <h3 className={styles.pieChartTitle}>Деятельность</h3>
                        {
                          userId && userInfo.latest_activity !== null
                            ?
                            <PieChart initialData={activitiesData} id={userId} isRoutingSliderVisible={false}/>
                            :
                            <p className={styles.noDataMessage}>Нет данных</p>
                        }
                      </div>
                      <BalanceWheelResult step={2} data={data} location="profile"/>
                    </div>
                  </div>
                </div>
              </div>
              <ButtonTelegramm />
            </div>
            <PopupWithBackground
              popupVisible={addPopupVisible}
              closePopup={() => setAddPopupVisible(false)}
            >
              <AddMeetingForm
                userId={userId}
                closePopup={() => setAddPopupVisible(false)}
                updateMeetingsList={updateMeetingsList}
                handleAddMeetingInfo={handleAddMeetingInfo}
              />
            </PopupWithBackground>
          {/* </ContainerContent> */}
          </div>
        </div>
      </>
    );
  } else {
    return <div></div>;
  }
};
