import React, { memo, useEffect, useState } from 'react'
import { Table, Radio, Select, Space, Modal, message, Input } from 'antd'
import { getProductList, deleteMyProduct } from '@/services/api/product'
import { ProductWrapper } from './style'
import type { TableProps, RadioChangeEvent } from 'antd'
import { useSelector } from 'react-redux'
import { storeUser } from '@/store/user-store'
import { getCateListReq } from '@/services/api/cate'
import { ICate } from '@/services/api/cate/type'
import { getBrandListReq } from '@/services/api/brand'
import { IBrand } from '@/services/api/brand/type'
import { NavLink } from 'react-router-dom'

interface DataType {
  imgUrl: string
  name: string
  original: string
  price: string
  brand: string
  cate: string
  tag: string
  createTime: string
  updateTime: string
  is_sale: number
}

export default memo(function Product() {
  const { Search } = Input
  const [productreq, setProductreq] = useState({ offset: 0, size: 10 }) as any
  const [dataSource, setDataSource] = useState([]) as any
  const [isme, setIsme] = useState(false)
  const userId = useSelector(storeUser)
  const [cateList, setCateList] = useState() as any
  const [brandList, setBrandList] = useState() as any
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [product, setProduct] = useState({ name: '' }) as any
  const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 10 })

  const columns = [
    {
      title: '商品图片',
      dataIndex: 'imgUrl',
      render: (imgUrl: string) => (
        <img className="imgurl" src={imgUrl + '?type=small'} />
      )
    },
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '上架店铺',
      dataIndex: 'merchantName'
    },
    {
      title: '商品原价',
      dataIndex: 'original',
      sorter: true
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      sorter: true
    },
    {
      title: '品牌',
      dataIndex: 'brand'
    },
    {
      title: '分类',
      dataIndex: 'cate'
    },
    {
      title: '商品标签',
      dataIndex: 'tag'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      sorter: true
    },
    {
      title: '是否上架',
      dataIndex: 'is_sale',
      filters: [
        {
          text: '已上架',
          value: 1
        },
        {
          text: '未上架',
          value: 0
        }
      ]
    },
    {
      title: 'Action',
      index: 'action',
      render: (data: any) => (
        <Space size="middle">
          <NavLink
            className={data.action ? 'showdelete' : 'nonedelete'}
            to={`/product/amend?id=${data.id}`}
          >
            修改
          </NavLink>
          <span
            className={data.action ? 'showdelete' : 'nonedelete'}
            onClick={() => deleteProduct(data)}
          >
            删除
          </span>
        </Space>
      )
    }
  ]

  const handleOk = () => {
    deleteMyProduct(product.id).then((res) => {
      getProduct()
      message.success('删除成功')
    })
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    message.success('取消删除')
    setIsModalOpen(false)
  }

  const deleteProduct = (data: any) => {
    setProduct(data)
    setIsModalOpen(true)
  }

  // 获取商品数据
  const getProduct = () => {
    getProductList(productreq).then((res: any) => {
      const data = res.data.map((item: any) => {
        item.key = item.id
        item.action = item.merchantid === userId ? true : false
        return item
      })
      setDataSource({ data, total: res.total })
    })
  }
  // 获取分类
  const getCateList = () => {
    getCateListReq().then((res: ICate) => {
      const selectData: any = []
      res.data.forEach((item) => {
        selectData.push({ value: item.id, label: item.name })
      })
      selectData.push({ value: '', label: '全部筛选' })
      setCateList(selectData)
    })
  }
  // 获取品牌分类
  const getBrandList = () => {
    getBrandListReq().then((res: IBrand) => {
      const selectData: any = []
      res.data.forEach((item) => {
        selectData.push({ value: item.id, label: item.name })
      })
      selectData.push({ value: '', label: '全部筛选' })
      setBrandList(selectData)
    })
  }

  // table的筛选
  const onChange: TableProps<DataType>['onChange'] = (
    tabpagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => {
    // console.log('params', tabpagination, filters, sorter, extra)
    setPagination(
      Object.assign(pagination, { currentPage: tabpagination.current })
    )
    let orderRuler, orderKey, is_sale
    if (filters.is_sale && filters.is_sale.length !== 2) {
      is_sale = filters.is_sale[0]
    }
    if (sorter.order) {
      orderRuler =
        sorter.order === 'ascend'
          ? 'ASC'
          : sorter.order === 'descend'
          ? 'DESC'
          : ''
      orderKey = sorter.field
    }
    setProductreq(
      Object.assign(productreq, {
        offset: (tabpagination.current - 1) * tabpagination.pageSize,
        size: tabpagination.pageSize,
        orderKey,
        orderRuler,
        is_sale
      })
    )
    getProduct()
  }
  // 单选框商家筛选
  const radioChange = (e: RadioChangeEvent) => {
    setPagination({ ...pagination, currentPage: 1 })
    setIsme(e.target.value)
    if (e.target.value) {
      setProductreq(
        Object.assign(productreq, { merchant_id: userId, offset: 0 })
      )
    } else {
      setProductreq(
        Object.assign(productreq, { merchant_id: undefined, offset: 0 })
      )
    }
    getProduct()
  }
  // 分类下拉框
  const cateChange = (value: string) => {
    setPagination({ ...pagination, currentPage: 1 })
    if (value)
      setProductreq(Object.assign(productreq, { cate_id: value, offset: 0 }))
    else
      setProductreq(
        Object.assign(productreq, { cate_id: undefined, offset: 0 })
      )
    getProduct()
  }
  // 品牌下拉框
  const brandChange = (value: string) => {
    setPagination({ ...pagination, currentPage: 1 })
    if (value)
      setProductreq(Object.assign(productreq, { brand_id: value, offset: 0 }))
    else
      setProductreq(
        Object.assign(productreq, { brand_id: undefined, offset: 0 })
      )
    getProduct()
  }

  const onSearch = (value: any) => {
    const { name } = productreq
    if (value) {
      setProductreq(Object.assign(productreq, { name: value, offset: 0 }))
    } else {
      console.log(name)

      if (name) {
        setProductreq(delete productreq.name)
      }
    }

    getProduct()
  }

  useEffect(() => {
    getProduct()
    getCateList()
    getBrandList()
  }, [userId])

  const paginationProps = {
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: () => `共${dataSource.total}条`,
    pageSize: pagination.pageSize,
    current: pagination.currentPage,
    total: dataSource.total
  }

  return (
    <ProductWrapper>
      <div className="product-content">
        <h2>筛选</h2>
        <div className="radio-isme">
          <span>店铺选择：</span>
          <Radio.Group onChange={radioChange} value={isme}>
            <Radio value={true}>只看我自己</Radio>
            <Radio value={false}>查看全部</Radio>
          </Radio.Group>
        </div>
        <div className="cate-select">
          <span>商品分类：</span>
          <Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={cateChange}
            options={cateList}
          />
        </div>
        <div className="brand-select">
          <span>品牌分类：</span>
          <Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={brandChange}
            options={brandList}
          />
        </div>
        <div className="product-name">
          <span className="title">商品名称：</span>
          <Search placeholder="筛选商品名称" onSearch={onSearch} enterButton />
        </div>
        <div className="table-content">
          <Table
            dataSource={dataSource.data}
            columns={columns}
            onChange={onChange}
            pagination={paginationProps}
          />
        </div>
      </div>
      <Modal
        title="提示"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>确定删除 {product.name} 此商品？</p>
      </Modal>
    </ProductWrapper>
  )
})
