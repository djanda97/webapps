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
import styled from 'styled-components';
import { borderRadius } from 'design/system';
import { Table } from './../Table';
import Pager from './Pager';
import usePages from './usePages';

export default function PagedTable(props) {
  const { pageSize, data, pagerPosition, ...rest } = props;
  const pagedState = usePages({ pageSize, data });
  const tableProps = {
    ...rest,
    data: pagedState.data,
  };

  const showTopPager =
    pagedState.hasPages && (!pagerPosition || pagerPosition === 'top');
  const showBottomPager =
    pagedState.hasPages && (!pagerPosition || pagerPosition === 'bottom');

  if (showBottomPager) {
    tableProps.borderBottomRightRadius = '0';
    tableProps.borderBottomLeftRadius = '0';
  }

  return (
    <div>
      {showTopPager && (
        <StyledPanel borderTopRightRadius="3" borderTopLeftRadius="3">
          <Pager {...pagedState} />
        </StyledPanel>
      )}
      <Table {...tableProps} />
      {showBottomPager && (
        <StyledPanel borderBottomRightRadius="3" borderBottomLeftRadius="3">
          <Pager {...pagedState} />
        </StyledPanel>
      )}
    </div>
  );
}

export const StyledPanel = styled.nav`
  padding: 16px;
  display: flex;
  height: 24px;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.colors.primary.light};
  ${borderRadius}
`;
