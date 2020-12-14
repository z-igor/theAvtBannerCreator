import React, { useState } from "react";

import { Form, message, Radio } from "antd";
import ColorPicker from "../ColorPicker/ColorPicker";

export default function BgPicker({ ...props }) {
  const [radioVal, setRadioVal] = useState(1);

  const onChange = (e) => {
    setRadioVal(e.target.value);
  };

  return (
    <>
      <Form.Item label="Заливка">
        <Radio.Group
          className="radio-group"
          onChange={onChange}
          value={radioVal}
        >
          <Radio value={1}>Сплошной цвет</Radio>
          <Radio value={2}>Градиент</Radio>
        </Radio.Group>
      </Form.Item>

      {radioVal === 1 && (
        <Form.Item
          name="bgcolor"
          getValueFromEvent={(data) => {
            return data;
          }}
        >
          <ColorPicker onChange={() => {}} setGradient={""} />
        </Form.Item>
      )}

      {radioVal === 2 && (
        <Form.Item
          name="bgcolor"
          getValueFromEvent={(data) => {
            return data;
          }}
        >
          <ColorPicker onChange={() => {}} setGradient={true} />
        </Form.Item>
      )}
    </>
  );
}
