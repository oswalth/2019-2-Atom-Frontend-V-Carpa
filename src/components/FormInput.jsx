/* eslint-disable import/prefer-default-export */
import React from 'react';
import styles from '../styles/FormInput.module.css';
import { findMe } from '../lib/findMe';
import { startRecord, stopRecord } from '../lib/voiceRecord';


export function FormInput(props) {
  const input = React.useRef(null);
  const {
    messageHandler,
    requireRecorder,
    mediaRecorder,
  } = props;
  const [dragFiles, setDragFiles] = props.dragFiles;
  const [dropOutStyle, setDropOutStyle] = React.useState(null);
  const [attachments, setAttachments] = React.useState(null);
  const [sendButtonType, setSendButtonType] = React.useState('mic');
  const [recording, setRecording] = React.useState(false);
  let attachmentsBoxStyles = null;
  let list = null;
  const img = React.useRef(null);

  const onSubmit = () => {
    const value = input.current.value.trim();
    if (attachments || value !== '') {
      input.current.value = '';
      messageHandler(value, null, null, attachments);
    }
    setAttachments(null);
  };

  const onKeyPress = (event) => {
    if (event.charCode === 13) {
      onSubmit();
    }
  };

  const removeFile = (i) => {
    const attachmentsList = attachments.list;
    attachmentsList.splice(i, 1);
    if (attachmentsList.length) {
      setAttachments({
        type: attachments.type,
        list: attachmentsList,
      });
    } else {
      setAttachments(null);
    }
  };

  if (dragFiles) {
    const draggedAttachments = attachments || {};
    draggedAttachments.type = 'image';
    draggedAttachments.list = [
      {
        name: dragFiles.name,
        path: window.URL.createObjectURL(dragFiles),
        file: dragFiles,
      },
    ];

    if (draggedAttachments !== attachments) {
      setAttachments(draggedAttachments);
    }

    setDragFiles(null);
  }


  const recordStatus = (status) => {
    if (recording !== status) {
      setRecording(status);
    }
  };

  if (recording) {
    if (sendButtonType !== 'cancel') { setSendButtonType('cancel'); }
  } else if ((input.current && input.current.value !== '') || attachments) {
    if (sendButtonType !== 'send') { setSendButtonType('send'); }
  } else if (sendButtonType !== 'mic') { setSendButtonType('mic'); }

  const imageUploader = (event, callbackSuccess, callbackError = null) => {
    let additionsList = event.target.files;
    if (!additionsList.length) {
      return false;
    }

    let flag = false;
    additionsList = [...additionsList].map((file) => {
      if (file.size > 5 * 1024 * 1024) { flag = true; }

      return {
        name: file.name,
        path: window.URL.createObjectURL(file),
        file,
      };
    });

    if (flag) {
      if (callbackError) { callbackError('Слишком большой файл'); }
      return false;
    }

    if (attachments) {
      additionsList = [...attachments.list, ...additionsList];
    }

    if (attachments && attachments.type !== 'image') {
      if (callbackError) { callbackError('Вы уже добавили другой тип файлов'); }
      return false;
    }

    if (additionsList.length > 10) {
      additionsList = additionsList.slice(0, 10);
    }

    callbackSuccess(additionsList);

    return false;
  };

  if (attachments) {
    attachmentsBoxStyles = {
      height: '100px',
    };

    list = attachments.list.map((addition, i) => (
        <Attachment
          key={i}
          remove={removeFile.bind(null, i)}
          type={attachments.type}
          addition={addition}
        />
    ));
  }

  return (
    <div className={styles.container}>

        <div className={styles.formInput}>
            <div
              onClick={() => {
                !dropOutStyle && setDropOutStyle({
                  height: '120px',
                });
                dropOutStyle && setDropOutStyle(null);
              }}
              className={styles.attachButton} />
            <input
              onChange={(event) => {
                if (event.target.value.length > 0) {
                  setSendButtonType('send');
                } else if (event.target.value.length === 0) {
                  setSendButtonType('mic');
                }
              }}
              onKeyPress={onKeyPress}
              ref={input}
              placeholder='Enter message...' />
            <SendButton
              cancel={() => {
                stopRecord(mediaRecorder, () => {
                  recordStatus(false);
                });
              }}
              record={() => {
                requireRecorder().then((media) => {
                  startRecord(media, () => {
                    recordStatus(true);
                  }, () => {
                    recordStatus(false);
                  }, (audioURL, blob) => {
                    setAttachments({
                      type: 'audio',
                      list: [
                        {
                          name: 'Аудиозапись',
                          path: audioURL,
                          file: blob,
                        },
                      ],
                    });
                  });
                }).catch(console.log);
              }}
              submit={onSubmit}
              type={sendButtonType}/>
            <div className={styles.dropOut} style={dropOutStyle}>
              <div className={styles.dropOutContainer}>
                <div
                  onClick={() => {
                    setDropOutStyle(null);
                    img.current.click();
                  }}
                  className={`${styles.attachItem} ${styles.attachImage}`}>
                  <input
                    onChange={(event) => {
                      imageUploader(event, (attachmentsList) => {
                        setAttachments({
                          type: 'image',
                          list: attachmentsList,
                        });
                      });
                    }}
                    ref={img}
                    type='file'
                    multiple style={{ display: 'none' }} />
                </div>
                <div
                  onClick={() => {
                    setDropOutStyle(null);
                    findMe((position) => {
                      const { latitude, longitude } = position.coords;
                      const response = `https://yandex.ru/maps/?ll=${longitude}%2C${latitude}&z=15`;
                      setAttachments({
                        type: 'geolocation',
                        list: [
                          {
                            name: 'Geolocation',
                            path: response,
                            latitude,
                            longitude,
                          },
                        ],
                      });
                    });
                  }}
                  className={`${styles.attachItem} ${styles.attachGeo}`}></div>
              </div>
            </div>
        </div>
        <div style={attachmentsBoxStyles} className={styles.additionsBox}>
          <ul className={styles.additionsBoxUl}>{list}</ul>
        </div>
    </div>
  );
}

function Attachment(props) {
  const {
    remove,
    type,
    addition,
  } = props;

  const addStyle = {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '65px',
  };

  switch (type) {
    case 'image':
      addStyle.backgroundImage = `url(${addition.path})`;
      break;
    case 'geolocation':
      addStyle.backgroundImage = 'url(https://image.flaticon.com/icons/svg/854/854878.svg)';
      break;
    case 'audio':
      addStyle.backgroundImage = 'url(https://image.flaticon.com/icons/svg/117/117114.svg)';
      break;
    default:
      break;
  }

  return (
    <li>
      <div onClick={remove} className={styles.remove}>
        -
      </div>
      <div style={addStyle} className={styles.image} />
      <span className={styles.imageName}>{addition.name}</span>
    </li>
  );
}

function SendButton(props) {
  const {
    submit,
    record,
    cancel,
    type,
  } = props;

  let content = null;

  switch (type) {
    case 'mic':
      content = <div
        onClick={record}
        className={`${styles.inputButton} ${styles.micButton}`}
      />;
      break;
    case 'send':
      content = <div
        onClick={submit}
        className={`${styles.inputButton} ${styles.sendButton}`}
      />;
      break;
    case 'cancel':
      content = <div
        onClick={cancel}
        className={`${styles.inputButton} ${styles.cancelButton}`}
      />;
      break;
    default:
      break;
  }

  return content;
}
