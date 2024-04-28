/*
 * @Author: kasuie
 * @Date: 2024-04-28 10:27:12
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-28 11:52:00
 * @Description:
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { toBase64, getImageFormat } from "@/lib/utils";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url).searchParams.get("url");
  if (!url) {
    return NextResponse.json({});
  }
  const imageData: any = await toBase64(url);
  if (!imageData) {
    return NextResponse.json({});
  }
  const imageFormat = getImageFormat(url);
  if (!imageFormat) {
    return NextResponse.json({});
  }
  const base64Data = imageData.toString("base64");
  const base64Image = `data:image/${imageFormat};base64,${base64Data}`;
  return NextResponse.json({ base64Image });
};