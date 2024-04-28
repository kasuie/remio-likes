/*
 * @Author: kasuie
 * @Date: 2024-04-28 09:26:19
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-28 11:59:02
 * @Description:
 */
import https from "https";
import http from "http";

export const toBase64 = async (url: string) => {
  return new Promise((resolve, reject) => {
    http.get(url, (response: any) => {
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

export const convertAllImagesToBase64 = (proxyURL: string, cloned: any) => {
  const pendingImagesPromises = [];
  const pendingPromisesData: any = [];

  const images = cloned.getElementsByTagName("img");

  for (let i = 0; i < images.length; i += 1) {
    // First we create an empty promise for each image
    const promise = new Promise((resolve, reject) => {
      pendingPromisesData.push({
        index: i,
        resolve,
        reject,
      });
    });
    // We save the promise for later resolve them
    pendingImagesPromises.push(promise);
  }

  for (let i = 0; i < images.length; i += 1) {
    // We fetch the current image
    fetch(`${proxyURL}?url=${images[i].src}`)
      .then((response) => response.json())
      .then((data) => {
        const pending = pendingPromisesData.find((p: any) => p.index === i);
        images[i].src = data;
        pending.resolve(data);
      })
      .catch((e) => {
        const pending = pendingPromisesData.find((p: any) => p.index === i);
        pending.reject(e);
      });
  }

  // This will resolve only when all the promises resolve
  return Promise.all(pendingImagesPromises);
};
