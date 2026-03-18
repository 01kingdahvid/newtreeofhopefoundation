import { sendUniversalEmail } from '@/services/emailService';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function useEmail() {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendEmail = async ({ formType, data, replyTo }) => {
    setIsSending(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await sendUniversalEmail({ formType, data, replyTo });
      if (result.success) {
        setSuccess(true);
        toast.success('Sent successfully!');
        return true;
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to send enquiry');
      return false;
    } finally {
      setIsSending(false);
    }
  };

  return { sendEmail, isSending, error, success };
}