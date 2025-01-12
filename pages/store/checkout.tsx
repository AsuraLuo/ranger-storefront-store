import styled from "@emotion/styled";

export const StyleGrid = styled.div`
  display: grid;
  margin-top: 30px;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  grid-auto-rows: auto;
  align-items: stretch;

  .item {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #d9d9d9;
    border-radius: 8px;

    &:first-of-type {
      height: 500px;
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }

    &:nth-of-type(4) {
      height: 100px;
    }
  }
`;

const Page = () => {
  return (
    <div>
      <h1>Checkout Page</h1>
      <StyleGrid>
        <div className="item">Checkout Item 1</div>
        <div className="item">Checkout Item 2</div>
        <div className="item">Checkout Item 3</div>
        <div className="item">Checkout Item 4</div>
        <div className="item">Checkout Item 5</div>
        <div className="item">Checkout Item 6</div>
        <div className="item">Checkout Item 7</div>
        <div className="item">Checkout Item 8</div>
        <div className="item">Checkout Item 9</div>
        <div className="item">Checkout Item 10</div>
        <div className="item">Checkout Item 11</div>
        <div className="item">Checkout Item 12</div>
      </StyleGrid>
    </div>
  );
};

export default Page;
