import styled from 'styled-components'

export const ProductWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  .product-content {
    padding: 0 20px;
    .radio-isme,.cate-select,.brand-select {
      height: 40px;
      line-height: 40px;
      >span {
        margin-right: 10px;
        padding-left: 40px;
      }
    }
    .product-name {
      height: 40px;
      line-height: 40px;
      .title {
        margin-right: 10px;
        padding-left: 40px;
      }
      .ant-input-group-wrapper {
        width: 300px;
      }
    }
    .table-content{
      .nonedelete{
        display: none;
      }
      .showdelete {
        color: blue;
        cursor: pointer;
      }
    }
  }
  .imgurl {
    width: 40px;
    height: 40px;
  }
`
