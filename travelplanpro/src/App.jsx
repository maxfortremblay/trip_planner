import React from "react";
import { CalendarProvider } from "./contexts/CalendarContext";
import Calendar from "./components/Calendar";

function App() {
  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  );
}

export default App;
