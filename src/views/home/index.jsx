import { useState, useRef } from "react";
import styled from "styled-components";
import { NoticeBar, Divider, List, Button, Grid } from "antd-mobile";
import { LuckyWheel, LuckyGrid } from "@lucky-canvas/react";
import "./index.css";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  flex-grow: 1; /* 占据剩余空间 */
`;

const BottomSection = styled.div`
  height: 40%;
`;

const CustomList = styled(List)`
  border-radius: 8px 8px 0 0; /* 设置整个List组件的圆角 */
  overflow: hidden; /* 确保子项不会溢出圆角 */
`;

const CustomListItem = styled(List.Item)`
  background-color: #8b5cf6; /* 设置List.Item的背景色 */
`;

export default () => {
  const [blocks] = useState([
    {
      padding: "68px",
      imgs: [
        {
          src: "/src/assets/bg-dial.png", // 按钮图片路径
          height: "100%", // 图片高度
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
  ]);
  const [prizes] = useState([
    {
      fonts: [
        { text: "999", top: "10%", fontSize: "16px" },
        { text: "TOC", top: "30%", fontSize: "16px" },
      ],
      imgs: [
        {
          src: "/src/assets/item-golden.png", // 按钮图片路径
          width: "68px", // 图片宽度
          height: "74px", // 图片高度
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
    {
      fonts: [{ text: "2" }],
      imgs: [
        {
          src: "/src/assets/item-white.png", // 按钮图片路径
          width: "68px", // 图片宽度
          height: "74px", // 图片高度
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
    {
      fonts: [{ text: "3" }],
      imgs: [
        {
          src: "/src/assets/item-golden.png", // 按钮图片路径
          width: "68px", // 图片宽度
          height: "74px", // 图片高度
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
    {
      fonts: [{ text: "4" }],
      imgs: [
        {
          src: "/src/assets/item-white.png", // 按钮图片路径
          width: "68px", // 图片宽度
          height: "74px", // 图片高度
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
    {
      fonts: [{ text: "5" }],
      imgs: [
        {
          src: "/src/assets/item-golden.png", // 按钮图片路径
          width: "68px", // 图片宽度
          height: "74px", // 图片高度
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
    {
      fonts: [{ text: "6" }],
      imgs: [
        {
          src: "/src/assets/item-white.png", // 按钮图片路径
          width: "68px", // 图片宽度
          height: "74px", // 图片高度
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
    {
      fonts: [{ text: "7" }],
      imgs: [
        {
          src: "/src/assets/item-golden.png", // 按钮图片路径
          width: "68px", // 图片宽度
          height: "74px", // 图片高度
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
    {
      fonts: [{ text: "8" }],
      imgs: [
        {
          src: "/src/assets/item-white.png", // 按钮图片路径
          width: "68px", // 图片宽度
          height: "74px", // 图片高度
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
    {
      fonts: [{ text: "9" }],
      imgs: [
        {
          src: "/src/assets/item-golden.png", // 按钮图片路径
          width: "68px", // 图片宽度
          height: "74px", // 图片高度
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
    {
      fonts: [{ text: "10" }],
      imgs: [
        {
          src: "/src/assets/item-white.png", // 按钮图片路径
          width: "68px", // 图片宽度
          height: "74px", // 图片高度
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
  ]);
  const [buttons] = useState([
    { radius: "40%", background: "#F8EFFF" },
    {
      pointer: true,
      imgs: [
        {
          src: "/src/assets/button-arrow.png", // 按钮图片路径
          width: "70px", // 图片宽度
          height: "106px", // 图片高度
          top: "-72px",
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
  ]);
  const myLucky = useRef();

  return (
    <Container>
      <TopSection>
        <NoticeBar
          content="这条通知可以关闭"
          color="alert"
          style={{ width: "100%" }}
        />

        <LuckyWheel
          height={"350px"}
          ref={myLucky}
          blocks={blocks}
          prizes={prizes}
          buttons={buttons}
          onStart={() => {
            // 点击抽奖按钮会触发star回调
            myLucky.current.play();
            setTimeout(() => {
              const index = (Math.random() * 6) >> 0;
              myLucky.current.stop(index);
            }, 2500);
          }}
          onEnd={(prize) => {
            // 抽奖结束会触发end回调
            alert("恭喜你抽到 " + prize.fonts[0].text + " 号奖品");
          }}
        />
      </TopSection>
      <BottomSection>
        <Divider style={{ borderColor: "#C4B5FD" }}>
          <div className="text-sm ">Balance 9,000,000 toc</div>
        </Divider>
        <CustomList>
          <CustomListItem>
            <Grid columns={2}>
              <Grid.Item>
                <div>Total 23 wins</div>
              </Grid.Item>
              <Grid.Item>
                <div className="flex justify-end"> 12:00 03-02, 2024</div>
              </Grid.Item>
            </Grid>
          </CustomListItem>
          <CustomListItem>
            <Grid columns={2}>
              <Grid.Item>
                <div>03-02 12:00:56</div>
              </Grid.Item>
              <Grid.Item>
                <div className="flex justify-end">Gain 100 toc</div>
              </Grid.Item>
            </Grid>
          </CustomListItem>
          <CustomListItem>
            <Grid columns={2}>
              <Grid.Item>
                <div>03-02 12:00:56</div>
              </Grid.Item>
              <Grid.Item>
                <div className="flex justify-end">Gain 100 toc</div>
              </Grid.Item>
            </Grid>
          </CustomListItem>
          <CustomListItem className="last-item-box">
            <Grid columns={2}>
              <Grid.Item>
                <div>03-02 12:00:56</div>
              </Grid.Item>
              <Grid.Item>
                <div className="flex justify-end">Gain 100 toc</div>
              </Grid.Item>
            </Grid>
          </CustomListItem>
          <CustomListItem className="button-item-box">
            <Button
              block
              size="middle"
              style={{
                backgroundColor: "#A894FF",
                border: "none",
                color: "#000000",
              }}
            >
              More
            </Button>
          </CustomListItem>
        </CustomList>
      </BottomSection>
    </Container>
  );
};
