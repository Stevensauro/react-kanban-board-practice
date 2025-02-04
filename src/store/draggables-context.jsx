import { createContext, useState, useEffect } from "react";

export const DraggablesContext = createContext({
  currentDraggable: null,
  selectedContainer: null,
  isMouseUp: false,
  isHoldingDraggable: false,
  isMouseOnContainer: false,
  getDraggable: ()=>{},
  setSelectedContainer: ()=>{},
  setIsMouseUp: ()=>{},
  setIsMouseOnContainer: ()=>{},
  setIsHoldingDraggable: ()=>{}
});

export default function DraggablesContextProvider({ children }) {

  const [currentDraggable, setCurrentDraggable] = useState(null);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [isMouseUp, setIsMouseUp] = useState(false);
  const [isHoldingDraggable, setIsHoldingDraggable] = useState(false);
  const [isMouseOnContainer, setIsMouseOnContainer] = useState(false);

  useEffect(() => {
    if (
      selectedContainer !== null &&
      currentDraggable !== null &&
      isMouseUp &&
      isMouseOnContainer
    ) {
      const fragment = document.createDocumentFragment();
      const containerArr = [...selectedContainer.childNodes];
      const testArr = createNewChildArray(containerArr);

      if (selectedContainer.childNodes.length === 0) {
        selectedContainer.append(currentDraggable);
        return;
      }

      fragment.replaceChildren(...testArr);
      selectedContainer.replaceChildren(...fragment.children);

      selectedContainer.childNodes.forEach((child) => {
        const childAttrMap = child.attributes;
        if (Object.hasOwn(childAttrMap, "style"))
          childAttrMap.removeNamedItem("style");
      });

      setIsMouseUp(false);
      setIsMouseOnContainer(false);
      setSelectedContainer(null);
      setCurrentDraggable(null);
    }
  }, [selectedContainer, currentDraggable, isMouseUp, isMouseOnContainer]);

  const getDraggable = (draggable) => {
    setCurrentDraggable(draggable);
  };

  const createNewChildArray = (arr) => {
    let newArr = [];

    const replacingOnIndex = arr.findIndex((child) => {
      if (Object.hasOwn(child.attributes, "style")) {
        return child.attributes.style.value === "translate: 0px 150%;";
      }
    });

    if (replacingOnIndex === 0) {
      newArr = [currentDraggable, ...arr.slice(0)];
    } else if (replacingOnIndex === -1) {
      newArr = [...arr.slice(0), currentDraggable];
    } else {
      newArr = [
        ...arr.slice(0, replacingOnIndex),
        currentDraggable,
        ...arr.slice(replacingOnIndex),
      ];
    }

    return newArr;
  };

  const ctxValue = {
    currentDraggable,
    selectedContainer,
    isMouseUp,
    isHoldingDraggable,
    isMouseOnContainer,
    getDraggable,
    setSelectedContainer,
    setIsHoldingDraggable,
    setIsMouseUp,
    setIsMouseOnContainer,
  }

  return <DraggablesContext.Provider value={ctxValue}>{children}</DraggablesContext.Provider>
}
