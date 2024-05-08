/*
 * @Author: kasuie
 * @Date: 2024-04-26 15:13:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-08 15:44:25
 * @Description:
 */
import { Image } from "@nextui-org/image";
import { useEffect, useRef } from "react";
import { Anima, Game } from "../icon";
export const Card = ({
  data,
  type,
  onSelect,
  setActive,
}: {
  data?: any;
  type: string;
  onSelect: Function;
  setActive: Function;
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const renderIcon = () => {
    switch (type) {
      case "anima":
        return <Anima />;
      case "game":
        return <Game />;
      default:
        break;
    }
  };

  return (
    <li className="flex overflow-hidden flex-col justify-between border-2 border-mio-content/60 rounded-xl bg-mio-main/15 h-72 relative">
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
            ref={imageRef}
            className="h-full object-cover w-full"
            classNames={{
              wrapper: "!max-w-none w-full h-full",
            }}
            radius="none"
            crossOrigin="anonymous"
            src={data?.images?.large}
            alt={data?.name || data.label}
          />
        ) : (
          <div className="flex items-center duration-300 rounded-full justify-center w-10 h-10 bg-mio-content/30 group-hover:bg-mio-content/50">
            {renderIcon()}
          </div>
        )}
      </div>
      <div className="text-center py-1 text-lg">{data.label}</div>
    </li>
  );
};
