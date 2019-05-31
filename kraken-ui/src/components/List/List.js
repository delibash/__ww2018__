import React from 'react';
import PropTypes from 'prop-types';

const List = ({list, ...props}) => {
  return (
    <props.styled>
      {list.map((item, i) => <li key={i}>{props.wrapper ? <props.wrapper>{item}</props.wrapper>: item}</li>)}
    </props.styled>
  );
};

List.propTypes = {
  wrapper: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.element,
    PropTypes.func
  ]),
  list: PropTypes.array.isRequired,
  styled: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.element
  ])
};

export default List;