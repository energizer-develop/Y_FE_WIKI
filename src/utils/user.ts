interface IuserData {
  [key: string]: unknown;
  uid: string;
  displayName: string;
}

export const getSessionUserData = (): IuserData | undefined => {
  for (const key of Object.keys(sessionStorage)) {
    if (key.includes('firebase:authUser:') && key) {
      const user = sessionStorage.getItem(key);
      if (user) return JSON.parse(user);
    }
  }
};
export const getName = () => {
  return getSessionUserData()?.displayName;
};
