/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import PropTypes from 'prop-types';
import XTermCtrl from 'teleport/lib/term/terminal';
import { TermEventEnum } from 'teleport/lib/term/enums';
import TtyAddressResolver from 'teleport/lib/term/ttyAddressResolver';
import StyledXterm from '../../StyledXterm';

export default class XTerm extends React.Component {
  onRef = ref => {
    this.containerRef = ref;
  };

  componentDidMount() {
    const { onSessionEnd, onSessionStart, termConfig, title } = this.props;
    const addressResolver = new TtyAddressResolver(termConfig);
    this.terminal = new XTermCtrl({
      el: this.containerRef,
      addressResolver,
    });

    this.terminal.open();
    this.terminal.tty.on(TermEventEnum.CLOSE, onSessionEnd);
    this.terminal.tty.on('open', onSessionStart);
    document.title = title;
  }

  componentWillUnmount() {
    this.terminal.destroy();
  }

  shouldComponentUpdate() {
    return false;
  }

  focus() {
    this.terminal.term.focus();
  }

  render() {
    return <StyledXterm ref={this.onRef} />;
  }
}

XTerm.propTypes = {
  onSessionEnd: PropTypes.func.isRequired,
  termConfig: PropTypes.shape({
    ttyUrl: PropTypes.string.isRequired,
    ttyParams: PropTypes.object.isRequired,
  }),
};
