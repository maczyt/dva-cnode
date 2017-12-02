import React from 'react';
import { connect } from 'dva';
import Title from 'react-title-component';
import Item from '../components/Item';

const ItemPage = (props) => {
  if (props.item.id) {
    props.dispatch({ type: 'item/fetchComments', payload: props.item.id });
    return (
      <div>
        <Title render={props.item.title} />
        <Item {...props} />
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state, ownProps) => {
  const { match: { params } } = ownProps;
  const { itemId } = params;
  const { item: { itemsById } } = state;
  return { item: itemsById[itemId] || {} };
};

export default connect(mapStateToProps)(ItemPage);
