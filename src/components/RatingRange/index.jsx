import React, { useState } from 'react';
import { Flex, Rate } from 'antd';
const desc = ['ужасно', 'плохо', 'нормально', 'отлично', 'прекрасно'];
const RatingRange = () => {
  const [value, setValue] = useState(0);
  return (
    <Flex gap="middle" vertical>
      <Rate tooltips={desc} onChange={setValue} value={value} />
      {value ? <span style={{backgroundColor: blue}}>{desc[value - 1]}</span> : null}
    </Flex>
  );
};
export default RatingRange;