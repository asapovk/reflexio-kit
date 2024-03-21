import React from "react";
import { Block } from "../../../../__shared/_ui/Block";
import { Flexbox } from "../../../../__shared/_ui/Flexbox";
import { Menu } from "../../../../__shared/_ui/Menu";
import { Idea } from "../../../../__shared/_ui/Svg/Idea";
import { Button } from "../../../../__shared/_ui/Button";
import { FileIcon } from "../../../../__shared/_ui/Svg/Filled/FileIcon";
import { Bucket } from "../../../../__shared/_ui/Svg/Filled/Bucket";
import { Text } from "../../../../__shared/_ui/Text";
import { ChatIcon } from "../../../../__shared/_ui/Svg/Filled/CartIcon";

export const Sidebar = (props: {clickUsers: () => void, clickGroups: () => void}) => {
    return (
 
            <Block>
              <Block
                backgoundColor='secondary'
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '5rem',
                  height: '100vh',
                }}
              >
                <Flexbox column>
                  <Button
                    onClick={() => props.clickUsers()}
                    m={'2rem'}
                    decoration='text'
                  >
                    <FileIcon size='xl' />
                    <Text size='s'>Users</Text>
                  </Button>
                  <Button 
                  onClick={() => props.clickGroups()}
                  m={'2rem'} decoration='text'>
                    <Bucket size='xl' />
                    <Text size='s'>Groups</Text>
                  </Button>
                  <Button m={'2rem'} decoration='text'>
                    <ChatIcon size='xl' />
                    <Text
                      style={{
                        wordBreak: 'break-all',
                      }}
                      size='s'
                    >
                      Orders
                    </Text>
                  </Button>
                </Flexbox>
              </Block>
              
            </Block>

    );
  };
  
 