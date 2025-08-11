import axios from "axios";

export const cancelControllers = [];

const instance = axios.create();

instance.interceptors.request.use(config => {
  const controller = new AbortController();
  config.signal = controller.signal;
  cancelControllers.push(controller);
  return config;
});

export function cancelAllRequests() {
  cancelControllers.forEach(controller => controller.abort());
  cancelControllers.length = 0;
}

export default instance; 