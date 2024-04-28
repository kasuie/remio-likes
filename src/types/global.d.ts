/*
 * @Author: kasuie
 * @Date: 2024-04-26 17:10:47
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-28 20:54:58
 * @Description:
 */

export interface IRespResult {
  data: any;
  message: string | null;
  success: boolean;
}

export interface ListItem {
  data: Array<any>;
  title: string;
  type: string;
}
