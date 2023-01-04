import styled from 'styled-components'

export const LayoutWrapper = styled.div`
  background: #e9e9e9;
  height: 100%;

  .common {
    display: flex;
    height: calc(100% - 95px);
    .content {
      background: #e9e9e9;
      height: 100%;
      width: calc(100% - 257px);
      overflow: hidden;
    }
  }
`
