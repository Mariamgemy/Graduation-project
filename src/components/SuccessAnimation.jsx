import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';

const SuccessAnimation = () => {
  return (
    <div className="position-relative d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
      {/* الخلفية المتوهجة */}
      <motion.div
        className="position-absolute rounded-circle"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120px',
          height: '120px',
          background: 'rgba(72, 187, 120, 0.3)',
          filter: 'blur(20px)',
          zIndex: 0
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* الدوائر المتحركة */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="position-absolute border rounded-circle"
          style={{
            width: 100 + (i * 30),
            height: 100 + (i * 30),
            borderColor: 'rgba(72, 187, 120, 0.5)',
            borderWidth: '2px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* أيقونة النجاح */}
      <motion.div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ 
          zIndex: 10,
          width: '96px',
          height: '96px'
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          type: "spring",
          bounce: 0.6
        }}
      >
        <CheckCircle 
          size={96} 
          color="#48bb78" 
          fill="currentColor"
        />
      </motion.div>
      
      {/* النجوم المتطايرة */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="position-absolute"
          style={{
            left: `${50 + Math.cos((i * 60) * Math.PI / 180) * 80}px`,
            top: `${50 + Math.sin((i * 60) * Math.PI / 180) * 80}px`,
            zIndex: 5
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1 + (i * 0.2),
            ease: "easeInOut"
          }}
        >
          <Sparkles size={16} color="#f6d55c" />
        </motion.div>
      ))}
    </div>
  );
};

export default SuccessAnimation;