/*
 * @Author: kasuie
 * @Date: 2024-04-26 14:18:55
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-28 19:32:49
 * @Description:
 */
import { Link } from "@nextui-org/link";
import { Github } from "../icon";
export const Footer = () => {
  return (
    <footer className="w-full p-3">
      <div className="flex gap-2 h-8 justify-center items-center text-xs rounded-md px-4">
        <Link
          href="https://kasuie.cc"
          color="foreground"
          underline="hover"
          showAnchorIcon
          isExternal
          size="sm"
        >
          @Remio
        </Link>
        <span>|</span>
        <Link
          href="https://github.com/kasuie"
          underline="hover"
          color="foreground"
          size="sm"
          className="flex gap-1"
          showAnchorIcon
          isExternal
        >
          <Github />
          <span>Github</span>
        </Link>
      </div>
    </footer>
  );
};
