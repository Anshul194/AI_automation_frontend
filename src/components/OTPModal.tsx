import React from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Mail, ArrowLeft, Shield, Clock } from "lucide-react";

export default function OTPModal({ open, onClose, onSubmit, loading, error, email }) {
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = React.useState(120); // 2 minutes
  const inputRefs = React.useRef([]);

  React.useEffect(() => {
    if (!open) {
      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(120);
    }
  }, [open]);

  // Countdown timer
  React.useEffect(() => {
    if (!open || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [open, timeLeft]);

  const handleChange = (index, value) => {
    // Only allow single digit
    if (!/^[0-9]?$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'Enter' && otp.every(digit => digit)) {
      handleSubmit(e);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/[^0-9]/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus next empty input or last input
    const nextEmptyIndex = newOtp.findIndex(digit => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.every(digit => digit)) {
      onSubmit(otp.join(''));
    }
  };

  const handleResend = () => {
    setTimeLeft(120);
    // Call resend function if provided
    // onResend?.();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isComplete = otp.every(digit => digit);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-0">
        {/* Header */}
        <div className="relative p-6 pb-2">
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Verify Your Email
            </DialogTitle>
            <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
              <Mail className="w-4 h-4" />
              <span>Code sent to <span className="font-semibold text-slate-900 dark:text-white">{email}</span></span>
            </div>
          </div>
        </div>

        {/* OTP Input Section */}
        <div className="px-6 py-4">
          <div className="space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`
                    w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all duration-200
                    ${digit 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-md' 
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                    }
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-blue-50 dark:focus:bg-blue-900/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                    outline-none placeholder-slate-400
                  `}
                  placeholder="0"
                  disabled={loading}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Timer and Resend */}
            <div className="text-center">
              {timeLeft > 0 ? (
                <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Resend code in {formatTime(timeLeft)}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm transition-colors"
                >
                  Resend verification code
                </button>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400 text-sm text-center font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <form onSubmit={handleSubmit}>
              <Button 
                type="submit" 
                disabled={loading || !isComplete}
                className={`
                  w-full h-12 rounded-xl font-semibold text-base transition-all duration-200 transform
                  ${isComplete && !loading
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                  }
                `}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify Email'
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Didn't receive the code? Check your spam folder or try resending.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}