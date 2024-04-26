/*
 * @Author: kasuie
 * @Date: 2024-04-26 17:12:05
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-26 17:47:50
 * @Description: 
 */
'use client';
import { Message } from './Message';

interface MessageApi {
  info: (text: string) => void;
  success: (text: string) => void;
  warning: (text: string) => void;
  error: (text: string) => void;
}

let messages: any = [];

function callback (key: string) {
  messages = messages.filter((v: any) => v.key != key);
};

const MyMessage: MessageApi = {
  success: (text) => {
    const key = `${messages.length}:${text}`;
    messages.push({
      key: key,
      type: 'success',
      text: text,
    });
    Message(text, 'success', callback, messages, key);
  },
  info: (text) => {
    const key = `${messages.length}:${text}`;
    messages.push({
      key: key,
      type: 'info',
      text: text,
    });
    Message(text, 'info', callback, messages, key);
  },
  error: (text) => {
    const key = `${messages.length}:${text}`;
    messages.push({
      key: key,
      type: 'error',
      text: text,
    });
    Message(text, 'error', callback, messages, key);
  },
  warning: (text) => {
    const key = `${messages.length}:${text}`;
    messages.push({
      key: key,
      type: 'warning',
      text: text,
    });
    Message(text, 'warning', callback, messages, key);
  },
};

export default MyMessage;
