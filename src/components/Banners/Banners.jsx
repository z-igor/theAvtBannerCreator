import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "antd";
import { chooseCurrentBannerA, deleteBannerA } from "../../redux/actions";
import { QuestionCircleOutlined } from "@ant-design/icons";

export default function Banners() {
  const Dispatch = useDispatch();
  const banners = useSelector((state) => state.creatorReducer.banners);

  const onChooseBanner = (id) => {
    Dispatch(chooseCurrentBannerA(id));
  };

  const onDeleteBanner2Click = (id) => {
    if (id) {
      Dispatch(deleteBannerA(id));
      Dispatch(chooseCurrentBannerA(""));
    }
  };

  return (
    <section className="main__banners banners">
      <div className="headers">
        <h2>
          Баннеры
          <Tooltip title="Нажмите на баннер, чтобы его открыть. Для его удаления, нажмите 2 раза по не пустому '#id' баннера">
            <QuestionCircleOutlined
              style={{
                marginLeft: "5px",
                fontSize: "16px",
              }}
            />
          </Tooltip>
        </h2>
      </div>
      <div className="content">
        <ul className="banners__list">
          {banners.map((b) => (
            <li
              className="banners__item"
              key={b.id}
              onClick={(e) => onChooseBanner(b.id)}
              tabIndex="0"
            >
              <span
                className="banners__item-border"
                style={{ background: `${b.bgcolor.style}` }}
              >
                &nbsp;
              </span>
              <p>{b.label}</p>
              <i onDoubleClick={() => onDeleteBanner2Click(b.id)}>
                {b.id ? `#${b.id}` : "#____"}
              </i>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
