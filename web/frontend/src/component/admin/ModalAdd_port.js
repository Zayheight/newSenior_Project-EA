import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import Profileuser from "./profileUser";
import Chartcomponent from "./chart";
import { useLocation } from "react-router-dom";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Radio } from "antd";

function Addport({ open, onCreate, onCancel }) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Enter new port number"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="portnumber"
          label="Port number"
          rules={[
            {
              required: true,
              message: "Please input the number of port!",
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Addport;
