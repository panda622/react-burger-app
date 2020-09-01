import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-project-react-b178e.firebaseio.com/",
});

export default instance;
