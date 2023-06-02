import axios from "axios";
import { TestResult } from "@/types";
// заголовок авторизации установлен для всех запросов по умолчанию
axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem("jwt")}`


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

export const getTestQuestions = (test: string | null) => {
  return axios.get(`${BASE_URL}/metrics/surveys/${test}`);
};

export const sendTestResults = (results: TestResult) => {
  return axios.post(`${BASE_URL}/metrics/results`, {
      positive_value: results.positive_value,
      negative_value: results.negative_value,
      survey: results.survey,
  });
};
