/*
 * @Author: kasuie
 * @Date: 2024-04-26 15:13:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-27 16:53:43
 * @Description:
 */
import { Image } from "@nextui-org/image";
import { useEffect } from "react";
export const Card = ({
  data,
  onSelect,
  setActive,
}: {
  data?: any;
  onSelect: Function;
  setActive: Function;
}) => {
  useEffect(() => {
    if (data) {
      console.log(data, "data>>>");
    }
  }, [data]);
  return (
    <li className="flex flex-col justify-between border-4 border-black rounded-xl bg-white/15 h-64 w-40 relative">
      <div
        className="flex flex-1"
        style={{
          maxHeight: "calc(100% - 36px)",
        }}
        onClick={() => {
          setActive(data?.index);
          onSelect?.();
        }}
      >
        <Image
          className="h-full object-cover cursor-pointer w-full"
          classNames={{
            wrapper: "!max-w-none w-full",
          }}
          src={data?.images?.large || ""}
          alt={data?.name || data.label}
        />
      </div>
      <div className="text-center text-lg py-1">{data.label}</div>
    </li>
  );
};
