/*
 * @Author: kasuie
 * @Date: 2024-04-26 17:12:27
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-26 17:49:09
 * @Description: 
 */
'use client';
import { createRoot } from 'react-dom/client';
import { CheckCircle as Success } from '@/components/icon';
import { InfoCircle as Info } from '@/components/icon';
import { QuestionCircle as Warning } from '@/components/icon';
import { CrossCircle as Error } from '@/components/icon';
// import styles from "./index.module.scss";

type MessageProps = {
  content: string;
  type: string;
  messages?: any;
  action?: {
    text: string;
    onClick: () => void;
  };
  onClose?: () => void;
};

const MessageItem = (props: MessageProps) => {
  return (
    <div
      className="pointer-events-none fixed left-0 top-0 flex w-screen justify-center"
      style={{
        top: `${50 * (props.messages?.length - 1)}px`,
      }}
    >
      <div
        className="pointer-events-auto flex max-w-[80vw] items-center gap-1 break-all rounded-full border border-transparent bg-gray-300 bg-opacity-10 px-4 py-2 text-xs text-gray-800 shadow-md"
        style={{
          backgroundColor: `rgba(var(--mio-message-${props.type}, 0.1))`,
          borderColor: `rgba(var(--mio-message-${props.type}, 0.7))`,
          color: `var(--mio-message-${props.type})`,
        }}
      >
        <span className="flex items-center">
          {props.type &&
            (props.type === 'success' ? (
              <Success size={14} color={'var(--mio-message-success)'} />
            ) : props.type === 'info' ? (
              <Info size={14} color={'var(--mio-message-info)'} />
            ) : props.type === 'error' ? (
              <Error size={14} color={'var(--mio-message-error)'} />
            ) : props.type === 'warning' ? (
              <Warning size={14} color={'var(--mio-message-warning)'} />
            ) : null)}
        </span>
        <span>{props.content}</span>
        {props.action && (
          <button
            onClick={() => {
              props.action?.onClick?.();
              props.onClose?.();
            }}
            className="cursor-pointer border-0 bg-transparent pl-5 text-white opacity-80 hover:opacity-100"
          >
            {props.action.text}
          </button>
        )}
      </div>
    </div>
  );
};

export function Message(
  content: string,
  type: string = 'info',
  callback?: Function,
  messages = [],
  key?: string,
  delay = 3000,
  action?: MessageProps['action']
) {
  const div = document.createElement('div');
  div.classList.add('mshow');
  type && div.classList.add(type);
  document.body.appendChild(div);

  const root = createRoot(div);

  const close = () => {
    div.classList.add('mhidden');

    setTimeout(() => {
      callback && callback(key);
      root.unmount();
      div.remove();
    }, 300);
  };

  setTimeout(() => {
    close();
  }, delay);

  root.render(
    <MessageItem
      content={content}
      action={action}
      type={type}
      messages={messages}
      onClose={close}
    />
  );
}