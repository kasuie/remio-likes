/*
 * @Author: kasuie
 * @Date: 2024-04-26 14:55:29
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-08 17:57:10
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
import { Button, ButtonGroup } from "@nextui-org/button";
import { clsx, storage } from "@kasuie/utils";
import request from "@/lib/fetch";
import { download } from "@/lib/utils";
import { Image as ImageIcon, Download, ChevronDownIcon } from "../icon";
import { ListItem } from "@/types/global";
import {
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/dropdown";
import { ThemeSwitcher } from "../theme-switcher/ThemeSwitcher";
import { Search } from "./Search";
import domtoimage from "dom-to-image";

export const List = ({ allList }: { allList: Array<ListItem> }) => {
  const remioLikesRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsopen] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [active, setActive]: any = useState();
  const [searchData, setSearchData]: Array<any> = useState();
  const [temp, setTemp]: any = useState({ id: null });
  const [aList, setAList] = useState<ListItem>();
  const [selectedKey, setSelectedKey] = useState("");
  const [keywords, setKeywords] = useState("");

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

  const onSearch = (key: string, keywords: string = "") => {
    setKeywords(keywords);
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
    if (remioLikesRef && remioLikesRef.current) {
      if (result && temp.id) return setIsopen(true);
      setIsLoading(true);
      domtoimage
        .toPng(remioLikesRef.current, {
          width: remioLikesRef.current.offsetWidth,
          height: remioLikesRef.current.offsetHeight,
          filter(node: any) {
            return !node.classList?.contains("mio-image-hidden");
          },
        })
        .then(function (dataUrl) {
          console.log(aList, "alist");
          setResult(dataUrl);
          setIsResult(true);
          setIsopen(true);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="pt-4 mx-auto w-full md:w-3/5 h-full">
      <div ref={remioLikesRef} className="bg-[rgb(var(--mio-main))] relative px-4 pt-6">
        <div
          className="text-end flex items-center justify-end gap-3 mio-image-hidden"
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
                  setSearchData([]);
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
          <h1 className="text-3xl md:text-5xl font-extrabold pt-4 pb-8 text-center">
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
        <div className="mio-copyright mb-20 flex min-h-10 md:bottom-0 bottom-[-24px] flex-nowrap gap-1 items-end opacity-65 text-xs">
          <span>like.kasuie.cc</span>・
          <div className="flex items-center gap-[2px]">
            <span>数据源</span>
            <span>Bangumi</span>
          </div>
          ・<span>禁止商业，盈利用途</span>
        </div>
        <div className="absolute text-center bottom-[-60px] left-0 right-0 mio-image-hidden w-full m-auto">
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
                  <ModalBody className="py-0 mt-8">
                    <Image
                      src={result}
                      classNames={{
                        wrapper: "w-full !max-w-none",
                      }}
                      className="object-contain h-[400px] md:h-full w-full"
                      alt="result"
                    />
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
                        download(result, aList?.title || "个人喜好表");
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
                    <Search
                      setKeywords={setKeywords}
                      keywords={keywords}
                      onSearch={onSearch}
                      setTemp={setTemp}
                      isLoading={isLoading}
                      data={searchData}
                    />
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
