import { useState } from "react";
import backgroundDesktopDark from "./assets/bg-desktop-dark.jpg";
import backgroundDesktopLight from "./assets/bg-desktop-light.jpg";
import backgroundMobileDark from "./assets/bg-mobile-dark.jpg";
import backgroundMobileLight from "./assets/bg-mobile-light.jpg";
import iconDark from "./assets/icon-moon.svg";
import iconLight from "./assets/icon-sun.svg";

function TodoElement({
  data,
  setElementData,
  primaryTextColor,
  primaryBackgroundColor,
}: {
  data: any;
  setElementData: (elementData: any) => void;
  primaryTextColor: string;
  primaryBackgroundColor: string;
}) {
  const todoData = data[0];
  const elementData = data[1];
  const elementIndex = data[2];

  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);

  if (elementData == "CreateButton") {
    return (
      <div
        className="container p-4 rounded mb-4 d-flex flex-row"
        style={{ backgroundColor: primaryBackgroundColor }}
      >
        <input
          className="form-check-input p-2"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        ></input>
        <div className="container">
          <input
            className={`${
              "text-" + primaryTextColor
            } bg-transparent border-0 ms-3 w-100`}
            placeholder="Create a new todo..."
            type="text"
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                setElementData([
                  ...todoData,
                  { checked: checked, text: inputValue },
                ]);
                setInputValue("");
              }
            }}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          ></input>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`container p-2 ${elementIndex == 0 && "rounded-top pt-4"}`}
        style={{ backgroundColor: primaryBackgroundColor }}
      >
        <input
          role="button"
          className="form-check-input rounded-circle p-2"
          type="checkbox"
          checked={elementData.checked}
          onChange={() =>
            setElementData(
              todoData.map((elementData: any, index: number) => {
                if (index == elementIndex) {
                  return { ...elementData, checked: !elementData.checked };
                } else {
                  return elementData;
                }
              })
            )
          }
          id={elementIndex}
        ></input>
        <label
          role="button"
          className={`form-check-label ms-3 ${"text-" + primaryTextColor} ${
            elementData.checked && "text-decoration-line-through"
          }`}
          htmlFor={elementIndex}
        >
          {elementData.text}
        </label>
        <hr className="mt-4" style={{ color: primaryTextColor }} />
      </div>
    );
  }
}

function App() {
  const isMobile = window.matchMedia("(orientation: portrait)").matches;

  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const backgroundData = isDarkMode
    ? [isMobile ? backgroundMobileDark : backgroundDesktopDark, "#181824"]
    : [isMobile ? backgroundMobileLight : backgroundDesktopLight, "#fafafa"];

  const themeIcon = isDarkMode ? iconLight : iconDark;
  const primaryTextColor = isDarkMode ? "white" : "black";
  const secondaryTextColor = isDarkMode ? "#4c4d68" : "#94949e";
  const primaryBackgroundColor = isDarkMode ? "#25273c" : "white";

  const [todoData, setTodoData] = useState([
    { checked: true, text: "Complete online JavaScript course" },
    { checked: false, text: "Jog around the park 3x" },
    { checked: false, text: "10 minutes meditation" },
    { checked: false, text: "Read for 1 hour" },
    { checked: false, text: "Pick up groceries" },
    { checked: false, text: "Complete Todo App on Frontend Mentor" },
  ]);
  const [filterActive, setFilterActive] = useState("All");
  const filteredData = todoData.filter((elementData: any) => {
    if (filterActive == "All") {
      return true;
    } else if (filterActive == "Active") {
      return !elementData.checked;
    } else if (filterActive == "Completed") {
      return elementData.checked;
    }
  });
  return (
    <div
      className="w-100 h-100 m-0 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url("${backgroundData[0]}")`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundColor: backgroundData[1],
      }}
    >
      <div className={`container ${isMobile ? "w-100" : "w-50"}`}>
        <div className="container d-flex justify-content-between align-items-center mb-4">
          <h1 className={`display-3 fw-bold text-white`}>T O D O</h1>
          <img
            role="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="h-100"
            src={themeIcon}
            alt=""
          />
        </div>
        <TodoElement
          data={[filteredData, "CreateButton"]}
          setElementData={setTodoData}
          primaryTextColor={primaryTextColor}
          primaryBackgroundColor={primaryBackgroundColor}
        ></TodoElement>
        <div
          className="container rounded"
          style={{
            backgroundColor: primaryBackgroundColor,
            maxHeight: "60vh",
            overflow: "auto",
          }}
        >
          {filteredData.map((element, index) => {
            return (
              <TodoElement
                data={[filteredData, element, index]}
                setElementData={setTodoData}
                primaryTextColor={primaryTextColor}
                primaryBackgroundColor={primaryBackgroundColor}
              ></TodoElement>
            );
          })}
          <div className="container d-flex justify-content-between align-items-center mb-3">
            <p className="m-0" style={{ color: secondaryTextColor }}>
              {todoData.filter((element) => element.checked == false).length}{" "}
              items left
            </p>
            {!isMobile && (
              <div>
                {["All", "Active", "Completed"].map((element) => (
                  <button
                    style={
                      element != filterActive
                        ? { color: secondaryTextColor }
                        : {}
                    }
                    className={`btn  ${
                      element == filterActive && "text-primary"
                    }
                      }`}
                    onClick={() => setFilterActive(element)}
                  >
                    {element}
                  </button>
                ))}
              </div>
            )}
            <button
              className="btn"
              style={{ color: secondaryTextColor }}
              onClick={() =>
                setTodoData(
                  todoData.filter((element) => element.checked == false)
                )
              }
            >
              Clear Completed
            </button>
          </div>
        </div>
        {isMobile && (
          <div
            className="container d-flex justify-content-center align-items-center my-3 p-2 rounded"
            style={{ backgroundColor: primaryBackgroundColor }}
          >
            {["All", "Active", "Completed"].map((element) => (
              <button
                style={
                  element != filterActive ? { color: secondaryTextColor } : {}
                }
                className={`btn  ${element == filterActive && "text-primary"}
                    }`}
                onClick={() => setFilterActive(element)}
              >
                {element}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
