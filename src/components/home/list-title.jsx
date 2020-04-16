import React from 'react';
import '../../styles/components/home/list-title.scss';

export const ListTitle = (props) => {
  return (
    <div className="list-title-container">
      {props.title}
    </div>
  );
}