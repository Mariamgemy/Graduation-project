import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

const Toast = ({ 
  message, 
  type = 'success', 
  isVisible, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-success" />;
      case 'error':
        return <AlertCircle size={20} className="text-danger" />;
      case 'info':
        return <Info size={20} className="text-info" />;
      default:
        return <CheckCircle size={20} className="text-success" />;
    }
  };

  const getToastClass = () => {
    switch (type) {
      case 'success':
        return 'bg-success-subtle border-success';
      case 'error':
        return 'bg-danger-subtle border-danger';
      case 'info':
        return 'bg-info-subtle border-info';
      default:
        return 'bg-success-subtle border-success';
    }
  };

  const getProgressBarClass = () => {
    switch (type) {
      case 'success':
        return 'bg-success';
      case 'error':
        return 'bg-danger';
      case 'info':
        return 'bg-info';
      default:
        return 'bg-success';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`position-fixed top-0 end-0 m-3 ${getToastClass()} border rounded shadow-lg`}
          style={{ 
            zIndex: 1080, 
            maxWidth: '350px',
            width: '100%',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div className="p-3">
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0 me-3">
                {getIcon()}
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 fw-medium text-dark small">
                  {message}
                </p>
              </div>
              <div className="flex-shrink-0 ms-2">
                <button
                  onClick={onClose}
                  className="btn-close btn-sm"
                  aria-label="Close"
                  style={{ 
                    background: 'none',
                    border: 'none',
                    padding: '0',
                    width: '16px',
                    height: '16px',
                    opacity: 0.6,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = '0.6'}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>
          
          {/* شريط التقدم */}
          {duration > 0 && (
            <div className="position-relative overflow-hidden" style={{ height: '4px' }}>
              <motion.div
                className={`position-absolute top-0 start-0 h-100 ${getProgressBarClass()}`}
                style={{ borderRadius: '0 0 0.375rem 0.375rem' }}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;