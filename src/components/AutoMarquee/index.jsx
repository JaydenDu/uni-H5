import React from "react";
import styled, { keyframes } from "styled-components";

// 定义滚动动画
const scrollUp = keyframes`
  0% {
    top: 100%;
  }
  100% {
    top: -100%;
  }
`;

// 定义滚动消息容器和文本样式
const ScrollingMessages = styled.div`
  width: 100%;
  height: 50px; /* 限制容器的高度 */
  overflow: hidden;
  position: relative;
`;

const ScrollingText = styled.p`
  position: absolute;
  width: 100%;
  height: 50px;
  color: #ffffff;
  animation: ${scrollUp} 6s infinite linear;
`;

export default () => {
  return (
    <ScrollingMessages>
      <ScrollingText>这里是滚动的消息内容</ScrollingText>
      <ScrollingText>这里是滚动的消息内容</ScrollingText>
      <ScrollingText>这里是滚动的消息内容</ScrollingText>
      <ScrollingText>这里是滚动的消息内容</ScrollingText>
      <ScrollingText>这里是滚动的消息内容</ScrollingText>
    </ScrollingMessages>
  );
};
