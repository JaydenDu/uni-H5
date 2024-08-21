import React from "react";
import styled from "styled-components";
import { NavBar, Space, Toast, Image, List, Grid } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  color: #ffffff;
`;

const CustomList = styled(List)`
  overflow: hidden; /* 确保子项不会溢出圆角 */
`;

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
        <NavBar back="Back" right={right} onBack={routerLinkToHome}>
          Record
        </NavBar>
      </div>
      <div
        style={{
          height: "88vh",
          background: "#8b5cf6",
          overflowY: "auto",
          borderRadius: "8px",
        }}
      >
        <CustomList>
          {[1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 5, 5].map((item) => (
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
          ))}
        </CustomList>
      </div>
    </Container>
  );
};
