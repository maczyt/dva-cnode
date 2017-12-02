import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, Badge } from 'antd-mobile';
import { listSelector } from '../../models/item/selectors';

const Item = List.Item;

const mapStateToProps = (state, ownProps) => {
  return {
    list: listSelector(state, ownProps),
  };
};

export default connect(mapStateToProps)(({ list, dispatch }) => {
  function toItem(itemId) {
    dispatch(routerRedux.push(`/item/${itemId}`));
  }
  return (
    <List>
      {
        list.map(item =>
          <Item
            key={item.id}
            thumb={item.author.avatar_url}
            arrow="horizontal"
            onClick={toItem.bind(this, item.id)}
            extra={<div><Badge text={item.tab} style={{ marginRight: 12, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} /><Badge text={item.visit_count} overflowCount={99} /></div>}        
          >
            {item.title}
          </Item>
        )
      }
    </List>
  );
});
