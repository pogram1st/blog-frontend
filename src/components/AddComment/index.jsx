import React from 'react';

import styles from './AddComment.module.scss';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from '../../axios';

export const Index = ({ id, comments, setComments }) => {
  const [valueInput, setValueInput] = React.useState('');
  const addComment = async () => {
    console.log(id);
    const { data } = await axios.post('/addcomment', { valueInput, id: id, comments });
    console.log(data);
    setValueInput('');
    setComments(data.arr);
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src='https://rutensil.com/uploads/oI54YB4s8GmWZcX7AF4QDAH8IWUiFCZH.jpeg'
        />
        <div className={styles.form}>
          <TextField
            label='Написать комментарий'
            variant='outlined'
            maxRows={10}
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            multiline
            fullWidth
          />
          <Button variant='contained' onClick={addComment}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
