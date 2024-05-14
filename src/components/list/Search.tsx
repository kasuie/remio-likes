/*
 * @Author: kasuie
 * @Date: 2024-05-08 16:09:34
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-14 17:14:05
 * @Description:
 */
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { clsx } from "@kasuie/utils";
import { Search as SearchIcon } from "../icon";
import { Loader } from "../loader/Loader";
import { createRef, useEffect, useState } from "react";

export const Search = ({
  onSearch,
  data,
  isLoading,
  setTemp,
  keywords,
  setKeywords,
}: {
  onSearch: Function;
  data: Array<any>;
  isLoading: Boolean;
  setTemp: Function;
  keywords: string;
  setKeywords: any;
}) => {
  const [temp, setMTemp]: any = useState({ id: null });
  const contentRef: any = createRef();

  // useEffect(() => {
  //   if (contentRef?.current) {
  //   }
  // }, [contentRef]);

  return (
    <>
      <div>
        <Input
          variant="faded"
          value={keywords}
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-mio-text-default/90",
              "placeholder:text-mio-text-default/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "bg-default-200/30",
              "dark:bg-default/40",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="输入关键词进行搜索..."
          startContent={
            <SearchIcon className="pointer-events-none flex-shrink-0" />
          }
          onKeyDown={({ key }: any) => onSearch(key, keywords)}
          onBlur={() => {
            onSearch("Enter", keywords);
          }}
          onValueChange={setKeywords}
        />
      </div>
      <div ref={contentRef} className="w-full mio-scroll flex flex-wrap max-h-[500px] overflow-y-auto">
        {data ? (
          data.map((v: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setMTemp(v);
                  setTemp?.(v);
                }}
                className={clsx(
                  "mio-col-2 cursor-pointer border duration-300 rounded border-transparent sm:mio-col-2 md:mio-col-2 lg:mio-col-3 xl:mio-col-5 2xl:mio-col-5 p-1",
                  {
                    "!border-pink-400": v?.id == temp?.id,
                  }
                )}
              >
                <div className="flex flex-1 mb-1 item-center justify-center">
                  <Image
                    className="h-full min-h-28 object-cover cursor-pointer"
                    radius="sm"
                    src={v?.covers?.large || ""}
                    alt={v?.name_cn || "name"}
                  />
                </div>
                <div
                  className={clsx("text-center text-xs line-clamp-2", {
                    "text-pink-400": v?.id == temp?.id,
                  })}
                >
                  {v.name_cn || v.name}
                </div>
              </div>
            );
          })
        ) : isLoading ? (
          <Loader />
        ) : null}
      </div>
    </>
  );
};
