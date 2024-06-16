import React from 'react';
import { Slider } from 'antd';
const DateRange = () => (
  <Slider
    defaultValue={2024}
    tooltip={{
      open: true,
    }}
    min={1990}
    max={2024}
  />
);
export default DateRange;