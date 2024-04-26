/*
 * @Author: kasuie
 * @Date: 2024-04-26 15:13:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-26 18:17:17
 * @Description:
 */
import { Image } from "@nextui-org/image";
export const Card = ({
  data,
  onSelect,
  setConfirm
}: {
  data?: any;
  onSelect: Function;
  setConfirm?: Function
}) => {
  const onComfirm = (data: any) => {
    console.log("onComfirm>>>", data);
  };

  return (
    <li className="flex flex-col justify-between border-4 border-black rounded-xl bg-white/15 h-64 w-40 relative">
      <div
        className="flex flex-1 opacity-50"
        onClick={() => {
            onSelect?.();
            setConfirm?.(onComfirm);
        }}
      >
        <Image
          className="h-full object-cover cursor-pointer"
          src="https://kasuie.cc/images/bg.webp"
          alt="ss"
        />
      </div>
      <div className="text-center text-lg py-1">{data.label}</div>
    </li>
  );
};
