import React, { useCallback, useEffect, useRef } from "react";
import { useGetBannerInfo } from "../../hook";
import { roundRect } from "../../tools/helpers";
import * as drawMultilineText from "canvas-multiline-text";

import picture from "../../imgs/picture.png";

export default function CanvasBanner({ canvasElm, ...props }) {
  const canvasRef = useRef(null);
  const { bannerData } = useGetBannerInfo();

  const findColor = (str) =>
    str.match(/(rgba\(\d+,\s\d+,\s\d+,\s\d\)|(rgb\(\d+,\s\d+,\s\d+\)))+/g);

  const findLinGradAngle = (str) => str.match(/(\d{1,3})deg/)[1];

  const findPointsAngle = (str, { width, height }) => {
    let r = (width + height) / 2;
    let x0 = width / 2;
    let y0 = 0;
    let angle = findLinGradAngle(str);

    if (angle >= 135 && angle <= 225) {
      y0 = height;
    } else {
      y0 = 0;
    }

    if (angle >= 90) {
      x0 = width;
    }

    angle = +((angle / 180) * Math.PI).toFixed(4);

    let x1 = Math.floor(x0 + r * Math.sin(-angle));
    let y1 = Math.floor(y0 + r * Math.cos(+angle));

    return { x0, y0, x1, y1, angle };
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
        _w: function () {
          return {
            w: Math.floor(ctx.measureText(this.txt).width),
            isGt:
              Math.floor(ctx.measureText(this.txt).width) >= canvas.width - 20,
          };
        },
        _multiline: function () {
          return drawMultilineText(ctx, this.txt, {
            rect: {
              x: 10,
              y: 10,
              width: canvas.width - 20,
              height: canvas.height,
            },
          });
        },
        r: function ({ fontSize = 30, ...obj }) {
          ctx.font = `500 ${fontSize}px Roboto, Calibri, sans-serif`;
          ctx.fillStyle = obj.color;
          ctx.fillText(this.txt, obj.x, obj.y);
        },
      };

      const desc = {
        txt: bannerData.description,
        w: function () {
          return Math.floor(ctx.measureText(this.txt).width);
        },
        r: function ({ fontSize = 14, ...obj }) {
          ctx.font = `${fontSize}px Roboto, Calibri, sans-serif`;
          ctx.fillStyle = obj.color;
          ctx.fillText(this.txt, obj.x, obj.y);
        },
      };

      ctx.strokeStyle = "transparent";

      if (bannerData.bgcolor.style.match("linear-gradient")) {
        const { x0, y0, x1, y1 } = findPointsAngle(
          bannerData.bgcolor.style,
          canvas
        );

        /* lingrad = ctx.createLinearGradient(
          0 / * x0 * /,
          0 / * y0 * /,
          0 / * x1 * /,
          canvas.height / * y1 * /
        ); */

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

      label.r({
        color: bannerData.textColor.style,
        x: 10,
        y: canvas.height - 60,
      });
      desc.r({
        color: bannerData.textColor.style,
        x: 10,
        y: canvas.height - 30,
      });
    },
    [bannerData]
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
