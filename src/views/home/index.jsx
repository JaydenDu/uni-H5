import React from "react";
import styled from "styled-components";
import { NoticeBar, Divider, List, Button } from "antd-mobile";
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
  return (
    <Container>
      <TopSection>
        <div>
          <NoticeBar
            content="这条通知可以关闭"
            color="alert"
            style={{ width: "100%" }}
          />
        </div>
      </TopSection>
      <BottomSection>
        <Divider style={{ borderColor: "#C4B5FD" }}>
          <div className="text-sm ">Balance 9,000,000 toc</div>
        </Divider>
        <CustomList>
          <CustomListItem>Item 1</CustomListItem>
          <CustomListItem>Item 2</CustomListItem>
          <CustomListItem>Item 3</CustomListItem>
          <CustomListItem style={{ border: "none" }}>Item 4</CustomListItem>
          <CustomListItem>
            <Button
              block
              size="middle"
              style={{
                backgroundColor: "#A894FF",
                border: "none",
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
