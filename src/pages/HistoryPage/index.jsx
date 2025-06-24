import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Tabs } from 'antd'
import { fetchHistory, updateHistory } from '../../api/historyApi'
import { fetchMission, updateMission } from '../../api/missionApi'
import { fetchVision, updateVision } from '../../api/visionApi'

const initialBlocks = {
  vi: [
    {
      key: 'history',
      title: 'Lịch sử hình thành',
      content: `Thùy Anh Land được thành lập vào năm 2008 với sứ mệnh mang đến những giải pháp bất động sản ưu việt cho khách hàng. Trong những năm đầu chỉ có một trụ sở tại Sài Gòn, chúng tôi đã không ngừng phát triển thương hiệu uy tín hàng đầu trên thị trường với đội ngũ giàu kinh nghiệm.\n\nQuá trình 15 năm phát triển, chúng tôi đã đồng hành cùng hàng nghìn khách hàng trong và ngoài nước, cung cấp các sản phẩm chất lượng. Đến nay, lĩnh vực hoạt động đã mở rộng khắp các tỉnh thành phía Nam và cả nước, đặc biệt là các dự án lớn tại TP.HCM và các tỉnh lân cận.\n\nHiện tại, chúng tôi là một trong những công ty bất động sản uy tín tại TP.HCM và các tỉnh lân cận, với đội ngũ hơn 100 chuyên viên và quy trình khép kín hiện đại.`,
    },
    {
      key: 'mission',
      title: 'Sứ mệnh',
      content:
        'Mang đến giải pháp bất động sản tối ưu, đáp ứng nhu cầu khách hàng tìm kiếm nơi an cư và phát triển sự nghiệp bền vững.',
    },
    {
      key: 'vision',
      title: 'Tầm nhìn',
      content:
        'Trở thành đơn vị dẫn đầu thị trường, được khách hàng và đối tác tin tưởng lựa chọn, tiên phong đổi mới trong ngành bất động sản.',
    },
  ],
  en: [
    {
      key: 'history',
      title: 'History',
      content:
        'Thuy Anh Land was founded in 2008 with the mission to provide optimal real estate solutions for customers. In the early years, with only one office in Saigon, we have continuously developed a leading reputable brand in the market with a team of experienced professionals.\n\nAfter 15 years of development, we have accompanied thousands of customers at home and abroad, providing quality products. Currently, our operational fields have expanded throughout the southern provinces and the whole country, especially large projects in Ho Chi Minh City and neighboring provinces.\n\nAt present, we are one of the reputable real estate companies in Ho Chi Minh City and neighboring provinces, with a team of more than 100 professionals and a modern closed process.',
    },
    {
      key: 'mission',
      title: 'Mission',
      content:
        'Providing optimal real estate solutions, meeting the needs of customers seeking a place to live and sustainable career development.',
    },
    {
      key: 'vision',
      title: 'Vision',
      content:
        'To become a leading company in the market, trusted by customers and partners, pioneering innovation in the real estate industry.',
    },
  ],
  ko: [
    {
      key: 'history',
      title: '설립 역사',
      content:
        'Thuy Anh Land는 2008년에 설립되어 고객에게 최적의 부동산 솔루션을 제공하는 것을 사명으로 하고 있습니다. 초기 몇 년 동안 사이공에 하나의 사무소만으로 시장에서 경험이 풍부한 전문가 팀과 함께 선도적인 평판 브랜드로 지속적으로 발전해 왔습니다.\n\n15년의 개발 과정에서 우리는 국내외 수천 명의 고객과 동행하며 양질의 제품을 제공해 왔습니다. 현재 우리의 사업 분야는 남부 지방과 전국으로 확대되었으며, 특히 호치민시와 인근 지방의 대규모 프로젝트에서 두드러집니다.\n\n현재 우리는 호치민시와 인근 지방에서 신뢰할 수 있는 부동산 회사 중 하나로, 100명 이상의 전문가 팀과 현대적인 폐쇄 프로세스를 갖추고 있습니다.',
    },
    {
      key: 'mission',
      title: '사명',
      content:
        '고객의 주거 및 지속 가능한 경력 개발을 위한 최적의 부동산 솔루션을 제공합니다.',
    },
    {
      key: 'vision',
      title: '비전',
      content:
        '시장 선도 기업이 되어 고객과 파트너가 신뢰하는 혁신적인 부동산 기업이 되는 것.',
    },
  ],
}

const AboutPage = () => {
  const [lang, setLang] = useState('vi')
  const [blocks, setBlocks] = useState(initialBlocks)
  const [modal, setModal] = useState({ open: false, key: '', value: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    Promise.all([fetchHistory(lang), fetchMission(lang), fetchVision(lang)])
      .then(([history, mission, vision]) => {
        setBlocks((prev) => ({
          ...prev,
          [lang]: [
            {
              key: 'history',
              title: history.title,
              content: history.content,
            },
            {
              key: 'mission',
              title: mission.title,
              content: mission.content,
            },
            {
              key: 'vision',
              title: vision.title,
              content: vision.content,
            },
            ...prev[lang].slice(3),
          ],
        }))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [lang])

  const handleOpenModal = (block) => {
    setModal({
      open: true,
      key: block.key,
      value: block.content,
      title: block.title,
    })
  }
  const handleOk = async () => {
    if (modal.key === 'history') {
      try {
        setLoading(true)
        await updateHistory(lang, {
          title: modal.title,
          content: modal.value,
        })
        setBlocks((prev) => ({
          ...prev,
          [lang]: prev[lang].map((b) =>
            b.key === modal.key
              ? { ...b, title: modal.title, content: modal.value }
              : b,
          ),
        }))
      } catch (e) {
        // handle error if needed
      } finally {
        setLoading(false)
        setModal({ open: false, key: '', value: '', title: '' })
      }
      return
    }
    if (modal.key === 'mission') {
      try {
        setLoading(true)
        await updateMission(lang, {
          title: modal.title,
          content: modal.value,
        })
        setBlocks((prev) => ({
          ...prev,
          [lang]: prev[lang].map((b) =>
            b.key === modal.key
              ? { ...b, title: modal.title, content: modal.value }
              : b,
          ),
        }))
      } catch (e) {
        // handle error if needed
      } finally {
        setLoading(false)
        setModal({ open: false, key: '', value: '', title: '' })
      }
      return
    }
    if (modal.key === 'vision') {
      try {
        setLoading(true)
        await updateVision(lang, {
          title: modal.title,
          content: modal.value,
        })
        setBlocks((prev) => ({
          ...prev,
          [lang]: prev[lang].map((b) =>
            b.key === modal.key
              ? { ...b, title: modal.title, content: modal.value }
              : b,
          ),
        }))
      } catch (e) {
        // handle error if needed
      } finally {
        setLoading(false)
        setModal({ open: false, key: '', value: '', title: '' })
      }
      return
    }
    setBlocks({
      ...blocks,
      [lang]: blocks[lang].map((b) =>
        b.key === modal.key ? { ...b, content: modal.value } : b,
      ),
    })
    setModal({ open: false, key: '', value: '', title: '' })
  }
  const handleCancel = () =>
    setModal({ open: false, key: '', value: '', title: '' })

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <Tabs activeKey={lang} onChange={setLang} className='mb-6'>
        <Tabs.TabPane tab='Tiếng Việt' key='vi' />
        <Tabs.TabPane tab='English' key='en' />
        <Tabs.TabPane tab='한국어' key='ko' />
      </Tabs>
      <div className='flex flex-col md:flex-row gap-8 mb-8'>
        <div
          className='flex-1 cursor-pointer'
          onClick={() => handleOpenModal(blocks[lang][0])}
        >
          <h2 className='text-2xl font-bold mb-2'>{blocks[lang][0].title}</h2>
          <p className='mb-2 whitespace-pre-line'>
            {loading && lang === 'vi' ? 'Đang tải...' : blocks[lang][0].content}
          </p>
        </div>
        <div className='flex-1 flex items-center justify-center'>
          <div className='w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center'>
            <span className='text-gray-400 text-4xl'>Ảnh</span>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        {blocks[lang].slice(1).map((block) => (
          <div
            key={block.key}
            className='bg-white rounded-lg shadow p-6 flex flex-col items-center cursor-pointer'
            onClick={() => handleOpenModal(block)}
          >
            <div className='text-blue-500 text-3xl mb-2'>🎯</div>
            <h3 className='font-semibold mb-1'>{block.title}</h3>
            <p className='text-center text-gray-600 text-sm'>{block.content}</p>
          </div>
        ))}
      </div>
      <div className='mb-8'>
        <h3 className='text-xl font-bold mb-4 text-center'>
          Thành tựu đạt được
        </h3>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          <div className='flex flex-col items-center'>
            <span className='text-blue-500 text-3xl mb-1'>5000+</span>
            <span className='text-gray-600 text-sm'>Khách hàng tin tưởng</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-blue-500 text-3xl mb-1'>1000+</span>
            <span className='text-gray-600 text-sm'>Giao dịch thành công</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-blue-500 text-3xl mb-1'>15+</span>
            <span className='text-gray-600 text-sm'>Năm kinh nghiệm</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-blue-500 text-3xl mb-1'>98%</span>
            <span className='text-gray-600 text-sm'>Khách hàng hài lòng</span>
          </div>
        </div>
      </div>
      <div className='mb-8'>
        <h3 className='text-xl font-bold mb-4 text-center'>Đội ngũ lãnh đạo</h3>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          <div className='flex flex-col items-center'>
            <div className='w-20 h-20 bg-gray-200 rounded-full mb-2 flex items-center justify-center'>
              <span className='text-gray-400 text-2xl'>Ảnh</span>
            </div>
            <span className='font-semibold'>Nguyễn Thùy Anh</span>
            <span className='text-gray-500 text-xs'>Giám đốc</span>
          </div>
          <div className='flex flex-col items-center'>
            <div className='w-20 h-20 bg-gray-200 rounded-full mb-2 flex items-center justify-center'>
              <span className='text-gray-400 text-2xl'>Ảnh</span>
            </div>
            <span className='font-semibold'>Trần Văn B</span>
            <span className='text-gray-500 text-xs'>
              Phó giám đốc kinh doanh
            </span>
          </div>
          <div className='flex flex-col items-center'>
            <div className='w-20 h-20 bg-gray-200 rounded-full mb-2 flex items-center justify-center'>
              <span className='text-gray-400 text-2xl'>Ảnh</span>
            </div>
            <span className='font-semibold'>Lê Thị C</span>
            <span className='text-gray-500 text-xs'>
              Trưởng phòng kinh doanh
            </span>
          </div>
          <div className='flex flex-col items-center'>
            <div className='w-20 h-20 bg-gray-200 rounded-full mb-2 flex items-center justify-center'>
              <span className='text-gray-400 text-2xl'>Ảnh</span>
            </div>
            <span className='font-semibold'>Phạm Văn D</span>
            <span className='text-gray-500 text-xs'>Chuyên viên pháp lý</span>
          </div>
        </div>
      </div>
      <div className='mb-8'>
        <h3 className='text-xl font-bold mb-4 text-center'>
          Tại sao chọn Thùy Anh Land?
        </h3>
        <div className='bg-blue-50 rounded-lg p-4 text-center font-semibold text-blue-700 mb-4'>
          Không lo bị cạnh tranh nhờ các lợi thế vượt trội
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <ul className='text-left text-gray-600 list-disc list-inside'>
            <li>Mạng lưới rộng khắp</li>
            <li>Đội ngũ chuyên viên giàu kinh nghiệm</li>
            <li>Quy trình dịch vụ chuyên nghiệp, khép kín</li>
            <li>Chính sách hậu mãi hấp dẫn</li>
          </ul>
          <ul className='text-left text-gray-600 list-disc list-inside'>
            <li>Giá cả cạnh tranh, minh bạch</li>
            <li>Cam kết đồng hành và hỗ trợ khách hàng lâu dài</li>
            <li>Đối tác uy tín, sản phẩm đa dạng</li>
            <li>Khách hàng hài lòng là ưu tiên số 1</li>
          </ul>
        </div>
      </div>
      <Modal
        title={
          <Input
            value={modal.title}
            onChange={(e) => setModal((m) => ({ ...m, title: e.target.value }))}
            className='mb-2'
          />
        }
        open={modal.open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input.TextArea
          rows={6}
          value={modal.value}
          onChange={(e) => setModal((m) => ({ ...m, value: e.target.value }))}
        />
      </Modal>
    </div>
  )
}

export default AboutPage
