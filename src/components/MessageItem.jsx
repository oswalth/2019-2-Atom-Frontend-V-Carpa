/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import styles from '../styles/MessageItem.module.css';


export function MessageItem(props) {
  const { content, added_at } = props.inner;
  const formattedTime = new Date(added_at);
  let isAttached = false;
  const attachmentsToRender = [];
  if ('attachments' in props.inner) {
    const { attachments } = props.inner;
    isAttached = true;
    attachments.list.forEach((attachment) => {
      const attachmentItem = <Attachment type={attachments.type} attachment={attachment}/>;
      attachmentsToRender.push(attachmentItem);
    });
  }
  return (
        <div className={styles.messageWrap}>
            <div className={styles.messageItem}>
                <div className={styles.inner}>
                  <div className={styles.message}>
                    {content}
                  </div>
                  <div className={styles.attachments}>
                    {isAttached && attachmentsToRender}
                  </div>
                </div>
                <div className={styles.timestamp}>{formattedTime.toLocaleString('ru', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}</div>
            </div>
        </div>
  );
}

function Attachment(props) {
  const {
    name,
    path,
  } = props.attachment;
  const { type } = props;
  const [isPlaying, setPlayStatus] = React.useState(false);
  const audio = React.useRef(null);
  let content = null;

  switch (type) {
    case 'geolocation':
      const {
        latitude,
        longitude,
      } = props.attachment;
      const staticMap = `https://static-maps.yandex.ru/1.x/?ll=${longitude},${latitude}&spn=0.016457,0.00619&l=map&size=300,300`;
      const addStyle = {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '300px',
        width: '300px',
      };
      addStyle.backgroundImage = `url(${staticMap})`;
      content = (
        <div>
          <a href={path} target="_blank" rel="noopener noreferrer">
            <div style={addStyle} className={`${styles.attachment}`} />
          </a>
        </div>
      );
      break;
    case 'image':
      content = <img alt={name} src={path} className={styles.image} />;
      break;
    case 'audio':
      const play = () => {
        if (!isPlaying) {
          audio.current.play();
          setPlayStatus(true);
        } else {
          audio.current.pause();
          setPlayStatus(false);
        }
      };

      const stop = () => {
        setPlayStatus(false);
      };

      const statusStyle = !isPlaying ? styles.audioPlay : styles.audioStop;


      content = (
            <div onClick={play}>
              <div className={styles.attachment}>
                <div className={`${styles.audioStatus} ${statusStyle}`}/>
              </div>
              <audio onEnded={stop} ref={audio} src={path}/>
            </div>
      );
      break;
    default:
      break;
  }

  return content;
}
