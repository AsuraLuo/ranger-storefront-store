import { useEffect } from "react";
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
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }
  }
`;

const Page = () => {
  const targetName: string = "grid-container";

  useEffect(() => {
    let resizeTimeout: any;

    function setEqualHeight(containerSelector: string) {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const items: any = container.children;
      let minHeight = 0;

      // Reset height before calculation
      for (const item of items) {
        item.style.maxHeight = "auto";
      }

      // Find the maximum height
      for (const item of items) {
        if (minHeight > 0) {
          minHeight = Math.min(minHeight, item.offsetHeight);
        } else {
          minHeight = item.offsetHeight;
        }
      }

      // Apply the maximum height to all items
      for (const item of items) {
        item.style.maxHeight = minHeight + "px";
      }
    }

    function onResize() {
      if (resizeTimeout) cancelAnimationFrame(resizeTimeout);

      resizeTimeout = requestAnimationFrame(() => {
        setEqualHeight(`.${targetName}`);
      });
    }

    // // Call the function after DOM content is loaded
    setEqualHeight(`.${targetName}`);

    // Reapply heights on window resize
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div>
      <h1>Checkout Page</h1>
      <StyleGrid className={targetName}>
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
