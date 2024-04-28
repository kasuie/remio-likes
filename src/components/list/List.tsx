/*
 * @Author: kasuie
 * @Date: 2024-04-26 14:55:29
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-28 18:05:24
 * @Description:
 */
"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "../card/Card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { clsx, storage } from "@kasuie/utils";
import request from "@/lib/fetch";
import { convertAllImagesToBase64, download } from "@/lib/utils";
import { Search, Image as ImageIcon, Download, Share, Anima } from "../icon";
import html2canvas from "html2canvas";

export const List = ({ data }: { data: any }) => {
  const [aData, setAData] = useState([
    { label: "入坑作" },
    { label: "最喜欢" },
    { label: "看最多次" },
    { label: "最想安利" },
    { label: "最佳剧情" },
    { label: "最佳画面" },
    { label: "最佳配乐" },
    { label: "最佳配音" },
    { label: "最治愈" },
    { label: "最致郁" },
    { label: "最被低估" },
    { label: "最搞笑" },
    { label: "最胃疼" },
    { label: "最热血" },
    { label: "最甜" },
  ]);

  const remioLikesRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsopen] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState("");
  const [active, setActive]: any = useState();
  const [searchData, setSearchData]: Array<any> = useState();
  const [temp, setTemp]: any = useState({ id: null });
  const [keywords, setKeywords] = useState("");

  const onClose = () => {
    setIsopen(false);
  };

  const onSelect = () => {
    if (isResult) setIsResult(false);
    setIsopen(true);
    setTemp({ id: null });
  };

  const onSearch = (key: string) => {
    if (!keywords) return;
    if (key === "Enter") {
      request
        .get(`/bapi/search/subject/${keywords}?type=2&responseGroup=small`)
        .then((res: any) => {
          const { results, list } = res;
          setSearchData(
            list?.map((v: any) => {
              const { images } = v;
              const { large } = images || {};
              if (images) {
                const keys = Object.keys(images);
                keys.map((key: string) => {
                  const proxyImg = images[key].replace(
                    "http://lain.bgm.tv",
                    "/bpic"
                  );
                  images[key] = proxyImg;
                });
              }
              return {
                ...v,
                cover: large,
                images: images,
              };
            }) || []
          );
        });
    }
  };

  const toImage = () => {
    if (result) setIsopen(true);
    remioLikesRef.current &&
      html2canvas(remioLikesRef.current, {
        allowTaint: true,
        backgroundColor: storage.l.get("theme") === "dark" ? "#000" : "#fff",
        width: remioLikesRef.current.offsetWidth + 4,
        height: remioLikesRef.current.offsetHeight + 4,
        onclone: (cloned) => convertAllImagesToBase64("/api/image", cloned),
      }).then((canvas: HTMLCanvasElement) => {
        setResult(canvas.toDataURL());
        setIsResult(true);
        setIsopen(true);
      });
  };

  return (
    <div ref={remioLikesRef} className="p-4 mx-auto w-full md:w-3/5 h-full">
      <div>
        <h1 className="text-5xl font-extrabold py-8 text-center">
          游戏生涯个人喜好表
        </h1>
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
          {aData?.length &&
            aData.map((v: any, index: number) => {
              return (
                <Card
                  onSelect={onSelect}
                  setActive={setActive}
                  data={{ ...v, index }}
                  key={index}
                />
              );
            })}
        </ul>
      </div>
      <div className="pt-6 text-center" data-html2canvas-ignore>
        <Button
          color="success"
          className=" min-w-32"
          startContent={<ImageIcon />}
          onClick={() => toImage()}
        >
          生成图片
        </Button>
      </div>
      <Modal
        backdrop={"blur"}
        size="2xl"
        key={active}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {isResult
            ? (onClose) => (
                <>
                  <ModalBody className="py-0">
                    <Image src={result} alt="result" />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" isIconOnly onPress={onClose}>
                      <Share />
                    </Button>
                    <Button
                      color="success"
                      isIconOnly
                      onPress={() => {
                        download(result, "个人喜好表");
                      }}
                    >
                      <Download />
                    </Button>
                  </ModalFooter>
                </>
              )
            : (onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {aData[active].label || "请选择"}
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <Input
                        isClearable
                        variant="faded"
                        value={keywords}
                        classNames={{
                          label: "text-black/50 dark:text-white/90",
                          input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
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
                          <Search className="pointer-events-none flex-shrink-0" />
                        }
                        onKeyDown={({ key }: any) => onSearch(key)}
                        onBlur={() => onSearch("Enter")}
                        onValueChange={setKeywords}
                        // description={"dsdas"}
                      />
                    </div>
                    <div className="w-full flex flex-wrap">
                      {(searchData &&
                        searchData.map((v: any, index: number) => {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setTemp(v);
                              }}
                              className={clsx(
                                "mio-col-2 cursor-pointer border duration-300 rounded border-transparent sm:mio-col-2 md:mio-col-2 lg:mio-col-3 xl:mio-col-5 2xl:mio-col-5 p-1",
                                {
                                  "border-pink-400": v?.id == temp?.id,
                                }
                              )}
                            >
                              <div className="flex flex-1 mb-1">
                                <Image
                                  className="h-full object-cover cursor-pointer"
                                  radius="sm"
                                  src={v?.images?.common || ""}
                                  alt={v?.name_cn || "name"}
                                />
                              </div>
                              <div
                                className={clsx(
                                  "text-center text-xs line-clamp-2",
                                  {
                                    "text-pink-400": v?.id == temp?.id,
                                  }
                                )}
                              >
                                {v.name_cn || v.name}
                              </div>
                            </div>
                          );
                        })) || <div>无数据~</div>}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      取消
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => {
                        if (active > -1) {
                          result && setResult("");
                          aData[active] = {
                            ...aData[active],
                            ...temp,
                          };
                        }
                        setIsopen(false);
                      }}
                    >
                      确定
                    </Button>
                  </ModalFooter>
                </>
              )}
        </ModalContent>
      </Modal>
    </div>
  );
};
