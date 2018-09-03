import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
// See: https://material.io/tools/icons/?style=baseline
import WavesIcon from '@material-ui/icons/Waves';
import SquareButton from './index';

const Icon = () => <WavesIcon style={{ fontSize: '60px' }} />;

storiesOf('SquareButton', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('SquareButton default', () => (
    <SquareButton
      text="RELEASE FOG"
      icon={Icon}
    />
  ))
  .add('SquareButton disabled', () => (
    <SquareButton
      text="RELEASE FOG"
      icon={Icon}
      disabled
    />
  ));
