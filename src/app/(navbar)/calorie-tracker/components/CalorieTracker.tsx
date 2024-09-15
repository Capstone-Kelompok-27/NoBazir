import React from "react";
import SearchCalorie from "./SearchCalorie";
import CalorieList from "./CalorieList";
import CreateCalorie from "./CreateCalorie";
import EditCalorie from "./EditCalorie";
import CalorieCalculator from "./CalorieCalculator";

const CalorieTracker = () => {
  return (
    <div className="mt-20 flex w-full flex-col items-center">
      <div className="my-12 text-3xl font-bold">Calorie Tracker</div>
      <CalorieCalculator />
      <CreateCalorie />
      <SearchCalorie />
      <CalorieList />
      {/* <EditCalorie /> */}
    </div>
  );
};

export default CalorieTracker;
