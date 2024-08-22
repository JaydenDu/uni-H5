import { useState, useRef } from "react";
import styled from "styled-components";
import {
  NoticeBar,
  Divider,
  List,
  Button,
  Grid,
  Image,
  Modal,
  Space,
  Toast,
} from "antd-mobile";
import { LuckyWheel, LuckyGrid } from "@lucky-canvas/react";
import { useNavigate } from "react-router-dom";
import { XconTrumpet } from "./../../assets";
import AutoNoticeBar from "../../components/AutoNoticeBar";

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
  height: 48%;
`;

const CustomList = styled(List)`
  border-radius: 8px 8px 0 0; /* 设置整个List组件的圆角 */
  overflow: hidden; /* 确保子项不会溢出圆角 */
`;

const CustomListItem = styled(List.Item)`
  background-color: #8b5cf6; /* 设置List.Item的背景色 */
`;

export default () => {
  const navigate = useNavigate();
  const [blocks] = useState([
    {
      padding: "40px",
      imgs: [
        {
          src: "/src/assets/bg-dial.png",
          width: "360px",
          height: "360px",
          top: "-30px",
          rotate: true,
        },
      ],
    },
  ]);
  const [prizes] = useState([
    {
      fonts: [
        { text: "99", top: "10%", fontSize: "16px" },
        { text: "TC", top: "30%", fontSize: "16px" },
      ],
      imgs: [
        {
          src: "/src/assets/item-golden.png", // 按钮图片路径
          width: "68px", // 图片宽度
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
          height: "106px", // 图片高度
          top: "-70px",
          rotate: true, // 是否随转盘一起旋转
        },
      ],
    },
  ]);
  const myLucky = useRef();
  const messages = [
    "Message 1: This is a test message.",
    "Message 2: Another message comes here.",
    "Message 3: More messages to show.",
    "Message 4: This is the last message.",
  ];

  return (
    <Container>
      <TopSection>
        <AutoNoticeBar messages={messages} />
        <NoticeBar
          content="恭喜卡巴斯基...获得了99 USDT恭喜卡巴斯基...获得了99 USDT恭喜卡巴斯基...获得了99 USDT恭喜卡巴斯基...获得了99 USDT恭喜卡巴斯基...获得了99 USDT恭喜卡巴斯基...获得了99 USDT"
          icon={<XconTrumpet />}
          style={{
            paddingLeft: "20px",
            marginBottom: "20px",
            backgroundColor: "transparent",
            borderImage:
              "linear-gradient(to right, #390279, #B16DFF 8%, #B16DFF 88%, #4B0277) 1",
          }}
        />
        <div className="relative flex flex-col align-center ">
          <div style={{ position: "relative", zIndex: 1 }}>
            <Image
              src={"/src/assets/lucky.png"}
              style={{ marginBottom: "-30px" }}
            />
            <span
              className="absolute right-10 text-white"
              style={{ bottom: "-16px", fontSize: "20px" }}
              onTouchStart={() => {
                Modal.show({
                  title: "Rule",
                  bodyClassName: "modal-box",
                  content: (
                    <div style={{ overflowY: "auto" }}>
                      <p>
                        There’s a new art gallery in Yerevan, Armenia. You’ll
                        find a sleek space, tasteful lighting, and creative
                        works of art. Sculptures that look like eyeballs are
                        emblazoned with bursts of color — fiery reds, bold
                        yellows, soothing blues.
                      </p>
                      <p>
                        But there’s a twist. Each eyeball is linked to a
                        corresponding NFT, meaning it’s a blend of the physical
                        and the digital.There’s a new art gallery in Yerevan,
                        Armenia. You’ll find a sleek space, tasteful lighting,
                        and creative works of art. Sculptures that look like
                        eyeballs are emblazoned with bursts of color — fiery
                        reds, bold yellows, soothing blues.
                      </p>
                      <p>
                        But there’s a twist. Each eyeball is linked to a
                        corresponding NFT, meaning it’s a blend of the physical
                        and the digital.There’s a new art gallery in Yerevan,
                        Armenia. You’ll find a sleek space, tasteful lighting,
                        and creative works of art. Sculptures that look like
                        eyeballs are emblazoned with bursts of color — fiery
                        reds, bold yellows, soothing blues.
                      </p>
                      <p>
                        But there’s a twist. Each eyeball is linked to a
                        corresponding NFT, meaning it’s a blend of the physical
                        and the digital.There’s a new art gallery in Yerevan,
                        Armenia. You’ll find a sleek space, tasteful lighting,
                        and creative works of art. Sculptures that look like
                        eyeballs are emblazoned with bursts of color — fiery
                        reds, bold yellows, soothing blues.
                      </p>
                    </div>
                  ),
                  showCloseButton: true,
                });
              }}
            >
              Rule
            </span>
          </div>

          <div className="flex justify-center align-center">
            <LuckyWheel
              width={"300px"}
              height={"300px"}
              ref={myLucky}
              blocks={blocks}
              prizes={prizes}
              buttons={buttons}
              onEnd={(prize) => {
                // 抽奖结束会触发end回调
                alert("恭喜你抽到 " + prize.fonts[0].text + " 号奖品");
              }}
            />
          </div>
          <div
            className="flex justify-center z-10"
            style={{ marginTop: "-20px" }}
          >
            <span
              onTouchStart={() => {
                myLucky.current.play();
                setTimeout(() => {
                  const index = (Math.random() * 6) >> 0;
                  myLucky.current.stop(index);
                }, 2500);
              }}
            >
              <Image
                src={"/src/assets/button-before.png"}
                style={{ width: "200px", height: "54px" }}
              />
            </span>
          </div>
        </div>
      </TopSection>
      <BottomSection>
        <Divider style={{ borderColor: "#C4B5FD" }}>
          <div className="text-sm text-white">Balance 9,000,000 toc</div>
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
              onTouchStart={() => {
                navigate("/ranking");
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
