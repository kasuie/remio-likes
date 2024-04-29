/*
 * @Author: kasuie
 * @Date: 2024-04-29 14:22:11
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-29 14:22:11
 * @Description:
 */
"use client";
import { useTheme } from "next-themes";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { clsx, storage } from "@kasuie/utils";

export const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  const [checked, setChecked] = useState(false);

  const size = 8;

  useEffect(() => {
    const theme = storage.l.get("theme");
    setChecked(theme == "dark" ? true : false);
  }, []);

  const onChange = ({ target: { checked } }: BaseSyntheticEvent) => {
    if (checked) {
      setTheme("dark");
      setChecked(true);
    } else {
      setTheme("light");
      setChecked(false);
    }
  };

  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
        type="checkbox"
      />
      <div
        className={clsx(
          `peer-checked:after:rotate-360 peer overflow-hidden rounded-full bg-gray-200 shadow-lg shadow-gray-400 outline-none ring-0 duration-150 before:absolute before:left-1 before:top-1/2 before:flex before:-translate-y-1/2 before:items-center before:justify-center before:rounded-full before:bg-white before:duration-150 before:content-['☀️'] before:transition-all after:absolute after:right-1 after:top-[4px] after:flex after:translate-y-full after:items-center after:justify-center after:rounded-full after:bg-[#1d1d1d] after:opacity-0 after:duration-150 after:content-['🌙'] after:transition-all peer-checked:bg-[#383838] peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:before:-translate-y-full peer-checked:before:rotate-90 peer-checked:before:opacity-0 peer-checked:after:translate-y-0 peer-checked:after:opacity-100`,
          {
            "h-8 w-8": size == 8,
            "after:h-6 after:w-6": size == 8,
            "before:h-6 before:w-6": size == 8,
          }
        )}
      ></div>
    </label>
  );
};
