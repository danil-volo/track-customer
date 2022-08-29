import Axios from "axios";

export const windowClosed = async function () {
  return await Axios.post("/window-closed");
};

export const clientAccessed = async function (clientInfo) {
  return await Axios.post("/client", clientInfo);
};

export const getClients = async function () {
  return await Axios.get("/admin/clients");
};
