import React from "react";
import { NoticeBar } from "antd-mobile";
import { motion } from "framer-motion";
import "./index.css"; // 引入自定义的CSS

const AutoNoticeBar = ({ messages }) => {
  return (
    <motion.div
      animate={{ y: [0, -100, 0] }} // 从 0 移动到 -100 再返回到 0
      transition={{ duration: 2, repeat: Infinity }} // 设置动画持续时间为 2 秒，并无限循环
    >
      <div className="vertical-scroll-content">
        {messages.map((message, index) => (
          <NoticeBar key={index} mode={null}>
            {message}
          </NoticeBar>
        ))}
      </div>
      垂直运动的元素
    </motion.div>
  );
};

export default AutoNoticeBar;
