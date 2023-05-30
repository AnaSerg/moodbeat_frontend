import axios from "axios";

const BASE_URL = "https://em-dev.usolcev.com/api/v1";

export const getUser = () => {
  return axios.get(`${BASE_URL}/users/current_user`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

export const getDepartments = (invite_code: string | null) => {
  return axios.get(`${BASE_URL}/departments`, {
    params: {
      invite_code: invite_code,
    },
  });
};

export const getPositions = (invite_code: string | null) => {
  return axios.get(`${BASE_URL}/positions`, {
    params: {
      invite_code: invite_code,
    },
  });
};
