import React, { useState } from 'react'
import { Form, Input, Button, Select, Modal, AutoComplete, Tabs } from 'antd'

const initialContact = {
  vi: {
    quickContact: {
      hotline: '0123 456 789',
      email: 'info@thuyanhland.com',
      time: '8:00 - 18:00 (T2-T7)',
    },
    office: {
      quan1: {
        name: 'Văn phòng chính - Quận 1',
        address: '123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM',
        info: '028 3822 1234 | quan1@thuyanhland.com',
      },
      quan7: {
        name: 'Chi nhánh Quận 7',
        address: '456 Đường Nguyễn Thị Thập, Phường Tân Phú, Quận 7, TP.HCM',
        info: '028 5412 5678 | quan7@thuyanhland.com',
      },
      thuduc: {
        name: 'Chi nhánh Thủ Đức',
        address:
          '789 Đường Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP.HCM',
        info: '028 3715 9012 | thuduc@thuyanhland.com',
      },
    },
    social: {
      facebook: '#',
      youtube: '#',
      note: 'Theo dõi chúng tôi để cập nhật thông tin mới nhất về thị trường bất động sản',
    },
    mapAddress: '123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM',
  },
  en: {
    quickContact: {
      hotline: '0123 456 789',
      email: 'info@thuyanhland.com',
      time: '8:00am - 6:00pm (Mon-Sat)',
    },
    office: {
      quan1: {
        name: 'Main Office - District 1',
        address: '123 Nguyen Hue St, Ben Nghe Ward, District 1, HCMC',
        info: '028 3822 1234 | quan1@thuyanhland.com',
      },
      quan7: {
        name: 'Branch - District 7',
        address: '456 Nguyen Thi Thap St, Tan Phu Ward, District 7, HCMC',
        info: '028 5412 5678 | quan7@thuyanhland.com',
      },
      thuduc: {
        name: 'Branch - Thu Duc',
        address: '789 Vo Van Ngan St, Linh Chieu Ward, Thu Duc City, HCMC',
        info: '028 3715 9012 | thuduc@thuyanhland.com',
      },
    },
    social: {
      facebook: '#',
      youtube: '#',
      note: 'Follow us for the latest real estate market updates',
    },
    mapAddress: '123 Nguyen Hue St, Ben Nghe Ward, District 1, HCMC',
  },
  ko: {
    quickContact: {
      hotline: '0123 456 789',
      email: 'info@thuyanhland.com',
      time: '오전 8:00 - 오후 6:00 (월-토)',
    },
    office: {
      quan1: {
        name: '본사 - 1구',
        address: '123 Nguyen Hue, Ben Nghe, 1구, 호치민',
        info: '028 3822 1234 | quan1@thuyanhland.com',
      },
      quan7: {
        name: '지점 - 7구',
        address: '456 Nguyen Thi Thap, Tan Phu, 7구, 호치민',
        info: '028 5412 5678 | quan7@thuyanhland.com',
      },
      thuduc: {
        name: '지점 - Thu Duc',
        address: '789 Vo Van Ngan, Linh Chieu, Thu Duc, 호치민',
        info: '028 3715 9012 | thuduc@thuyanhland.com',
      },
    },
    social: {
      facebook: '#',
      youtube: '#',
      note: '최신 부동산 시장 정보를 받아보세요',
    },
    mapAddress: '123 Nguyen Hue, Ben Nghe, 1구, 호치민',
  },
}

const ContactPage = () => {
  const [lang, setLang] = useState('vi')
  const [contact, setContact] = useState(initialContact)
  const [modal, setModal] = useState({ open: false, key: '', value: '' })
  const [mapModal, setMapModal] = useState(false)
  const [searchOptions, setSearchOptions] = useState([])

  // Giả lập search Google Maps (thực tế nên dùng API Google Places)
  const handleSearch = (value) => {
    if (!value) setSearchOptions([])
    else
      setSearchOptions([
        { value: value },
        { value: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM' },
        { value: 'Bitexco Financial Tower, Quận 1, TP.HCM' },
        { value: 'Landmark 81, Bình Thạnh, TP.HCM' },
      ])
  }

  // Modal logic
  const handleOpenModal = (key) => {
    setModal({
      open: true,
      key,
      value: JSON.stringify(contact[lang][key], null, 2),
    })
  }
  const handleOk = () => {
    try {
      const val = JSON.parse(modal.value)
      setContact({
        ...contact,
        [lang]: {
          ...contact[lang],
          [modal.key]: val,
        },
      })
    } catch {}
    setModal({ open: false, key: '', value: '' })
  }
  const handleCancel = () => setModal({ open: false, key: '', value: '' })

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <Tabs activeKey={lang} onChange={setLang} className='mb-6'>
        <Tabs.TabPane tab='Tiếng Việt' key='vi' />
        <Tabs.TabPane tab='English' key='en' />
        <Tabs.TabPane tab='한국어' key='ko' />
      </Tabs>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2'>
          <div className='bg-white rounded-lg shadow p-6 mb-6'>
            <h2 className='text-xl font-bold text-blue-700 mb-1'>
              Gửi tin nhắn cho chúng tôi
            </h2>
            <p className='text-gray-600 mb-4'>
              Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại với bạn sớm
              nhất
            </p>
            <Form layout='vertical'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Form.Item
                  name='name'
                  label='Họ và tên *'
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                >
                  {' '}
                  <Input placeholder='Họ và tên' />{' '}
                </Form.Item>
                <Form.Item
                  name='phone'
                  label='Số điện thoại *'
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại' },
                  ]}
                >
                  {' '}
                  <Input placeholder='Số điện thoại' />{' '}
                </Form.Item>
              </div>
              <Form.Item name='email' label='Email'>
                {' '}
                <Input placeholder='Email' />{' '}
              </Form.Item>
              <Form.Item name='subject' label='Chủ đề'>
                {' '}
                <Select placeholder='Chủ đề'>
                  {' '}
                  <Select.Option value=''>Chủ đề</Select.Option>{' '}
                  <Select.Option value='tuvan'>Tư vấn</Select.Option>{' '}
                  <Select.Option value='khac'>Khác</Select.Option>{' '}
                </Select>{' '}
              </Form.Item>
              <Form.Item
                name='message'
                label='Nội dung *'
                rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
              >
                {' '}
                <Input.TextArea
                  rows={4}
                  placeholder='Nội dung tư vấn...'
                />{' '}
              </Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='w-full bg-gradient-to-r from-blue-500 to-blue-700'
              >
                Gửi tin nhắn
              </Button>
            </Form>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <div
            className='bg-white rounded-lg shadow p-6 cursor-pointer'
            onClick={() => handleOpenModal('quickContact')}
          >
            <h3 className='text-lg font-bold text-blue-700 mb-3'>
              Liên hệ nhanh
            </h3>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-blue-500'>📞</span> Hotline{' '}
              <span className='ml-auto'>
                {contact[lang].quickContact.hotline}
              </span>
            </div>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-blue-500'>✉️</span> Email{' '}
              <span className='ml-auto'>
                {contact[lang].quickContact.email}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-500'>⏰</span> Giờ làm việc{' '}
              <span className='ml-auto'>{contact[lang].quickContact.time}</span>
            </div>
          </div>
          <div
            className='bg-white rounded-lg shadow p-6 cursor-pointer'
            onClick={() => handleOpenModal('office')}
          >
            <h3 className='text-lg font-bold text-blue-700 mb-3'>
              Địa chỉ văn phòng
            </h3>
            <div className='mb-2'>
              <span className='font-semibold'>
                {contact[lang].office.quan1.name}
              </span>
              <br />
              {contact[lang].office.quan1.address}
              <br />
              <span className='text-gray-500 text-sm'>
                {contact[lang].office.quan1.info}
              </span>
            </div>
            <div className='mb-2'>
              <span className='font-semibold'>
                {contact[lang].office.quan7.name}
              </span>
              <br />
              {contact[lang].office.quan7.address}
              <br />
              <span className='text-gray-500 text-sm'>
                {contact[lang].office.quan7.info}
              </span>
            </div>
            <div>
              <span className='font-semibold'>
                {contact[lang].office.thuduc.name}
              </span>
              <br />
              {contact[lang].office.thuduc.address}
              <br />
              <span className='text-gray-500 text-sm'>
                {contact[lang].office.thuduc.info}
              </span>
            </div>
          </div>
          <div
            className='bg-white rounded-lg shadow p-6 cursor-pointer'
            onClick={() => handleOpenModal('social')}
          >
            <h3 className='text-lg font-bold text-blue-700 mb-3'>
              Kết nối với chúng tôi
            </h3>
            <div className='flex gap-2 mb-2'>
              <Button
                icon={<span>👍</span>}
                href={contact[lang].social.facebook}
                target='_blank'
              >
                Facebook
              </Button>
              <Button
                icon={<span>▶️</span>}
                href={contact[lang].social.youtube}
                target='_blank'
              >
                YouTube
              </Button>
            </div>
            <div className='text-gray-500 text-xs'>
              {contact[lang].social.note}
            </div>
          </div>
        </div>
        <Modal
          title='Chỉnh sửa nội dung'
          open={modal.open}
          onOk={handleOk}
          onCancel={handleCancel}
          okText='Lưu'
          cancelText='Hủy'
        >
          <Input.TextArea
            rows={10}
            value={modal.value}
            onChange={(e) => setModal({ ...modal, value: e.target.value })}
          />
          <div className='text-xs text-gray-500 mt-2'>
            * Dữ liệu nhập là JSON, ví dụ:{' '}
            <code>{'{"hotline":"0123 456 789", ...}'}</code>
          </div>
        </Modal>
      </div>
      <div className='max-w-6xl mx-auto mb-8'>
        <div
          className='bg-white rounded-lg shadow p-6 cursor-pointer'
          onClick={() => setMapModal(true)}
        >
          <h3 className='text-xl font-bold text-blue-700 mb-1'>
            Bản đồ văn phòng chính
          </h3>
          <div className='text-gray-500 mb-4'>{contact[lang].mapAddress}</div>
          <div
            className='bg-gray-200 rounded-lg flex items-center justify-center'
            style={{ height: 300 }}
          >
            <span className='text-gray-500'>
              Google Maps sẽ được tích hợp tại đây
            </span>
          </div>
        </div>
      </div>
      <Modal
        title='Chọn địa chỉ Google Maps'
        open={mapModal}
        onOk={() => setMapModal(false)}
        onCancel={() => setMapModal(false)}
        okText='Lưu'
        cancelText='Hủy'
      >
        <AutoComplete
          style={{ width: '100%' }}
          value={contact[lang].mapAddress}
          options={searchOptions}
          onSelect={(val) =>
            setContact({
              ...contact,
              [lang]: { ...contact[lang], mapAddress: val },
            })
          }
          onSearch={handleSearch}
          placeholder='Nhập địa chỉ Google Maps...'
        />
        <div className='mt-4 text-gray-500 text-xs'>
          * Tìm kiếm địa chỉ và chọn để cập nhật bản đồ.
        </div>
      </Modal>
    </div>
  )
}

export default ContactPage
