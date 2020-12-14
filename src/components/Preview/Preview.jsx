import React, { useRef, useState } from "react";
import picture from "../../imgs/picture.png";

import { Button, Dropdown, Menu, message } from "antd";
import { copyToClipboard, downloadPng } from "../../tools/helpers";
import CanvasBanner from "../Canvas/CanvasBanner";
import { useGetBannerInfo } from "../../hook";
import { DownOutlined, PictureOutlined, SmileTwoTone } from "@ant-design/icons";

export default function Preview() {
  const htmlRef = useRef();
  const [canvasElm, setCanvasElm] = useState();
  const { bannerId, bannerData } = useGetBannerInfo();

  const onDownloadPng = (e) => {
    message.info(
      {
        content: (
          <span>
            Запуск ракет через 3... 2... 1... <SmileTwoTone />
          </span>
        ),
      },
      2
    );
    downloadPng(canvasElm, e);
  };

  const onSerializeJSONClick = (e) => {
    let copyJson = JSON.stringify(bannerData, null, 2);
    copyToClipboard(copyJson);
  };

  const onGetHTMLClick = (e) => {
    let copyHTML = htmlRef.current.outerHTML;
    copyToClipboard(copyHTML);
  };

  const defRes = {
    label: "авито баннер",
    desc:
      "Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные тексты. Прямо имени но свое! Журчит первую она страна даже инициал деревни алфавит подзаголовок даль строчка переписывается, продолжил имеет пустился предупредила?",
    href: "#/",
  };

  const bannerStyle = {
    content: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    wrapper: {
      borderRadius: "15px",
      height: "100%",
      maxWidth: "300px",
      maxHeight: "400px",
      margin: "0 auto",
      overflow: "hidden",
    },
    bgColor: {
      background: bannerData.bgcolor ? bannerData.bgcolor.style : "#e6e6e6",
      height: "inherit",
    },
    one: {
      height: "inherit",
      padding: "2rem .8rem",
      color: bannerData.textColor ? bannerData.textColor.style : "#333",
      backgroundImage: bannerData.imageUri
        ? `url(${bannerData.imageUri})`
        : `url(${picture})`,
      backgroundSize: "70%",
      backgroundPosition: "top 25px center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      textDecoration: "none",
    },
    link: {
      textDecoration: "none",
      color: "#333",
    },
    label: {
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      textOverflow: "ellipsis",
      fontSize: "2rem",
      lineHeight: "2rem",
      fontWeight: "600",
      textTransform: bannerData.uppercase ? "uppercase" : "",
      maxWidth: "260px",
      overflow: "hidden",
      color: "inherit",
      paddingBottom: "5px",
    },
    desc: {
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      fontSize: "calc(50vh*0.048)",
      lineHeight: "calc(50vh*0.049)",
      overflow: "hidden",
    },
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<PictureOutlined />}>
        <a href={bannerData.imageUri} target="blank" download="image.png">
          Картинку?
        </a>
      </Menu.Item>
      <Menu.Item key="2" icon={<PictureOutlined />}>
        <a
          href="#"
          target="blank"
          onClick={onDownloadPng}
          download="banner.png"
        >
          Баннер?
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <aside className="app__div app__preview preview">
      <div className="headers">
        <h2>Превью баннера</h2>
      </div>

      <section
        className="preview__content content"
        ref={htmlRef}
        style={bannerStyle.content}
      >
        <div className="preview__wrapper" style={bannerStyle.wrapper}>
          <div className="preview__bg-color" style={bannerStyle.bgColor}>
            <a
              className="preview__one"
              target="blank"
              style={bannerStyle.one}
              href={bannerData.url}
            >
              <h1 className="preview__label" style={bannerStyle.label}>
                {bannerData.label ? bannerData.label : defRes.label}
              </h1>

              {bannerData.description && (
                <p className="preview__desc" style={bannerStyle.desc}>
                  {bannerData.description}
                </p>
              )}
            </a>
          </div>
        </div>
      </section>
      {/* end content banner */}

      <section className="preview__actions">
        <p>Экспорт</p>
        <div className="preview__action-btns">
          <Dropdown overlay={menu}>
            <Button type="primary">
              png <DownOutlined />
            </Button>
          </Dropdown>
          <Button type="primary" onClick={onGetHTMLClick}>
            html
          </Button>
          <Button type="primary" onClick={onSerializeJSONClick}>
            json
          </Button>
        </div>
      </section>
      <div className="canvas-hidden">
        <CanvasBanner canvasElm={setCanvasElm} />
      </div>
    </aside>
  );
}
