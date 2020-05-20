import React from "react";
import Navigator from "./Navigator";

export default function App() {
  React.useEffect(() => {
    console.disableYellowBox = true;
  }, []);
  return <Navigator />;
}
