import React, { PureComponent } from 'react';
import styles from './create.less';
import smile from './icon/smile.svg';

class CreateComment extends PureComponent {
  render() {
    return (
      <div className={styles.create}>
        <div className={styles.input}>
          <input placeholder="发表评论" type="text" />
        </div>
        <img className={styles.icon} src={smile} alt="emoji" />  
      </div>
    );
  }
}

export default CreateComment;
