/*
 * @Author: kasuie
 * @Date: 2024-04-26 11:51:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-28 20:49:08
 * @Description:
 */
import { AppLayout } from "@/components/layout";
import { List } from "@/components/list/List";
import { allList } from "@/config/data";

export default function Home() {
  return (
    <AppLayout>
      <List allList={allList} />
    </AppLayout>
  );
}
