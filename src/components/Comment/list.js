import React from 'react';
import { List } from 'antd-mobile';
import { connect } from 'dva';
import moment from 'moment';
import Item from './item';
import styles from './list.less';

const CommentList = (props) => {
  const { label, type, comments = [] } = props;
  return (
    <div className={styles.list}>
      <List renderHeader={() => label}>
        {comments.map(comment => {
          return <Item key={comment.id} type={type} {...comment} />
        })}
      </List>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { item: { commentsById } } = state;
  const { id, type } = ownProps;
  const data = commentsById[id] || [];
  let comments = [];
  if (type === 'zx') {
    comments = data.sort((a, b) => +moment(b.create_at) - +moment(a.create_at)).slice(0, 3);
  } else if (type === 'jc') {
    comments = data.sort((a, b) => b.ups.length - a.ups.length).slice(0, 5);
  }
  return { comments };
};

export default connect(mapStateToProps)(CommentList);
