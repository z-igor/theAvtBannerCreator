import {
  message
} from "antd";

/**
 * Прочесть данные как base64-кодированный URI
 * @param {any} img
 * @param {function} callback
 */
export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.addEventListener('load', () => callback(reader.result));

  /* Если нужен blob:url
  if (typeof img === "string") {
    return URL.createObjectURL(img);
  }
 */
};

/**
 * @returns {string}
 */
export function makeRandomId() {
  let res = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charLength = chars.length;

  for (let i = 0; i < 2; i++) {
    res += chars.charAt(Math.floor(Math.random() * charLength));
  }

  return (Math.floor(Math.random() * 98 + 1) + res);
}


/**
 * 1 вариант.
 * document.execCommand("copy");
 *
 * "copy" работает при выделения текста
 * т.е. придется скрыто создавать input || textarea,
 * чтобы скопировать json

 * 2 вариант.
 * Асинхронный Clipboard API
 *
 * IE не поддерживает
 * Edge поддерживает
 * -------------------------
 * Копирует в буфер обмена текст переданный как аргумент
 * в navigator.clipboard.writeText(текст)
 * возвращает Promise
 * @param {*} item строка
 */
export function copyToClipboard(item) {
  if (navigator) {
    navigator.clipboard.writeText(item).then(
      function () {
        message.success('Данные скопированны в буфер обмена. Выведены в консоль');
        console.warn("Success copy: ", item);
      },
      function (err) {
        message.success('Ошибка. Скопировать не возможно');
        console.error("Could not copy text: ", err);
      }
    );
  }
}

/**
 * Не обработана ошибка при скачивании
 * Рассматриваем идеальный случай!
 * Скачать canvas в формате image/png
 * @param {*} canvasElm элемент канвас
 * @param {*} evt событие
 */
export function downloadPng(canvasElm, evt) {
  const target = evt.target;
  // const current = evt.currentTarget;
  let headerC = canvasElm.toDataURL("image/png");

  headerC = headerC.replace(
    /^data:image\/[^;]*/,
    "data:application/octet-stream"
  );

  headerC = headerC.replace(
    /^data:application\/octet-stream/,
    "data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=banner.png"
  );

  target.href = headerC;
}

/**
 * https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
 * 
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
export function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {
      tl: radius,
      tr: radius,
      br: radius,
      bl: radius
    };
  } else {
    var defaultRadius = {
      tl: 0,
      tr: 0,
      br: 0,
      bl: 0
    };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}