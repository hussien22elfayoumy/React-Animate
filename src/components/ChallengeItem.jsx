import { useContext } from 'react';

import { ChallengesContext } from '../store/challenges-context.jsx';
import { AnimatePresence, motion } from 'motion/react';

export default function ChallengeItem({
  challenge,
  onViewDetails,
  isExpanded,
}) {
  const { updateChallengeStatus } = useContext(ChallengesContext);

  const formattedDate = new Date(challenge.deadline).toLocaleDateString(
    'en-US',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  );

  function handleCancel() {
    updateChallengeStatus(challenge.id, 'failed');
  }

  function handleComplete() {
    updateChallengeStatus(challenge.id, 'completed');
  }

  return (
    <motion.li
      layout
      exit={{ y: -30, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <article className='challenge-item'>
        <header>
          <img {...challenge.image} />
          <div className='challenge-item-meta'>
            <h2>{challenge.title}</h2>
            <p>Complete until {formattedDate}</p>
            <p className='challenge-item-actions'>
              <button onClick={handleCancel} className='btn-negative'>
                Mark as failed
              </button>
              <button onClick={handleComplete}>Mark as completed</button>
            </p>
          </div>
        </header>
        <div className='challenge-item-details'>
          <p>
            <button onClick={onViewDetails}>
              View Details{' '}
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className='challenge-item-details-icon'
              >
                &#9650;
              </motion.span>
            </button>
          </p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className='challenge-item-description'>
                  {challenge.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </motion.li>
  );
}
