import React, { memo, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import qs from 'qs'
import { AmendWrapper } from './style'
import { Button, Select, Form, Input, Radio, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { getBrandListReq } from '@/services/api/brand'
import { IBrandData } from '@/services/api/brand/type'
import { getCateListReq } from '@/services/api/cate'
import { ICateData } from '@/services/api/cate/type'
import { getProduct, patchProduct } from '@/services/api/product'

export default memo(function Amend() {
  const { search } = useLocation()
  const [form] = Form.useForm()
  const { Option } = Select
  const [brandList, setBrandList] = useState([] as IBrandData[])
  const [cateList, setcateList] = useState([] as ICateData[])
  const [disabledButton, setDisabledButton] = useState(false)
  const productId = useRef('' as any)

  const onFinish = (values: any) => {
    setDisabledButton(true)
    try {
      patchProduct(productId.current, values).then((res: any) => {
        message.success(res.msg)
        getProductById()
        setDisabledButton(false)
      })
    } catch (error) {
      setDisabledButton(false)
    }
  }

  const getBrandList = () => {
    getBrandListReq().then((res) => {
      setBrandList(res.data)
    })
  }

  const getCateList = () => {
    getCateListReq().then((res) => {
      setcateList(res.data)
    })
  }

  const getProductById = () => {
    getProduct(productId.current).then((res) => {
      form.setFieldsValue(res.data)
    })
  }

  useEffect(() => {
    const { id } = qs.parse(search.replace('?', ''))
    if (id) {
      productId.current = id
      getCateList()
      getBrandList()
      getProductById()
    } else {
      setDisabledButton(true)
    }
  }, [])

  return (
    <AmendWrapper>
      <Form
        form={form}
        name="normal_create"
        disabled={disabledButton}
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 16
        }}
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="?????????"
          rules={[
            {
              required: true,
              message: '??????????????????'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="??????????????????"
          />
        </Form.Item>
        <Form.Item
          name="brand_id"
          label="????????????"
          rules={[
            {
              required: true,
              message: '?????????????????????'
            }
          ]}
        >
          <Select placeholder="?????????????????????">
            {brandList.map((item) => {
              return (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="cate_id"
          label="????????????"
          rules={[
            {
              required: true,
              message: '?????????????????????'
            }
          ]}
        >
          <Select placeholder="?????????????????????">
            {cateList.map((item) => {
              return (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="price"
          label="????????????"
          rules={[
            {
              required: true,
              message: '?????????????????????'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="?????????????????????"
          />
        </Form.Item>
        <Form.Item
          name="original"
          label="????????????"
          rules={[
            {
              required: true,
              message: '?????????????????????'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="?????????????????????"
          />
        </Form.Item>
        <Form.Item
          name="tag"
          label="????????????"
          rules={[
            {
              required: true,
              message: '?????????????????????'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="?????????????????????"
          />
        </Form.Item>
        <Form.Item
          name="content"
          label="????????????"
          rules={[
            {
              required: true,
              message: '?????????????????????'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="?????????????????????"
          />
        </Form.Item>
        <Form.Item
          name="summary"
          label="????????????"
          rules={[
            {
              required: true,
              message: '?????????????????????'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="?????????????????????"
          />
        </Form.Item>
        <Form.Item
          name="is_sale"
          label="????????????"
          rules={[
            {
              required: true,
              message: '???????????????????????????'
            }
          ]}
        >
          <Radio.Group value={1}>
            <Radio value={1}>??????</Radio>
            <Radio value={0}>?????????</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit" disabled={disabledButton}>
            ????????????
          </Button>
        </Form.Item>
      </Form>
    </AmendWrapper>
  )
})
