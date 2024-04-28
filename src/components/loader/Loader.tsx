/*
 * @Author: kasuie
 * @Date: 2024-04-28 20:16:16
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-28 20:34:51
 * @Description:
 */
export const Loader = () => {
  return (
    <div className="flex justify-between w-20 mx-auto pt-5">
      <div className="w-4 h-4 rounded-full bg-pink-500 animate-[left-swing_0.5s_alternate_ease-in-out_infinite]"></div>
      <div className="w-4 h-4 rounded-full bg-pink-500"></div>
      <div className="w-4 h-4 rounded-full bg-pink-500 animate-[right-swing_0.5s_alternate_ease-in-out_infinite]"></div>
    </div>
  );
};
