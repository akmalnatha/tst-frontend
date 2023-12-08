import axios, { AxiosResponse } from "axios";

const url = "https://holi-train.grayrock-b84a6c08.australiaeast.azurecontainerapps.io/";

export const post = async (
  api: string,
  form: any
): Promise<AxiosResponse<any, any>> => {
  return await axios.post(url + api, form, {headers: {"Content-Type": "application/x-www-form-urlencoded",}});
};

export const postWithAuth = async (
  api: string,
  form: any,
  token: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.post(url + api, form, {
    headers: {
      // Accept: "multipart/form-data",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + token, //Add this line
    },
  });
};

export const postWithAuthJson = async (
  api: string,
  json: any,
  token: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.post(url + api, json, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token, //Add this line
    },
  });
};

export const get = async (
  apiParams: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.get(url + apiParams);
};

export const getWithAuth = async (
    token: string,
    apiParams: string
  ): Promise<AxiosResponse<any, any>> => {
    return await axios.get(url + apiParams, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  };

export const deleteWithAuth = async (
    api: string,
    token: string
  ): Promise<AxiosResponse<any, any>> => {
    return await axios.delete(url + api, {
      headers: {
        // Accept: "multipart/form-data",
        Authorization: "Bearer " + token, //Add this line
      },
    });
  };