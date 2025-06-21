import React, { useState } from 'react';

const LANGS = [
  { code: 'vi', label: 'Tiếng Việt', color: 'bg-gradient-to-r from-green-400 to-blue-500' },
  { code: 'ko', label: 'Tiếng Hàn', color: 'bg-gradient-to-r from-pink-400 to-red-500' },
  { code: 'en', label: 'English', color: 'bg-gradient-to-r from-yellow-400 to-orange-500' },
];

const defaultSEO = {
  vi: { brandName: '', description: '', slogan: '' },
  ko: { brandName: '', description: '', slogan: '' },
  en: { brandName: '', description: '', slogan: '' },
};

const SEOManager = () => {
  const [seo, setSeo] = useState(defaultSEO);
  const [activeLang, setActiveLang] = useState('vi');

  const handleChange = (lang, field, value) => {
    setSeo((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const handleSave = () => {
    // TODO: Gọi API lưu hoặc lưu localStorage
    alert('Đã lưu thông tin SEO!');
  };

  const renderForm = (lang) => (
    <div className='space-y-6'>
      {['brandName', 'description', 'slogan'].map((field) => (
        <div className='relative z-0 w-full group' key={field}>
          <input
            type='text'
            name={field}
            id={field}
            className='block py-2.5 px-2 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-200'
            placeholder=' '
            value={seo[lang][field]}
            onChange={(e) => handleChange(lang, field, e.target.value)}
            autoComplete='off'
          />
          <label
            htmlFor={field}
            className='absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] left-2 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none'
          >
            {field === 'brandName' ? 'Brand Name' : field === 'description' ? 'Description' : 'Slogan'}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div className='p-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200'>
      <div className='w-full max-w-2xl rounded-3xl shadow-2xl bg-white/90 p-8'>
        <h1 className='text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-wide'>Quản lý SEO</h1>
        <div className='flex justify-center gap-4 mb-8'>
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              className={`px-5 py-2 rounded-full font-bold shadow transition-all duration-200 border-2 border-transparent text-white text-lg ${lang.color} ${activeLang === lang.code ? 'scale-110 ring-2 ring-blue-400' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
              onClick={() => setActiveLang(lang.code)}
              type='button'
            >
              {lang.label}
            </button>
          ))}
        </div>
        <div className='bg-white rounded-2xl shadow-inner p-6 mb-8 border border-blue-100'>
          {renderForm(activeLang)}
        </div>
        <button
          className='w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xl font-bold rounded-full shadow-lg hover:from-blue-500 hover:to-green-400 transition-all duration-200 uppercase tracking-wider'
          onClick={handleSave}
        >
          Lưu thông tin SEO
        </button>
      </div>
    </div>
  );
};

export default SEOManager;
