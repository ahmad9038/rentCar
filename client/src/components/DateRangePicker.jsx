import React, { useState } from "react";
import DatePicker from "react-datepicker";

const DateRangePicker = () => {
  const [date, setDate] = useState(new Date());

  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");
  return (
    <div>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        onCalendarClose={handleCalendarClose}
        onCalendarOpen={handleCalendarOpen}
      />
    </div>
  );
};

export default DateRangePicker;
