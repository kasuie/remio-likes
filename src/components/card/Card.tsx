/*
 * @Author: kasuie
 * @Date: 2024-04-26 15:13:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-28 17:43:33
 * @Description:
 */
import { Image } from "@nextui-org/image";
import { useEffect } from "react";
import { Game } from "../icon";
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
    <li className="flex overflow-hidden flex-col gap-1 justify-between border-4 border-[rgba(var(--mio-text-default))] rounded-xl bg-mio-main/15 h-72 relative">
      <div
        className={`flex justify-center group items-center cursor-pointer flex-1 overflow-hidden`}
        style={{
          maxHeight: "calc(100% - 36px)",
          // backgroundImage: `url(${data?.images?.large})`,
        }}
        onClick={() => {
          setActive(data?.index);
          onSelect?.();
        }}
      >
        {data?.images?.large ? (
          <Image
            className="h-full object-cover w-full"
            classNames={{
              wrapper: "!max-w-none w-full",
            }}
            radius="none"
            src={data?.images?.common}
            alt={data?.name || data.label}
          />
        ) : (
          <div className="flex items-center duration-300 rounded-full justify-center w-10 h-10 bg-black/20 group-hover:bg-black/40">
            <Game />
          </div>
        )}
      </div>
      <div className="text-center text-lg mb-2">{data.label}</div>
    </li>
  );
};
