import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import PhoneIcon from '../../public/images/phone.svg';

import { contactNumber, contactNumberToCopy } from '../../contants/const';

export interface ProfileButtonInterface {
  containerStyles?: string,
  iconStyles?: string,
  textStyles?: string
}

const onCopy = () => {
  toast.info('Номер скопирован в буфер обмена');
};

export function Number({ containerStyles, iconStyles, textStyles }) {
  return (
    <CopyToClipboard
      text={contactNumberToCopy}
      onCopy={onCopy}
    >
      <button
        type="button"
        className={containerStyles}
        title='Нажмите, чтобы скопировать'
      >
        <PhoneIcon className={iconStyles} />
        <p className={textStyles}>{contactNumber}</p>
      </button>
    </CopyToClipboard>
  );
}