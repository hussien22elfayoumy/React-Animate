import { useState } from 'react';

import NewChallenge from './NewChallenge.jsx';
import { AnimatePresence, motion } from 'motion/react';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id='main-header'>
        <h1>Your Challenges</h1>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#8b11f0' }}
          transition={{
            type: 'spring',
            stiffness: 500,
          }}
          onClick={handleStartAddNewChallenge}
          className='button'
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
