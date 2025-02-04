import { useRef } from "react";
import Draggable from "./Draggable";

export default function ContainerForDraggables({
  id,
  title = "title",
  titleColor,
}) {
  const containerRef = useRef();

  const tailwindTitleColor = () => {
    switch (titleColor) {
      case "red":
        return "bg-red-400";
      case "yellow":
        return "bg-yellow-400";
      case "green":
        return "bg-green-400";
      case "blue":
        return "bg-blue-400";
      default:
        return "bg-zinc-400";
    }
  };

  return (
    <div>
      <div
        className={`flex items-center justify-center ${tailwindTitleColor()} h-20`}
      >
        <h1 className="text-3xl font-bold text-zinc-900">
          {title.toUpperCase()}
        </h1>
      </div>
      <div
        ref={containerRef}
        id={id}
        className="container-for-draggables px-10 py-3 gap-2 bg-slate-300 w-80 h-[600px] overflow-x-hidden overflow-y-scroll"
      >
        <Draggable />
        <Draggable />
        <Draggable />
      </div>
    </div>
  );
}
