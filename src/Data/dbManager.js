const getUser = () => {
  const existingUser = sessionStorage.getItem("userID");
  if (existingUser) {
    return existingUser;
  } else {
    const newUser = "user-" + new Date().getTime();
    sessionStorage.setItem("userID", newUser);
    localStorage.clear();
    return newUser;
  }
};

const getDataKey = () => {
  const userID = getUser();
  return `redOnion/cart/${userID}`;
};

const getDatabaseCart = () => {
  const dataKey = getDataKey();
  const data = localStorage.getItem(dataKey) || "{}";
  return JSON.parse(data);
};

const addToDatabaseCart = (key, count) => {
  const curCart = getDatabaseCart();
  curCart[key] = count;
  localStorage.setItem(getDataKey(), JSON.stringify(curCart));
};

const addLoggedInUser = (value) => {
  localStorage.setItem(`redOnion/loggedInUserInfo`, JSON.stringify(value));
};

const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem(`redOnion/loggedInUserInfo`) || "{}");
};

const addReceiverInfo = (value) => {
  localStorage.setItem(`redOnion/receiverInfo`, JSON.stringify(value));
};

const getReceiverInfo = () => {
  return JSON.parse(localStorage.getItem(`redOnion/receiverInfo`) || "{}");
};

const removeFromDatabaseCart = (key) => {
  const curCart = getDatabaseCart();
  delete curCart[key];
  localStorage.setItem(getDataKey(), JSON.stringify(curCart));
};

const processOrder = () => {
  localStorage.removeItem(getDataKey());
  localStorage.removeItem("redOnion/receiverInfo");
};

export {
  addToDatabaseCart,
  removeFromDatabaseCart,
  getDatabaseCart,
  processOrder,
  addLoggedInUser,
  getLoggedInUser,
  addReceiverInfo,
  getReceiverInfo,
};

const localStorage =
  window.localStorage ||
  (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
    };
  })();

const sessionStorage =
  window.sessionStorage ||
  (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
    };
  })();
