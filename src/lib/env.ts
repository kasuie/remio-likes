/*
 * @Author: kasuie
 * @Date: 2024-04-26 17:11:25
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-26 17:11:26
 * @Description:
 */
export const isClientSide = typeof window !== "undefined";
export const isServerSide = !isClientSide;

export const isDev = process.env.NODE_ENV === "development";
