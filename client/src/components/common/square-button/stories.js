import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
// See: https://material.io/tools/icons/?style=baseline
import BuildIcon from '@material-ui/icons/Build';
import SquareButton from './index';

const Icon = () => <BuildIcon style={{ fontSize: '60px' }} />;

storiesOf('SquareButton', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('SquareButton default', () => (
    <SquareButton>
      <Icon />
    </SquareButton>
  ))
  .add('SquareButton disabled', () => (
    <SquareButton disabled>
      <Icon />
    </SquareButton>
  ));
