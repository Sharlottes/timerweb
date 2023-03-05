import React from 'react'
import ClipboardIcon from './icons/ClipboardIcon';

function copyContent(text: string) {
  return new Promise<string>((res, rej) => {
    navigator.clipboard.writeText(text)
      .then(() => res('successfully copied!'))
      .catch(err => rej(`failed to copy: ${err}`))
  })
}

const ClipCopybar: React.FC<{ text: string, icon?: JSX.Element }> = ({ text, icon = <ClipboardIcon /> }) => {
  const [clickResult, setClickResult] = React.useState('');
  const handleCopyClick = () => {
    copyContent(text)
      .then(res => setClickResult(res))
      .catch(err => setClickResult(err))
      .then(() => setTimeout(() => setClickResult(''), 1000))
  }

  return (
    <>
      <div>
        <div className='icon' onClick={handleCopyClick}>
          {icon}
        </div>
        <span className='text'>
          <a href={text}>{text}</a>
        </span>
      </div>
      {clickResult}
    </>
  )
}

export default ClipCopybar;