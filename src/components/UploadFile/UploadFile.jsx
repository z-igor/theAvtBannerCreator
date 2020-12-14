import React, { useState } from "react";

import { Form, Input, Button, Upload, message, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../tools/helpers";

export default function UploadFile({
  form,
  setImageUri,
  fileListImgs,
  updateUploadedImgs,
  ...props
}) {
  const [radioVal, setRadioVal] = useState(1);

  const uploadProps = {
    fileList: fileListImgs,
    beforeUpload: (file) => {
      if (file.type !== "image/png") {
        message.error(`${file.name} не png файл`);
      }

      return file.type === "image/png";
    },
    onChange: (info) => {
      updateUploadedImgs(info.fileList.filter((file) => !!file.status));
    },
    transformFile: (file) => {
      getBase64(file, (uri) => {
        setImageUri(uri);
      });
    },
  };

  const onChange = (e) => {
    setRadioVal(e.target.value);

    if (radioVal === 2) {
      form.resetFields(["imageUri"]);
      updateUploadedImgs([]);
    }
  };

  return (
    <>
      <Form.Item
        label="Иллюстрация"
        tooltip="Загрузить только png иллюстрацию или через URI"
      >
        <Radio.Group
          className="radio-group"
          onChange={onChange}
          value={radioVal}
        >
          <Radio value={1}>URI</Radio>
          <Radio value={2}>Загрузить</Radio>
        </Radio.Group>
      </Form.Item>

      {radioVal === 2 && (
        <Form.Item name="imageUri" type="url">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Загрузить png</Button>
          </Upload>
        </Form.Item>
      )}

      {radioVal === 1 && (
        <Form.Item name="imageUri">
          <Input placeholder="URI" />
        </Form.Item>
      )}
    </>
  );
}
