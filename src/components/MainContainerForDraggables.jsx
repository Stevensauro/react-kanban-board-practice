import ContainerForDraggables from "./ContainerForDraggables";

export default function MainContainerForDraggables() {
  return (
    <section className="mt-28 flex gap-x-10 justify-center">
      <ContainerForDraggables
        id="backlog"
        title={"Backlog"}
        titleColor={"red"}
      />
      <ContainerForDraggables
        id="in-progress"
        title={"in progress"}
        titleColor={"yellow"}
      />
      <ContainerForDraggables
        id="review"
        title={"review"}
        titleColor={"green"}
      />
      <ContainerForDraggables id="done" title={"done"} titleColor={"blue"} />
    </section>
  );
}
