import React from "react";
import { NoticeBar } from "antd-mobile";
import "./index.css"; // 引入自定义的CSS

const AutoNoticeBar = ({ messages }) => {
  return (
    <div className="vertical-notice-bar">
      <div className="vertical-scroll-content">
        {messages.map((message, index) => (
          <NoticeBar key={index} mode={null}>
            {message}
          </NoticeBar>
        ))}
      </div>
    </div>
  );
};

export default AutoNoticeBar;
