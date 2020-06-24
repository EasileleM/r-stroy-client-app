import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import { Layout } from '../components/Layout/Layout';
import { RootState } from '../redux/types';
import { INDEX_URL } from '../contants/const';
import { userApiService } from '../services/userApiService';

type PropsFromRedux = ConnectedProps<typeof connector>;

export function NotifyPage({ isAdmin }: PropsFromRedux) {
  const router = useRouter();
  const [currentSubject, setCurrentSubject] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  
  useEffect(() => {
    if (!isAdmin) {
      router.push(INDEX_URL);
    }
  }, []);

  const handleSubmit = async () => {
    await userApiService.notifySubscribers(currentSubject, currentMessage);
    toast.success('Успешно!');
  };
  
  return (
    <Layout>
      <div>
        <Typography gutterBottom component="h1" variant="h1">
          Рассылка подписчикам
        </Typography>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="subject"
            label="Заголовок"
            name="subject"
            autoComplete="subject"
            autoFocus
            value={currentSubject}
            onChange={(e) => setCurrentSubject(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="message"
            label="Сообщение"
            name="message"
            autoComplete="message"
            autoFocus
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <Button onClick={handleSubmit}>
            Создать
          </Button>
        </div>
      </div>
    </Layout>
  );
}


const mapStateToProps = (state: RootState) => ({
  isAdmin: state.user.isAdmin
});

const connector = connect(mapStateToProps);

export default connector(NotifyPage);