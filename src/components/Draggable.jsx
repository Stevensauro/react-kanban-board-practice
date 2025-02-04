import { useRef, useEffect, useContext } from "react";
import { DraggablesContext } from "../store/draggables-context";

export default function Draggable({
  className = "",
  ...props
}) {
  
  const {
    isHoldingDraggable,
    selectedContainer,
    getDraggable,
    setIsMouseUp,
    setIsHoldingDraggable,
    setSelectedContainer,
    setIsMouseOnContainer
  } = useContext(DraggablesContext);

  const coordinates = useRef();

  const checkOnMouseCoords = (x, y) => {
    const checkpoint = ["backlog", "in-progress", "review", "done"];

    const elmnt = document.elementFromPoint(x, y);

    if (elmnt === null) return setIsMouseOnContainer(false);

    setIsMouseOnContainer(checkpoint.includes(elmnt.id));

    if (checkpoint.includes(elmnt.id)) setSelectedContainer(elmnt);
  };

  const copyToMouse = (elmnt, e) => {
    e.preventDefault();

    const copy = elmnt.cloneNode(true);

    copy.id = "copy";
    copy.style.position = "absolute";
    copy.style.width = `${elmnt.clientWidth}px`;

    document.body.append(copy);

    coordinates.current = {
      x: e.clientX - elmnt.offsetLeft,
      y: e.clientY - elmnt.offsetTop,
    };

    elmnt.hidden = true;

    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", () => dragEnd(elmnt));
  };

  function dragMove(e) {
    const elmnt = document.querySelector("#copy");

    if (elmnt === null) return;

    elmnt.style.pointerEvents = "none";

    elmnt.style.top = (e.clientY - coordinates.current.y).toString() + "px";
    elmnt.style.left = (e.clientX - coordinates.current.x).toString() + "px";

    checkOnMouseCoords(e.clientX, e.clientY);
  }

  function dragEnd(dragTarget) {
    const copiedTargetOnMouse = document.querySelector("#copy");
    dragTarget.hidden = false;

    if (copiedTargetOnMouse === null) return;

    document.querySelector("#copy").remove();

    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragEnd);

    setIsMouseUp(true);
    setIsHoldingDraggable(false);
  }

  const onDragStart = (e) => {
    setIsHoldingDraggable(true);
    setIsMouseUp(false);
    getDraggable(e.target);
    copyToMouse(e.target, e);
    dragMove(e);
  };

  const onMouseEnter = (e) => {
    const containerChildren = e.target.parentElement.childNodes;

    if (isHoldingDraggable) {
      if (Object.hasOwn(e.target.attributes, "style")) {
        const foundPercentage = e.target.attributes.style.value.match(/\d+%/);

        if (foundPercentage !== null) {
          const percentageValue = parseInt(foundPercentage[0].replace("%", ""));

          if (percentageValue > 0) {
            return (e.target.style.translate = "0 0%");
          }
        }
      }

      for (const [idx, draggable] of Object.entries(containerChildren)) {
        const arr = [...containerChildren];
        const targetId = arr.findIndex((elmnt) => elmnt === e.target);

        if (Number.parseInt(idx) >= targetId)
          draggable.style.translate = "0 150%";
      }
    }
  };

  useEffect(() => {
    const draggables = document.querySelectorAll("#draggable");

    draggables.forEach((draggable) => {
      if (Object.hasOwn(draggable.attributes, "style"))
        draggable.attributes.style.value = "";
    });
  }, [selectedContainer]);

  return (
    <div
      id="draggable"
      onDragStart={onDragStart}
      onMouseEnter={onMouseEnter}
      className={`bg-slate-100 min-h-20 h-fit max-h-56 rounded-md mb-6 relative ${className}`}
      draggable={true}
      {...props}
    >
      xd
    </div>
  );
}
