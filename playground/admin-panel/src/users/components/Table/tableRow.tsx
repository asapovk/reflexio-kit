import React from 'react';
import { Block } from '../../../../../__shared/_ui/Block';
import { Flexbox } from '../../../../../__shared/_ui/Flexbox';

import { Text } from '../../../../../__shared/_ui/Text';
import { Checkbox } from '../../../../../__shared/_ui/Checkbox'

export const TableRow = ({ ki }: { ki: string }) => (
  <Flexbox
    justifyContent='space-between'
    style={{ height: '100px', textAlign: 'center' }}
  >
    <Block
      p={'1rem'}
      style={{
        maxWidth: '300px',
      }}
    >
      <Checkbox ki={ki} style={{ display: 'flex', alignItems: 'center' }}>
        <Text>Heloo</Text>
      </Checkbox>
    </Block>
    <Block
      p={'1rem'}
      style={{
        maxWidth: '700px',
      }}
    >
      <Text size='s'>One</Text>
    </Block>
    <Block
      p={'1rem'}
      style={{
        maxWidth: '300px',
      }}
    >
      <Text size='s'>One</Text>
    </Block>
    <Block
      p={'1rem'}
      style={{
        maxWidth: '300px',
      }}
    >
      <Text size='s'>One</Text>
    </Block>
  </Flexbox>
);
