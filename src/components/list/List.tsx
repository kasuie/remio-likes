/*
 * @Author: kasuie
 * @Date: 2024-04-26 14:55:29
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-26 18:16:04
 * @Description:
 */
"use client";
import { useEffect, useState } from "react";
import { Card } from "../card/Card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import request from "@/lib/fetch";

export const List = ({ data }: { data: any }) => {
  const [aData] = useState([
    { label: "入坑作" },
    { label: "最喜欢" },
    { label: "看最多次" },
    { label: "最想安利" },
    { label: "最佳剧情" },
    { label: "最佳画面" },
    { label: "最佳配乐" },
    { label: "最佳配音" },
    { label: "最治愈" },
    { label: "最感动" },
    { label: "最致郁" },
    { label: "最被低估" },
    { label: "最讨厌" },
    { label: "最离谱" },
    { label: "最搞笑" },
    { label: "最胃疼" },
    { label: "最热血" },
    { label: "最甜" },
  ]);

  const [isOpen, setIsopen] = useState(false);
  const [confirm, setConfirm]: any = useState();
  const [searchData, setSearchData]: Array<any> = useState();

  const onClose = () => {
    setIsopen(false);
  };

  const onSelect = () => {
    setIsopen(true);
  };

  useEffect(() => {
    console.log(confirm, "1111");
  }, [confirm]);

  const onSearch = (keywords: string) => {
    console.log("onsearch>>>");
    request
      .get(`/bapi/search/subject/${keywords}?type=2&responseGroup=small`)
      .then((res: any) => {
        const { results, list } = res;
        setSearchData(list || []);
      });
  };

  return (
    <div className="p-4 mx-auto w-3/5 h-full">
      <h1 className="text-5xl font-extrabold py-8 text-center">
        游戏生涯个人喜好表
      </h1>
      <ul className="grid grid-cols-6 gap-2 w-full">
        {aData?.length &&
          aData.map((v: any, index: number) => {
            return (
              <Card
                setConfirm={setConfirm}
                onSelect={onSelect}
                data={v}
                key={index}
              />
            );
          })}
      </ul>
      <div className="p-4 text-center">footer</div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div>
                  <Input
                    label="查询"
                    onBlur={({ target: { value } }: any) => {
                      onSearch(value);
                    }}
                  />
                </div>
                <div>
                  {(searchData &&
                    searchData.map((v: any, index: number) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            console.log(v, confirm);
                          }}
                        >
                          {v.name_cn}
                        </div>
                      );
                    })) || <div>无数据~</div>}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
