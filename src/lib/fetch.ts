/*
 * @Author: kasuie
 * @Date: 2024-04-26 17:10:00
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-26 18:02:15
 * @Description:
 */
import {
  fetch as Ifetch,
  type RequestUrl,
  type RequestOptions,
} from "@kasuie/http";

interface ResponseData {
  data: any;
  success: boolean;
  message: string;
}

class API {
  static async get(
    url: RequestUrl,
    data?: unknown,
    options?: Partial<RequestOptions>
  ) {
    return (await Ifetch.get(url, data, options)) as ResponseData;
  }

  static async post(
    url: RequestUrl,
    data?: unknown,
    options?: Partial<RequestOptions>
  ) {
    return (await Ifetch.post(url, data, options)) as ResponseData;
  }

  static async delete(
    url: RequestUrl,
    data?: unknown,
    options?: Partial<RequestOptions>
  ) {
    return (await Ifetch.delete(url, data, options)) as ResponseData;
  }

  static async patch(
    url: RequestUrl,
    data?: unknown,
    options?: Partial<RequestOptions>
  ) {
    return (await Ifetch.patch(url, data, options)) as ResponseData;
  }

  static async put(
    url: RequestUrl,
    data?: unknown,
    options?: Partial<RequestOptions>
  ) {
    return (await Ifetch.put(url, data, options)) as ResponseData;
  }
}

export default API;
