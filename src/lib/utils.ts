/*
 * @Author: kasuie
 * @Date: 2024-04-28 09:26:19
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-29 15:13:10
 * @Description:
 */
import https from "https";
import http from "http";
import { url } from "./url";

export const toBase64 = async (url: string) => {
  return new Promise((resolve, reject) => {
    const request = url.includes("https://") ? https : http;
    request.get(url, (response: any) => {
      const chunks: any = [];
      response.on("data", (chunk: any) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", reject);
    });
  });
};

export const getImageFormat = (url: string): string | undefined => {
  const extension = url.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
      return "jpeg";
    case "png":
      return "png";
    case "gif":
      return "gif";
    case "bmp":
      return "bmp";
    default:
      return undefined;
  }
};

export const convertAllImagesToBase64 = async (
  proxyURL: string,
  cloned: any
) => {
  const copyright = cloned.querySelector(".mio-copyright");
  copyright.style.display = "flex";

  const pendingImagesPromises = [];
  const pendingPromisesData: any = [];

  const images = cloned.querySelectorAll("img");

  for (let i = 0; i < images.length; i += 1) {
    const promise = new Promise((resolve, reject) => {
      pendingPromisesData.push({
        index: i,
        resolve,
        reject,
      });
    });
    pendingImagesPromises.push(promise);
  }

  for (let i = 0; i < images.length; i += 1) {
    await fetch(url(`${proxyURL}?url=${images[i].src}`))
      .then((response) => response.json())
      .then((data) => {
        const pending = pendingPromisesData.find((p: any) => p.index === i);
        images[i].src = data;
        pending.resolve(i);
      })
      .catch((e) => {
        const pending = pendingPromisesData.find((p: any) => p.index === i);
        pending.reject(e);
      });
  }
  return await Promise.allSettled(pendingImagesPromises);
};

export const download = (src: any, fileName: string = "file") => {
  let link = document.createElement("a");
  link.href = src;
  link.download = fileName;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const base64ToBlob = (base64: string) => {
  const parts = base64.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
};

export const downloadBase64 = (src: string, fileName: string) => {
  download(base64ToBlob(src), fileName);
};
