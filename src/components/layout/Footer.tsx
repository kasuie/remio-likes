/*
 * @Author: kasuie
 * @Date: 2024-04-26 14:18:55
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-26 15:52:25
 * @Description:
 */
import { Link } from "@nextui-org/link";
export const Footer = () => {
  return (
    <footer className="w-full p-3">
      <div className="flex h-14 justify-center items-center rounded-md px-4">
        <p className="text-xs">
          <span className="opacity-60">© 2020 - 2024 By </span>
          <Link
            color="foreground"
            href="https://kasuie.cc"
            isExternal
            showAnchorIcon
            size="sm"
            className="text-xs"
          >
            KASUIE
          </Link>
        </p>
      </div>
    </footer>
  );
};
