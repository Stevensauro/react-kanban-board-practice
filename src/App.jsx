import MainContainerForDraggables from "./components/MainContainerForDraggables";
import DraggablesContextProvider from "./store/draggables-context";

function App() {
  return (
    <DraggablesContextProvider>
      <MainContainerForDraggables />
    </DraggablesContextProvider>
  );
}

export default App;
