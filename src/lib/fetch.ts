/*
 * @Author: kasuie
 * @Date: 2024-04-26 17:10:00
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-26 18:02:15
 * @Description:
 */
import { isClientSide } from "./env";
import message from "@/components/message/index";
class API {
  static async request(url: RequestInfo | URL, options = {}) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        headers: {
          "Accept-Language":
            "zh-CN,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7,en,en-CN;q=0.6",
        },
        ...options,
      });

      const data: any = await response.json();

      if (response.ok) {
        resolve(data);
      } else {
        isClientSide && message.error(`请求失败，错误码：${response.status}`);
        reject(`${data?.message || "Request failed"}`);
      }
    });
  }

  static get(url: RequestInfo | URL, params: any = {}, options = {}) {
    params = new URLSearchParams(params).toString();
    url = params ? `${url}?${params}` : url;
    return API.request(url, {
      method: "GET",
      ...options,
    });
  }

  static post(url: RequestInfo | URL, body: any, options = {}) {
    return API.request(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
  }

  static delete(url: RequestInfo | URL, body: any, options = {}) {
    return API.request(url, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
  }

  static postQs(url: RequestInfo | URL, body?: any, options = {}) {
    return API.request(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      ...options,
    });
  }

  static form(url: RequestInfo | URL, body?: any, options = {}) {
    return API.request(url, {
      method: "POST",
      body: body,
      ...options,
    });
  }

  //请求拦截
  static async interceptRequest(url: any, options = {}) {
    return { url, options };
  }

  //响应拦截
  static async interceptResponse(response: any) {
    return response;
  }
}

export default API;
