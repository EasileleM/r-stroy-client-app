import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import PhoneIcon from '../../public/images/phone.svg';

import { CONTACT_NUMBER, CONTACT_NUMBER_TO_COPY, NUMBER_COPIED_MSG } from '../../contants/const';

export interface ProfileButtonInterface {
  containerStyles?: string,
  iconStyles?: string,
  textStyles?: string
}

const onCopy = () => {
  toast.info(NUMBER_COPIED_MSG);
};

export function Number({ containerStyles, iconStyles, textStyles }) {
  return (
    <CopyToClipboard
      text={CONTACT_NUMBER_TO_COPY}
      onCopy={onCopy}
    >
      <button
        type="button"
        className={containerStyles}
        title='Нажмите, чтобы скопировать'
      >
        <PhoneIcon className={iconStyles} />
        <p className={textStyles}>{CONTACT_NUMBER}</p>
      </button>
    </CopyToClipboard>
  );
}