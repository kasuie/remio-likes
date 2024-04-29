/*
 * @Author: kasuie
 * @Date: 2024-04-26 15:13:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-29 11:53:25
 * @Description:
 */
import { Image } from "@nextui-org/image";
import { useEffect } from "react";
import { Anima, Game } from "../icon";
export const Card = ({
  data,
  type,
  onSelect,
  setActive,
}: {
  data?: any;
  type: string,
  onSelect: Function;
  setActive: Function;
}) => {

  const renderIcon = () => {
    switch (type) {
      case "anima":
        return <Anima />
      case "game":
        return <Game />
      default:
        break;
    }
  }

  return (
    <li className="flex overflow-hidden flex-col gap-1 justify-between border-4 border-mio-content/60 rounded-xl bg-mio-main/15 h-72 relative">
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
        {data?.covers?.large ? (
          <Image
            className="h-full object-cover w-full"
            classNames={{
              wrapper: "!max-w-none w-full",
            }}
            radius="none"
            src={data?.covers?.large}
            alt={data?.name || data.label}
          />
        ) : (
          <div className="flex items-center duration-300 rounded-full justify-center w-10 h-10 bg-mio-content/30 group-hover:bg-mio-content/50">
            {renderIcon()}
          </div>
        )}
      </div>
      <div className="text-center text-lg mb-2">{data.label}</div>
    </li>
  );
};
