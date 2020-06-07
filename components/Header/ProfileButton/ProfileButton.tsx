import React, { useState } from 'react';
import cn from 'classnames';

import { connect, ConnectedProps } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { useRouter } from 'next/router';
import UserIcon from '../../../public/images/user.svg';

import headerStyles from '../Header.module.scss';
import { RootState } from '../../../redux/types';
import { ModalType } from '../../../enums/ModalType';
import { PROFILE_URL } from '../../../contants/const';
import SignInForm from '../../SignInForm/SignInForm';
import { SignUpForm } from '../../SignUpForm/SignUpForm';

export interface ProfileButtonInterface {
  containerStyles?: string
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ProfileButtonInterface & PropsFromRedux;

export function ProfileButton({ containerStyles, isGuest, firstName }: Props) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [currentModal, setCurrentModal] = useState(ModalType.signIn);
  const router = useRouter();

  const handleOpenModal = async () => {
    if (!isGuest) {
      await router.push(PROFILE_URL);
    } else {
      setIsModalOpened(true);
    }
  };

  const handleCloseModal = () => {
    setCurrentModal(ModalType.signIn);
    setIsModalOpened(false);
  };

  const changeModal = (type: ModalType) => {
    setCurrentModal(type);
  };

  return (
    <>
      <button
        type='button'
        className={cn(headerStyles.specialButton, containerStyles)}
        onClick={handleOpenModal}
      >
        <UserIcon className={headerStyles.link__icon} />
        <p className={cn(headerStyles.specialButton__text)}>
          { isGuest ? 'Войти' : firstName }
        </p>
      </button>
      <Dialog
        open={isModalOpened && isGuest}
        onClose={handleCloseModal}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
          {
            currentModal === ModalType.signIn ?
              <SignInForm
                changeModal={changeModal}
              />
              :
              <SignUpForm
                changeModal={changeModal}
              />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  firstName: state.user.personalData && state.user.personalData.firstName,
  isGuest: state.user.isGuest
});

const connector = connect(mapStateToProps);

export default connector(ProfileButton);