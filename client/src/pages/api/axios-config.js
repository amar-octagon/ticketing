import axios from "axios";

const axiosConfig = ({ req }) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // we are on the browser!
    // requests can be made with a base url of ''
    return axios.create({
      baseURL: "/",
    });
  }
};

export default axiosConfig;
