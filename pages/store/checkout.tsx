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
  const targetName: string = "grid-container";

  useEffect(() => {
    let resizeTimeout: any;

    function setRowEqualHeight(containerSelector) {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const items = Array.from(container.children);
      const computedStyle = window.getComputedStyle(container);
      const columnCount = parseInt(
        computedStyle.getPropertyValue("grid-template-columns").split(" ")
          .length,
        10
      );

      // Reset min-height for all items
      items.forEach((item) => (item.style.minHeight = "auto"));

      // Group items into rows based on their grid-row and grid-column
      let rows = [];
      let rowMap = {}; // Store the rows by their grid-row number
      let currentRow = 1; // Start from the first row

      items.forEach((item) => {
        // Handle missing grid-row-start and grid-column-start (defaults to 1)
        const gridRowStart =
          parseInt(
            window.getComputedStyle(item).getPropertyValue("grid-row-start")
          ) || 1;
        const gridRowEnd =
          parseInt(
            window.getComputedStyle(item).getPropertyValue("grid-row-end")
          ) || gridRowStart + 1;
        const gridColumnStart =
          parseInt(
            window.getComputedStyle(item).getPropertyValue("grid-column-start")
          ) || 1;
        const gridColumnEnd =
          parseInt(
            window.getComputedStyle(item).getPropertyValue("grid-column-end")
          ) || gridColumnStart + 1;
        const spanCols = gridColumnEnd - gridColumnStart; // Number of columns this item spans
        const spanRows = gridRowEnd - gridRowStart;

        console.info(spanCols, spanRows);
        // Store each item in the rows array, but handle row calculation correctly
        for (let row = gridRowStart; row < gridRowEnd; row++) {
          if (!rowMap[row]) {
            rowMap[row] = [];
          }
          rowMap[row].push({ item, spanCols, spanRows });
        }

        // Optionally, you can log the `rows` and `spanCols` values for debugging purposes
        rows.push({ item, spanCols, spanRows });
      });

      // Optionally log rows for debugging
      console.log("Rows:", rows);

      // Correct row calculation: Each row should respect column spans
      let rowIndex = 1;
      let rowCount = Math.max(...Object.keys(rowMap).map(Number));

      // Calculate max height for each row and set it
      for (let row = 1; row <= rowCount; row++) {
        const rowItems = rowMap[row] || [];
        const maxHeight = Math.max(
          ...rowItems.map((obj) => obj.item.offsetHeight)
        );
        rowItems.forEach(
          (obj) => (obj.item.style.minHeight = maxHeight + "px")
        );
      }
    }

    function onResize() {
      if (resizeTimeout) cancelAnimationFrame(resizeTimeout);

      resizeTimeout = requestAnimationFrame(() => {
        setRowEqualHeight(`.${targetName}`);
      });
    }

    // // Call the function after DOM content is loaded
    setRowEqualHeight(`.${targetName}`);

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
