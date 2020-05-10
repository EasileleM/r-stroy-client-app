import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import PhoneIcon from '../../public/images/phone.svg';

import { contactNumber, contactNumberToCopy } from '../../contants/const';

export interface ProfileButtonInterface {
  containerStyles?: string,
  iconStyles?: string,
  textStyles?: string
}

const handleCopySideEffect = () => {
  alert('Copied into clipboard!'); // TODO add notifications functionality
};

export function Number({ containerStyles, iconStyles, textStyles }) {
  return (
    <CopyToClipboard
      text={contactNumberToCopy}
      onCopy={handleCopySideEffect}
    >
      <button
        type="button"
        className={containerStyles}
      >
        <PhoneIcon className={iconStyles} />
        <p className={textStyles}>{contactNumber}</p>
      </button>
    </CopyToClipboard>
  );
}