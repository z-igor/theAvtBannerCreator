import React, { useCallback, useEffect, useRef } from "react";
import { useGetBannerInfo } from "../../hook";
import { roundRect } from "../../tools/helpers";
import canvasTxt from "canvas-txt";

import picture from "../../imgs/picture.png";

export default function CanvasBanner({ canvasElm, ...props }) {
  const canvasRef = useRef(null);
  const { bannerData } = useGetBannerInfo();

  const findColor = (str) =>
    str.match(/(rgba\(\d+,\s\d+,\s\d+,\s\d\)|(rgb\(\d+,\s\d+,\s\d+\)))+/g);

  const findLinGradAngle = (str) => str.match(/(\d{1,3})deg/)[1];

  const findPointsAngle = useCallback(function (str, { width, height }) {
    let r = height;
    let x0 = width;
    let y0 = 0;
    let angle = findLinGradAngle(str);

    if (angle === 0 || angle >= 350) {
      r = height;
    }

    if (angle >= 90 && angle <= 134) {
      x0 = 0;
      y0 = 0;
      r = height;
    }

    if (angle >= 135 && angle <= 180) {
      y0 = height;
      r = height + 50;
    }

    if (angle >= 180 && angle <= 225) {
      x0 = 0;
      y0 = height;
      r = height;
    }

    if (angle >= 225 && angle <= 270) {
      x0 = 0;
      y0 = height;
      r = width;
    }

    if (angle >= 270 && angle <= 315) {
      x0 = 0;
      y0 = 0;
      r = height + 50;
    }

    angle = +((angle / 180) * Math.PI).toFixed(4);

    let x1 = Math.floor(x0 + r * Math.sin(-angle));
    let y1 = Math.floor(y0 + r * Math.cos(+angle));

    return { x0, y0, x1, y1, angle };
  }, []);

  const multilineTxt = (ctx, str, { fontSize = 30, height = 100, ...obj }) => {
    let y = obj.y - height;
    let tempStr = str;
    let maxLength = 60;

    if (obj.isDesc) {
      maxLength = 110;
      tempStr = str.slice(0, maxLength);
    }

    tempStr = str.slice(0, maxLength);

    if (str.length >= maxLength) {
      tempStr += "...";
    }

    ctx.fillStyle = obj.color;
    canvasTxt.align = "left";
    canvasTxt.lineHeight = height / 3;
    canvasTxt.fontSize = fontSize;
    canvasTxt.font = "Roboto, Calibri, sans-serif";
    canvasTxt.fontWeight = obj.weight;
    canvasTxt.drawText(ctx, tempStr, obj.x, y, 280, height);
  };

  const draw = useCallback(
    function (ctx, canvas) {
      let lingrad = null;
      let radgrad = null;

      const newImg = new Image();

      /**
       * The operation is insecure.
       * https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#Implementing_the_save_feature
       */
      newImg.setAttribute("crossOrigin", "Anonymous");

      newImg.onload = function () {
        let w = 260;
        let h = 300;

        ctx.drawImage(
          newImg,
          newImg.width > 500 ? -w / 3 : 0 /* dx */,
          0 /* dy */,
          newImg.width > 500 ? w * 2.5 : w + 50 /* w */,
          newImg.width > 500 ? h * 2.5 : h + 50 /* h */,
          20,
          20,
          w,
          h
        );
      };

      newImg.src = bannerData.imageUri ? bannerData.imageUri : picture;

      const label = {
        txt: bannerData.uppercase
          ? bannerData.label.toUpperCase()
          : bannerData.label,
      };

      const desc = {
        txt: bannerData.description,
      };

      ctx.strokeStyle = "transparent";

      if (bannerData.bgcolor.style.match("linear-gradient")) {
        const { x0, y0, x1, y1 } = findPointsAngle(
          bannerData.bgcolor.style,
          canvas
        );

        lingrad = ctx.createLinearGradient(x0, y0, x1, y1);

        let [oneColor, twoColor] = findColor(bannerData.bgcolor.style);
        // console.log(findPointsAngle(bannerData.bgcolor.style, canvas));

        lingrad.addColorStop(0, twoColor);
        lingrad.addColorStop(1, oneColor);

        ctx.fillStyle = lingrad || "#ddd";
      } else if (bannerData.bgcolor.style.match("radial-gradient")) {
        radgrad = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 9 /* begin rad */,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width /* finish rad */
        );

        let [oneColor, twoColor] = findColor(bannerData.bgcolor.style);

        radgrad.addColorStop(0, oneColor);
        radgrad.addColorStop(1, twoColor);

        ctx.fillStyle = radgrad || "#ddd";
      } else {
        ctx.fillStyle = bannerData.bgcolor.style || "#ddd";
      }

      roundRect(ctx, 0, 0, canvas.width, canvas.height, 15, true);

      multilineTxt(ctx, label.txt, {
        color: bannerData.textColor.style,
        x: 10,
        y: canvas.height - 70,
        weight: 500,
      });

      multilineTxt(ctx, desc.txt, {
        height: 45,
        fontSize: 14,
        color: bannerData.textColor.style,
        x: 10,
        y: canvas.height - 20,
        weight: "normal",
        isDesc: true,
      });
    },
    [bannerData, findPointsAngle]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();

    draw(context, canvas);
    canvasElm(canvas);
  }, [draw, bannerData, canvasElm]);

  return (
    <canvas id="canvas" ref={canvasRef} {...props} width="300" height="400" />
  );
}
