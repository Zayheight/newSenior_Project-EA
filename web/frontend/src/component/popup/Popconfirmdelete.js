import React from "react";
import { message, Popconfirm } from "antd";
import { Button, Space } from "antd";

function Popupconfirm(props) {
    const items = props.user


  //console.log(items);
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  return (
    <Popconfirm
      title="Delete the task"
      style={{}}
      description="Are you sure to delete this user?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button type="link" danger >
        Delete
      </Button>
    </Popconfirm>
  );
}

export default Popupconfirm;
