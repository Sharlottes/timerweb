import React from 'react';
import ClipCopybar from './ClipCopybar';
import LinkIcon from './LinkIcon';


export interface ClipboardCopybarProps {
  time: string
  title: string
  color: string
}

const ClipboardCopybar: React.FC<ClipboardCopybarProps> = ({ time, title, color }) => {
  const link = `https://timerweb.vercel.app/embed/?date=${time}&title=${title}&color=${color}`;
  const text = `<iframe src='${link}' style='border: none; height: 85px;'></iframe>`;

  return (
    <>
      <ClipCopybar text={text} />
      <div className='divider' style={{ backgroundColor: 'black' }} />
      <ClipCopybar text={link} icon={<LinkIcon />} />
    </>
  )
}

export default ClipboardCopybar;