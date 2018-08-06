import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import pick from 'lodash/pick';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import userFragment from '../../graphql/user/fragment/user';
import postEventMutation from '../../graphql/event/mutation/post-event';
import TwilioForm from '../../components/twilio-form';
import PanicBtn from '../../components/panic-btn';
import Console from '../../components/console';
import EventsList from '../../components/events-list';
import ClearEventsBtn from '../../components/clear-events-btn';

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
const Json = styled.pre`
  word-wrap: break-word;
  white-space: pre-wrap;
`;
//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const INIT_STATE = {
  cannonId: '',
  eventType: '',
  eventValue: '',
  httpRes: {},
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class HomePage extends React.PureComponent {
  state = Object.assign({}, INIT_STATE)

  handleEventPost = async (event) => {
    const { postEvent } = this.props;

    // Display fault code on console
    this.setState(pick(event, ['cannonId', 'eventType', 'eventValue']));

    // Fire POST request to PWA and wait for response
    try {
      const res = await postEvent({
        variables: { event },
      });
      console.log('res', res);
      this.setState({ httpRes: res });
    } catch (exc) {
      console.log('exc', exc);
      this.setState({ httpRes: exc });
    }
  }

  handlePanicBtnClick = ({ cannonId = '1' }) => {
    const event = {
      cannonId,
      eventType: 'panicBtn',
      eventValue: 'on',
    };
    this.handleEventPost(event);
  }

  handleClearConsoleClick = () => {
    this.setState(Object.assign({}, INIT_STATE));
  }

  render() {
    const { curUser } = this.props;
    const {
      cannonId,
      eventType,
      eventValue,
      httpRes,
    } = this.state;

    return (
      <div>
        <Title>PWA</Title>
        <div className="mb2" />
        <div className="flex">
          <Half>
            <h3>Current User</h3>
            <Json>
              {JSON.stringify(curUser, null, 2)}
            </Json>
          </Half>
          <Spacer />
          <Half>
            <h3>Set User&apos;s Phone</h3>
            <TwilioForm curUser={curUser} />
          </Half>
        </div>
        <div className="mb2" />
        <PanicBtn
          onClick={this.handlePanicBtnClick}
        />
        <div className="mb2" />
        <h3>Outcomming HTTP requests</h3>
        <Console
          cannonId={cannonId}
          eventType={eventType}
          eventValue={eventValue}
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
        <div className="mb2" />
        <h3>Incomming HTTP requests - <ClearEventsBtn /></h3>
        <EventsList />
        <div className="mb2" />
      </div>
    );
  }
}

HomePage.propTypes = {
  curUser: propType(userFragment),
  postEvent: PropTypes.func.isRequired,
};

HomePage.defaultProps = {
  curUser: null,
};

// Apollo integration
const withMutation = graphql(postEventMutation, { name: 'postEvent' });

export default withMutation(HomePage);
