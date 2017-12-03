import React from 'react';
import moment from 'moment';
import { List } from 'antd-mobile';
import Markdown from 'markdown-to-jsx';
import styles from './item.less';
import star from './icon/star.svg';

const Item = List.Item;
const Brief = Item.Brief;

const CommentItem = (props) => {
  const { author, create_at, type, content, ups } = props;
  const time = type === 'jc' ? moment(create_at).format('YYYY年M月D日') : moment(create_at).fromNow();
  return (
    <div className={`${styles.item} commentItem`}>
      <Item extra={<div className={styles.extra}>{ups.length} <img src={star} alt="赞" /></div>} align="top" thumb={author.avatar_url} multipleLine>
        Title <Brief>{time}</Brief>
        <p>
          <Markdown>{content}</Markdown>
        </p>
      </Item>
    </div>
  );
};

export default CommentItem;
