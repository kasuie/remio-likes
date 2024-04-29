/*
 * @Author: kasuie
 * @Date: 2024-04-26 14:55:29
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-29 21:32:59
 * @Description:
 */
"use client";
import { Key, useEffect, useRef, useState } from "react";
import { Card } from "../card/Card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Image } from "@nextui-org/image";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { clsx, storage } from "@kasuie/utils";
import request from "@/lib/fetch";
import { convertAllImagesToBase64, download } from "@/lib/utils";
import {
  Search,
  Image as ImageIcon,
  Download,
  Share,
  Anima,
  SearchIcon,
  ChevronDownIcon,
} from "../icon";
import html2canvas from "html2canvas";
import { Loader } from "../loader/Loader";
import { ListItem } from "@/types/global";
import {
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/dropdown";
import { ThemeSwitcher } from "../theme-switcher/ThemeSwitcher";

export const List = ({ allList }: { allList: Array<ListItem> }) => {
  const remioLikesRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsopen] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [active, setActive]: any = useState();
  const [searchData, setSearchData]: Array<any> = useState();
  const [temp, setTemp]: any = useState({ id: null });
  const [keywords, setKeywords] = useState("");
  const [aList, setAList] = useState<ListItem>();
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    const activeType = storage.l.get("mio-likes-active") || "";
    if (activeType) {
      setSelectedKey(activeType);
      setAList(allList.find((v: ListItem) => v.type == activeType));
    } else {
      setSelectedKey(allList[0].type);
    }
  }, [allList]);

  useEffect(() => {
    if (selectedKey) {
      setAList(allList.find((v: ListItem) => v.type === selectedKey));
    }
  }, [selectedKey]);

  const onClose = () => {
    setIsopen(false);
  };

  const mergeList = () => {};

  const onSelect = () => {
    if (isResult) setIsResult(false);
    setIsopen(true);
    setTemp({ id: null });
  };

  const onSearch = (key: string) => {
    if (!keywords) return;
    if (key === "Enter") {
      setIsLoading(true);
      let url = "",
        params = {};
      if (selectedKey == "anima") {
        url = `/bapi/search/subject/${keywords}`;
        params = {
          type: 2,
          responseGroup: "small",
          max_results: 25,
        };
      } else if (selectedKey == "game") {
        url = `/bapi/search/subject/${keywords}`;
        params = {
          type: 4,
          responseGroup: "small",
          max_results: 25,
        };
      }
      request
        .get(url, params)
        .then((res: any) => {
          const { results, list } = res;
          setSearchData(
            list?.map((v: any) => {
              const { images } = v;
              const covers = Object.assign({}, images);
              if (images) {
                const keys = Object.keys(images);
                keys.map((key: string) => {
                  if (images[key]) {
                    if (covers[key].includes("http://")) {
                      covers[key] = covers[key].replace("http://", "https://");
                    }
                    const proxyImg = images[key].replace(
                      "http://lain.bgm.tv",
                      "/bpic"
                    );
                    images[key] = proxyImg;
                  }
                });
              }
              return {
                ...v,
                covers,
                images: images,
              };
            }) || []
          );
        })
        .catch(() => setIsLoading(false))
        .finally(() => setIsLoading(false));
    }
  };

  const toImage = () => {
    if (result && temp.id) return setIsopen(true);
    setIsLoading(true);
    remioLikesRef.current &&
      html2canvas(remioLikesRef.current, {
        allowTaint: true,
        backgroundColor: storage.l.get("theme") === "dark" ? "#000" : "#fff",
        width: remioLikesRef.current.offsetWidth + 4,
        height: remioLikesRef.current.offsetHeight + 4,
        onclone: (cloned) => convertAllImagesToBase64("/api/image", cloned),
      }).then((canvas: HTMLCanvasElement) => {
        console.log(aList, "alist");
        setResult(canvas.toDataURL());
        setIsResult(true);
        setIsopen(true);
        setIsLoading(false);
      });
  };

  return (
    <div ref={remioLikesRef} className="p-4 mx-auto w-full md:w-3/5 h-full">
      <div
        className="text-end flex items-center justify-end gap-3"
        data-html2canvas-ignore
      >
        <ButtonGroup variant="flat">
          <Button size="sm">切换表</Button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button size="sm" isIconOnly>
                <ChevronDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Merge options"
              selectedKeys={selectedKey}
              selectionMode="single"
              onSelectionChange={(keys: any) => {
                storage.l.set("mio-likes-active", keys.currentKey);
                setSelectedKey(keys.currentKey);
              }}
              className="max-w-[300px]"
            >
              {allList?.length ? (
                allList.map((v: ListItem) => {
                  return <DropdownItem key={v.type}>{v.title}</DropdownItem>;
                })
              ) : (
                <div></div>
              )}
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>
        <ThemeSwitcher />
      </div>
      <div>
        <h1 className="text-3xl md:text-5xl font-extrabold pt-4 pb-12 text-center">
          {aList?.title || "喜好生成表"}
        </h1>
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
          {aList?.data?.length &&
            aList.data.map((v: any, index: number) => {
              return (
                <Card
                  onSelect={onSelect}
                  setActive={setActive}
                  data={{ ...v, index }}
                  type={selectedKey}
                  key={`${index}:${selectedKey}`}
                />
              );
            })}
        </ul>
      </div>
      <div className="pt-6 text-center relative">
        <div className="mio-copyright hidden absolute min-h-10 md:bottom-0 bottom-[-24px] flex-nowrap gap-1 items-end opacity-65 text-xs">
          <span>like.kasuie.cc</span>・
          <div className="flex items-center gap-[2px]">
            <span>数据源</span>
            <span>Bangumi</span>
          </div>
          ・<span>禁止商业，盈利用途</span>
        </div>
        <Button
          color="success"
          className="min-w-32"
          endContent={<ImageIcon />}
          onClick={() => toImage()}
          isLoading={isLoading}
          data-html2canvas-ignore
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
        className="!mx-0 !my-2 max-h-screen"
        classNames={{
          footer: "md:py-4 py-2",
          closeButton: "z-[11]",
        }}
      >
        <ModalContent>
          {isResult
            ? (onClose) => (
                <>
                  <ModalBody className="py-0">
                    <Image src={result} alt="result" />
                  </ModalBody>
                  <ModalFooter>
                    <p className="md:hidden">长按图片即可保存或分享~</p>
                    {/* <Button color="success" isIconOnly onPress={onClose}>
                      <Share />
                    </Button> */}
                    <Button
                      color="success"
                      isIconOnly
                      className=" hidden md:flex"
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
                    {(aList?.data && aList.data[active].label) || "请选择"}
                  </ModalHeader>
                  <ModalBody>
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
                          <Search className="pointer-events-none flex-shrink-0" />
                        }
                        onKeyDown={({ key }: any) => onSearch(key)}
                        onBlur={() => onSearch("Enter")}
                        onValueChange={setKeywords}
                      />
                    </div>
                    <div className="w-full mio-scroll flex flex-wrap max-h-[500px] overflow-y-auto">
                      {searchData ? (
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
                                  "!border-pink-400": v?.id == temp?.id,
                                }
                              )}
                            >
                              <div className="flex flex-1 mb-1 item-center justify-center">
                                <Image
                                  className="h-full object-cover cursor-pointer"
                                  radius="sm"
                                  src={v?.covers?.common || ""}
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
                        })
                      ) : isLoading ? (
                        <Loader />
                      ) : null}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      取消
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => {
                        if (active > -1 && aList) {
                          result && setResult("");
                          aList.data[active] = {
                            ...aList.data[active],
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
