import React, { useState } from 'react';
import { Flex, Rate } from 'antd';

const RatingRange = ({ onChange }) => {
  const [value, setValue] = useState(0);

  const handleChange = (value) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Flex gap="middle" vertical>
      <Rate onChange={handleChange} value={value} />
    </Flex>
  );
};

export default RatingRange;
