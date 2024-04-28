/*
 * @Author: kasuie
 * @Date: 2024-04-28 14:22:50
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-28 14:22:50
 * @Description: 
 */
import { isDev } from './env';
import { siteConfig } from '@/config/app.config';
export const url = (path = '') => {
  if (isDev) return new URL(path, 'http://localhost:3000');
  return new URL(path, siteConfig.domain);
};
