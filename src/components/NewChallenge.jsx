import { useContext, useRef, useState } from 'react';
import { motion, useAnimate } from 'motion/react';

import { ChallengesContext } from '../store/challenges-context.jsx';
import Modal from './Modal.jsx';
import images from '../assets/images.js';

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  const [scope, animate] = useAnimate();

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      console.log('worng');
      animate(
        'input, textarea',
        {
          x: [-8, 0, 8, 0],
        },
        {
          duration: 0.2,
        }
      );
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title='New Challenge' onClose={onDone}>
      <form id='new-challenge' onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor='title'>Title</label>
          <input ref={title} type='text' name='title' id='title' />
        </p>

        <p>
          <label htmlFor='description'>Description</label>
          <textarea ref={description} name='description' id='description' />
        </p>

        <p>
          <label htmlFor='deadline'>Deadline</label>
          <input ref={deadline} type='date' name='deadline' id='deadline' />
        </p>

        <motion.ul
          variants={{
            visible: { transition: { staggerChildren: 0.03 } },
          }}
          id='new-challenge-images'
        >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: {
                  opacity: 1,
                  scale: [0.8, 1.15, 1],
                },
              }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? 'selected' : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className='new-challenge-actions'>
          <button type='button' onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
