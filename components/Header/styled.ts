import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const StyledHeader = styled.header(() => {
  return css`
    max-width: 1280px;
    margin: 0 auto;
    padding: 15px 0;
  `;
});

export const StyledInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .grid {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 30px;
    justify-content: flex-start;
    align-items: center;
  }

  a {
    color: inherit;
    font-size: 18px;

    &:hover {
      color: #cf102d;
    }
  }
`;

export const StyledActions = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
  align-items: center;

  .grid {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 30px;
    justify-content: flex-start;
    align-items: center;
  }
`;
