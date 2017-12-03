import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Card, NavBar, Icon, Badge } from 'antd-mobile';
import moment from 'moment';
import { CreateComment, CommentList } from '../Comment';
import styles from './Item.less';

moment.locale('zh-cn');

const Section = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
const TableWrap = ({ children, ...props }) => (
  <div {...props}><table>{children}</table></div>
);

export default ({ item, history }) => {
  const { content, title, top, author, id } = item;
  return (
    <div style={{paddingBottom: '70px'}}>
      <NavBar
        mode={'light'}
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
        className={styles.navbar}
      >
        <h1 className={styles.title}>{title}</h1>
      </NavBar>
      <Card className={styles.card}>
        <Card.Header 
          thumb={author.avatar_url}
          title={
            <div className={styles.header}>
              <div>作者: {author.loginname}</div>
              <div>{ top && <Badge text="置顶" hot /> }</div>
              <div>
                <Badge text={`访问量: ${item.visit_count}`} overflowCount={20000} style={{ marginRight: 10, padding: '0 3px', backgroundColor: '#f19736', borderRadius: 2 }} />
                <Badge text={`回复量: ${item.reply_count}`} overflowCount={100} style={{ padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} />
              </div>
            </div>
          }
        />
        <Card.Body>
          <Markdown
            options={{
              overrides: {
                div: {
                  component: Section,
                  props: {
                    className: styles.section,
                  },
                },
                table: {
                  component: TableWrap,
                  props: {
                    className: styles.tabelWrap,
                  },
                },
              },
            }}
          >
            { content }
          </Markdown>
        </Card.Body>
        <Card.Footer content={<p>创建于: {moment(item.create_at).fromNow()}</p>} extra={<p>最新回复: {moment(item.last_reply_at).fromNow()}</p>} />
      </Card>
      <CommentList label="精彩评论" type="jc" id={id} />
      <CommentList label="最新评论" type="zx" id={id} />
      <CreateComment />
    </div>
  );
};
