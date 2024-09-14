import React from "react";

const TABLE_HEAD = ["Date", "Time", "Calorie", "Note", ""];
const TABLE_ROWS = [
  {
    date: "2024-14-09",
    time: "13:00",
    calorie: "200",
    note: "Nasi Goreng",
  },
  {
    date: "2024-14-09",
    time: "14:00",
    calorie: "200",
    note: "Nasi Goreng",
  },
  {
    date: "2024-14-09",
    time: "15:00",
    calorie: "200",
    note: "Nasi Goreng",
  },
];

const CalorieList = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="w-5/6 overflow-hidden overflow-x-auto rounded-2xl shadow-md lg:w-3/5">
        <table className="w-full min-w-56 table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-slate-200 bg-gray-200 p-4 text-slate-600"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ date, time, calorie, note }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr className="text-slate-500 odd:bg-white even:bg-slate-100/50">
                  <td className={classes + " min-w-20 text-nowrap"}>{date}</td>
                  <td className={classes}>{time}</td>
                  <td className={classes}>{calorie}</td>
                  <td className={classes}>{note}</td>
                  <td className={classes + " w-20"}>
                    <div>Edit</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalorieList;
