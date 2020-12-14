import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Checkbox, Row } from "antd";
import { useDispatch } from "react-redux";

import UploadFile from "../UploadFile/UploadFile";
import { useGetBannerInfo } from "../../hook";
import { createBannerA, updateBannerA } from "../../redux/actions/";
import { makeRandomId } from "../../tools/helpers";
import ColorPicker from "../ColorPicker/ColorPicker";
import BgPicker from "../BgPicker/BgPicker";

const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 16,
  },
};

export default function Creator() {
  const [form] = Form.useForm();
  const Dispatch = useDispatch();
  const { bannerId, bannerData } = useGetBannerInfo();

  const [imageUri, setImageUri] = useState();
  const [uploadedImgs, updateUploadedImgs] = useState([]);
  const [resetForm, setResetForm] = useState(false);
  const [failedForm, setFailedForm] = useState(false);
  const refBannerId = useRef(bannerId);

  const onValuesChange = () => {
    const values = {
      ...form.getFieldsValue(),
      id: bannerId,
    };

    if (values.label && values.label.trim()) {
      if (typeof values.imageUri !== "object") {
        Dispatch(updateBannerA(values));
      }
    }
  };

  useEffect(() => {
    const values = {
      ...form.getFieldsValue(),
      id: bannerId,
    };

    if (refBannerId.current !== bannerId) {
      updateUploadedImgs([]);
      refBannerId.current = bannerId;
    }

    form.setFieldsValue({ ...bannerData });

    if (typeof values.imageUri === "object") {
      Dispatch(updateBannerA({ ...values, imageUri }));
    }
  }, [Dispatch, bannerData, bannerId, form, imageUri]);

  const onFinish = (values) => {
    values.id = makeRandomId();

    Dispatch(createBannerA(values));
  };

  const onFinishFailed = (info) => {
    setFailedForm(!!info.errorFields.length);
  };

  const onReset = () => {
    updateUploadedImgs([]);
    setResetForm(true);
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      label: "текст баннера",
      description:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
      bgcolor: "linear-gradient(to top, #7e7eff 20%, skyblue 100%)",
      imageUri: "imgs/picture.png",
      uppercase: false,
      url: "https://www.ya.ru",
    });
  };

  return (
    <section className="main__creator creator">
      <div className="headers">
        <h2>Форма ввода параметров баннера</h2>
      </div>

      <div className="content">
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          className="creator__form"
          name="control-hooks"
          layout="vertical"
          size="small"
        >
          <Form.Item name="url" label="URL" tooltip="URL ссылка">
            <Input placeholder="URL" />
          </Form.Item>
          {/* end url */}

          <Form.Item label="Название" tooltip="Название баннера. 3 строки">
            <Row>
              <Form.Item
                name="label"
                rules={[
                  {
                    required: true,
                    message: "Требуется название баннера",
                  },
                  {
                    pattern: /^[а-яА-ЯёЁ\w]+/,
                    message: 'Начните с цифры, буквы или c подчеркивания "_"',
                  },
                ]}
                style={{
                  margin: "0 10px 0 0",
                }}
              >
                <Input placeholder="Название баннера" />
              </Form.Item>
              {/* end label */}

              <Form.Item
                name="uppercase"
                valuePropName="checked"
                style={{
                  margin: "0 10px 0 0",
                }}
              >
                <Checkbox>Заглавными буквами</Checkbox>
              </Form.Item>
              {/* end uppercase */}
            </Row>
          </Form.Item>

          <Form.Item
            name="textColor"
            label="Цвет текста"
            getValueFromEvent={(data) => {
              return data;
            }}
          >
            <ColorPicker onChange={() => {}} setGradient={""} />
          </Form.Item>
          {/* end textColor */}

          <Form.Item
            name="description"
            label="Описание"
            tooltip="Описание баннера. 3 строки"
          >
            <Input.TextArea
              placeholder="Описание баннера в 3 строки..."
              autoSize
            />
          </Form.Item>
          {/* end description */}

          <BgPicker />

          <UploadFile
            form={form}
            setImageUri={setImageUri}
            uploadedImgs={uploadedImgs}
            updateUploadedImgs={updateUploadedImgs}
          />
          {/* end upload image or insert uri */}

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginRight: "8px",
              }}
              disabled={!!bannerId || resetForm}
            >
              Создать
            </Button>
            <Button
              htmlType="button"
              onClick={onReset}
              style={{
                marginRight: "8px",
              }}
            >
              Сброс
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
              Заполнить
            </Button>
          </Form.Item>
          {/* end action buttons */}
        </Form>
        {/* end form */}
      </div>
    </section>
  );
}

/* Старая версия заливки. Для супер-технарей-верстальщиков
<Form.Item
  name="bgcolor"
  label="Заливка"
  tooltip="Цвета, которые поддерживает css свойство 'background'"
>
  <Input placeholder="css background: #fff, white, gradients " />
</Form.Item> */
/* end bgcolor */

/* const onUpdate = (evt) => {
    // evt.preventDefault();
    form.validateFields();
    let values = form.getFieldsValue();
    if (values.label && values.label.trim()) {
      if (typeof values.imageUri === "object") {
        values.imageUri = imageUri;
      }
      values.id = bannerId;
      Dispatch(updateBannerA(values));
    }
  };
*/

/* <Button
    type="primary"
    htmlType="button"
    onClick={onUpdate}
    style={{
      marginRight: "8px",
    }}
    disabled={resetForm}
  >
    Сохранить
  </Button>
*/
