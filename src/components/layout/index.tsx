/*
 * @Author: kasuie
 * @Date: 2024-04-26 14:15:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-26 15:06:31
 * @Description:
 */
import { Footer } from "./Footer";
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};
