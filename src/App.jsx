import Table from "./components/Table";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import JsonInput from "./components/JsonInput";

function App() {
  return (
    <Provider store={store}>
      <JsonInput />
      <Table />
    </Provider>
  );
}

export default App;
