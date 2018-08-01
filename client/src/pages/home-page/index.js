import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import postFaultCodeMutation from '../../graphql/fault-code/mutation/post-fault-code';
import FogCannon from '../../components/fog-cannon';
import FaultCodes from '../../components/fault-codes';
import Console from '../../components/console';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Title = styled.h3`
  color: tomato;
`;
//------------------------------------------------------------------------------
const Half = styled.div`
  flex: 1;
`;
//------------------------------------------------------------------------------
const Spacer = styled.div`
  width: 20px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class HomePage extends React.PureComponent {
  state = {
    faultCode: '',
    httpRes: {},
  }

  handleFaultCodeClick = async ({ faultCode }) => {
    const { postFaultCode } = this.props;

    // Display fault code on console
    this.setState({ faultCode });

    // Fire POST request to PWA and wait for response
    try {
      const res = await postFaultCode({
        variables: { faultCode },
      });
      console.log('res', res);
      this.setState({ httpRes: res });
    } catch (exc) {
      console.log(exc);
      this.setState({ httpRes: exc });
    }
  }

  handleClearConsoleClick = () => {
    this.setState({
      faultCode: '',
      httpRes: {},
    });
  }

  render() {
    const { faultCode, httpRes } = this.state;

    return (
      <div>
        <Title>PWA</Title>
        <div className="flex">
          <Half>
            {/* <FogCannon /> */}
            <div className="mb2" />
            <Console
              faultCode={faultCode}
              httpRes={httpRes}
            />
            <div className="mb2" />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClearConsoleClick}
            >
              Clear console
            </Button>
          </Half>
          {/* <Spacer />
          <Half>
            <FaultCodes
              onClick={this.handleFaultCodeClick}
            />
          </Half> */}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  postFaultCode: PropTypes.func.isRequired,
};

// Apollo integration
const withMutation = graphql(postFaultCodeMutation, { name: 'postFaultCode' });

export default withMutation(HomePage);
