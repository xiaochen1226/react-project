import React, { memo, useEffect, useState } from 'react'
import { RecommendWrapper } from './style'
import {
  Button,
  Select,
  Form,
  Input,
  Radio,
  Upload,
  Modal,
  message
} from 'antd'
import { LockOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons'
import { getBrandListReq } from '@/services/api/brand'
import { IBrandData } from '@/services/api/brand/type'
import { getCateListReq } from '@/services/api/cate'
import { ICateData } from '@/services/api/cate/type'
import { createProduct } from '@/services/api/product'

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
)

const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export default memo(function Recommend() {
  const [form] = Form.useForm()
  const { Option } = Select
  const [brandList, setBrandList] = useState([] as IBrandData[])
  const [cateList, setcateList] = useState([] as ICateData[])
  const [fileList, setFileList] = useState([] as any)
  const [showFileList, setShowFileList] = useState([] as any)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [disabledButton, setDisabledButton] = useState(false)

  const onFinish = (values: any) => {
    setDisabledButton(true)
    try {
      const param = new FormData()
      for (let key in values) {
        if (key !== 'pictures') {
          param.append(key, values[key])
        }
      }
      fileList.forEach((item: any) => {
        param.append('pictures', item)
      })
      createProduct(param).then((res: any) => {
        message.success(res.msg)
        form.resetFields()
        setShowFileList([])
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

  const handleChange = (file: any) => {
    const newFileList = file.file
    setShowFileList(file.fileList)
    setFileList([...fileList, newFileList])
  }

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    )
  }

  useEffect(() => {
    getBrandList()
    getCateList()
  }, [])

  return (
    <RecommendWrapper>
      <Form
        form={form}
        name="normal_create"
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
          label="商品名"
          rules={[
            {
              required: true,
              message: '请输入商品名'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入商品名"
          />
        </Form.Item>
        <Form.Item
          name="brand_id"
          label="商品品牌"
          rules={[
            {
              required: true,
              message: '请选择商品品牌'
            }
          ]}
        >
          <Select placeholder="请选择商品品牌">
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
          label="商品分类"
          rules={[
            {
              required: true,
              message: '请选择商品分类'
            }
          ]}
        >
          <Select placeholder="请选择商品分类">
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
          label="商品价格"
          rules={[
            {
              required: true,
              message: '请输入商品价格'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入商品价格"
          />
        </Form.Item>
        <Form.Item
          name="original"
          label="商品原价"
          rules={[
            {
              required: true,
              message: '请输入商品原价'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入商品原价"
          />
        </Form.Item>
        <Form.Item
          name="tag"
          label="商品标签"
          rules={[
            {
              required: true,
              message: '请输入商品标签'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入商品标签"
          />
        </Form.Item>
        <Form.Item
          name="content"
          label="商品内容"
          rules={[
            {
              required: true,
              message: '请输入商品内容'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入商品内容"
          />
        </Form.Item>
        <Form.Item
          name="summary"
          label="商品描述"
          rules={[
            {
              required: true,
              message: '请输入商品描述'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入商品描述"
          />
        </Form.Item>
        <Form.Item
          name="is_sale"
          label="商品描述"
          rules={[
            {
              required: true,
              message: '请选择商品是否上架'
            }
          ]}
        >
          <Radio.Group value={1}>
            <Radio value={1}>上架</Radio>
            <Radio value={0}>不上架</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Upload"
          name="pictures"
          rules={[
            {
              required: true,
              message: '请上传图片'
            }
          ]}
        >
          <Upload
            listType="picture-card"
            onChange={handleChange}
            onPreview={handlePreview}
            fileList={showFileList}
            beforeUpload={() => {
              return false
            }}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit" disabled={disabledButton}>
            上传商品
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </RecommendWrapper>
  )
})
