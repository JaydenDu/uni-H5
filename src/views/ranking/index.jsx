import React from "react";
import styled from "styled-components";
import { NavBar, Space, Toast, Image, List, Grid } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Container = styled.div`
  height: 100vh;
  color: #ffffff;
`;

const CustomList = styled(List)``;

const CustomListItem = styled(List.Item)`
  background-color: #8b5cf6; /* 设置List.Item的背景色 */
`;

export default () => {
  const right = (
    <span className="flex justify-end">
      <Image
        src={"/src/assets/surprised.png"}
        width={40}
        height={36}
        fit="fill"
      />
    </span>
  );
  const navigate = useNavigate();

  const routerLinkToHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <div>
        <motion.div
          animate={{ y: [0, -100, 0] }} // 从 0 移动到 -100 再返回到 0
          transition={{ duration: 2, repeat: Infinity }} // 设置动画持续时间为 2 秒，并无限循环
        >
          垂直运动的元素
        </motion.div>
        <NavBar back="Back" right={right} onBack={routerLinkToHome}>
          Record
        </NavBar>
      </div>

      <div
        style={{
          padding: "10px 0",
          background: "#8b5cf6",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            height: "88vh",
            overflowY: "auto",
          }}
        >
          <CustomList>
            <CustomListItem>
              <Grid columns={2}>
                <Grid.Item>
                  <div>Total 23 wins</div>
                </Grid.Item>
                <Grid.Item>
                  <div className="flex justify-end">12:00 03-02</div>
                </Grid.Item>
              </Grid>
            </CustomListItem>
            {[1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 5, 5].map(
              (item, index) => (
                <CustomListItem>
                  <Grid columns={3} style={{ padding: "0 14px" }}>
                    <Grid.Item>
                      <div>{index}</div>
                    </Grid.Item>
                    <Grid.Item>
                      <div>Total 23</div>
                    </Grid.Item>
                    <Grid.Item>
                      <div className="flex justify-end"> 12:00</div>
                    </Grid.Item>
                  </Grid>
                </CustomListItem>
              )
            )}
          </CustomList>
        </div>
      </div>
    </Container>
  );
};
