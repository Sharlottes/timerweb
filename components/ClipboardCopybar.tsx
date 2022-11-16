import React from 'react';
import ClipCopybar from './ClipCopybar';
import LinkIcon from './LinkIcon';


export interface ClipboardCopybarProps {
  date: string
  time: string
  title: string
  color: string
}

const ClipboardCopybar: React.FC<ClipboardCopybarProps> = ({ date, time, title, color }) => {
  const link = `https://timerweb.vercel.app/embed/?date=${date},${time}&title=${title}&color=${color}`;
  const text = `<iframe src='${link}' style='border: none; height: 85px;'></iframe>`;

  return (
    <>
      <div className='embed-container'>
        <iframe src={`https://timerweb.vercel.app/embed/?date=${date},${time}&title=${title}&color=${color}`} />
        <ClipCopybar text={text} />
        <div className='divider' style={{ backgroundColor: 'black' }} />
        <ClipCopybar text={link} icon={<LinkIcon />} />
      </div>
    </>
  )
}

export default ClipboardCopybar;