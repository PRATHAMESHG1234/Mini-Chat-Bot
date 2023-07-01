import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Segment
      inverted
      vertical
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        padding: '1em 0',
        overflow: 'hidden',
      }}
    >
      <Container textAlign='center'>
        <p style={{ color: 'grey' }}>
          <strong>
            © {new Date().getFullYear()} Your Chatbot Name. All rights reserved.
          </strong>
        </p>
      </Container>
    </Segment>
  );
};

export default Footer;
