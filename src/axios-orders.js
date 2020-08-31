import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-project-react-b178e.firebaseio.com/",
});

instance.interceptors.request.use(
  (request) => {
    console.log("Order Request Sending...", request);
    return request;
  },
  (error) => {
    console.log("Oreder Request Failed To Send", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("Order Response Data", response);
    return response;
  },
  (error) => {
    console.log("Oreder Response Failed", error);
    return Promise.reject(error);
  }
);

export default instance;
