import styled from "@emotion/styled";

export const StyleGrid = styled.div`
  display: grid;
  margin-top: 30px;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  .item {
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #d9d9d9;
    border-radius: 8px;

    &:first-of-type {
      grid-column: 1 / 3;
      grid-row: 1 / 3;
    }
  }
`;

const Page = () => {
  return (
    <div>
      <h1>Cart Page</h1>
      <StyleGrid>
        <div className="item">Cart Item 1</div>
        <div className="item">Cart Item 2</div>
        <div className="item">Cart Item 3</div>
        <div className="item">Cart Item 4</div>
        <div className="item">Cart Item 5</div>
        <div className="item">Cart Item 6</div>
        <div className="item">Cart Item 7</div>
        <div className="item">Cart Item 8</div>
        <div className="item">Cart Item 9</div>
        <div className="item">Cart Item 10</div>
        <div className="item">Cart Item 11</div>
        <div className="item">Cart Item 12</div>
      </StyleGrid>
    </div>
  );
};

export default Page;
