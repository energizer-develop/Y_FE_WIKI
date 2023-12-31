import { db } from 'apis/firebase';
import { ALERT } from 'constants/common';
import { CALENDAR_COLLECTION } from 'constants/collection';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { IuserData } from 'types/user';
import { getSessionUserData } from 'utils/user';

interface ICalendarData {
  content: string;
  startDate: string;
  endDate: string;
}

interface ICalendarResponse {
  start: Date;
  end: Date;
  title: string;
  id: string;
}

export const uploadCalendarData = async (calendarData: ICalendarData) => {
  try {
    const user = getSessionUserData();
    await addDoc(collection(db, CALENDAR_COLLECTION), {
      ...calendarData,
      uid: user?.uid,
    });
    alert(ALERT.COMPLETE);
  } catch (error) {
    alert(ALERT.ERROR);
  }
};
const searchUser = () => {
  const user: IuserData | undefined = getSessionUserData();
  const searchUserQuery = query(
    collection(db, CALENDAR_COLLECTION),
    where('uid', '==', user?.uid),
  );
  return searchUserQuery;
};
export const getCalendarData = async () => {
  try {
    const response = await getDocs(searchUser());
    const responseArray: ICalendarResponse[] = [];
    response.forEach((doc) => {
      const calendarData = doc.data();
      responseArray.push({
        title: calendarData.content,
        start: new Date(calendarData.startDate),
        end: new Date(calendarData.endDate),
        id: doc.id,
      });
    });
    return responseArray;
  } catch (error) {
    alert(ALERT.ERROR);
  }
};

export const deleteCalendarData = async (id: string) => {
  try {
    await deleteDoc(doc(db, CALENDAR_COLLECTION, id));
  } catch (error) {
    alert(ALERT.ERROR);
  }
};
