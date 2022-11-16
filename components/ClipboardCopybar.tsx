import React from 'react';
import ClipboardIcon from './ClipboardIcon';

function copyContent(text: string) {
  return new Promise<string>((res, rej) => {
    navigator.clipboard.writeText(text)
      .then(() => res('successfully copied!'))
      .catch(err => rej(`failed to copy: ${err}`))
  })
}

const ClipboardCopybar: React.FC<{ date: string, time: string, title: string }> = ({ date, time, title }) => {
  const [clickResult, setClickResult] = React.useState('');

  const text = `<iframe src='https://timerweb.vercel.app/embed/?date=${date},${time}&title=${title}' style='border: none; height: 85px; min-width: 420px'></iframe>`;

  const handleCopyClick = () => {
    copyContent(text)
      .then(res => setClickResult(res))
      .catch(err => setClickResult(err))
      .then(() => setTimeout(() => setClickResult(''), 1000))
  }

  return (
    <>
      <div className='embed-container'>
        <iframe src={`https://timerweb.vercel.app/embed/?date=${date},${time}&title=${title}`} />
        <div className='clipboard' style={{ display: 'flex', backgroundColor: 'lightGray' }}>
          <div className='icon' onClick={handleCopyClick}>
            <ClipboardIcon />
          </div>
          <div className='text'>
            {text}
          </div>
        </div>
      </div>
      {clickResult}
    </>
  )
}

export default ClipboardCopybar;