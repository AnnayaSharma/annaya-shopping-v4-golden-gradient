'use client';

import { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ShippingAddress } from '@/lib/utils';

export type { ShippingAddress };

const emptyAddress: ShippingAddress = {
  fullName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
};

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (address: ShippingAddress) => void;
}

const REQUIRED: (keyof ShippingAddress)[] = [
  'fullName',
  'phone',
  'addressLine1',
  'city',
  'state',
  'pincode',
];

type FormField = Exclude<keyof ShippingAddress, 'paymentMethod'>;

const LABELS: Record<FormField, string> = {
  fullName: 'Full Name',
  phone: 'Phone Number',
  addressLine1: 'Address Line 1',
  addressLine2: 'Address Line 2 (Optional)',
  city: 'City',
  state: 'State',
  pincode: 'Pincode',
};

export const AddressForm: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const [address, setAddress] = useState<ShippingAddress>(emptyAddress);
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, boolean>>>({});
  const [paymentMethod, setPaymentMethod] = useState<string>('PhonePe');

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};
    let hasError = false;

    REQUIRED.forEach((key) => {
      const val = address[key];
      if (typeof val === 'string' && !val.trim()) {
        newErrors[key] = true;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }
    onSubmit({ ...address, paymentMethod });
    setAddress(emptyAddress);
    setErrors({});
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-gold-amber/20 shadow-2xl"
            style={{ background: 'linear-gradient(160deg, #1A0B00 0%, #2B1600 100%)' }}
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 border-b border-gold-amber/10"
              style={{ background: 'linear-gradient(160deg, #1A0B00 0%, #2B1600 100%)' }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gold-amber/10 text-gold-glow">
                  <MapPin size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-serif text-ivory">Delivery Address</h2>
                  <p className="text-[10px] text-ivory/50 uppercase tracking-widest">
                    Where should we deliver?
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center text-ivory/60 hover:text-ivory hover:bg-ivory/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-4">
              {(Object.keys(LABELS) as FormField[]).map((field) => (
                <div key={field}>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-ivory/60 mb-1.5">
                    {LABELS[field]}
                  </label>
                  <input
                    type={field === 'phone' || field === 'pincode' ? 'tel' : 'text'}
                    value={address[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={LABELS[field]}
                    className={`w-full px-4 py-3 rounded-xl bg-ivory/5 border text-ivory placeholder:text-ivory/25 text-sm focus:outline-none focus:ring-2 focus:ring-gold-amber/40 transition-all ${
                      errors[field]
                        ? 'border-copper ring-2 ring-copper/30'
                        : 'border-gold-amber/10 hover:border-gold-amber/30'
                    }`}
                  />
                  {errors[field] && (
                    <p className="text-copper text-[10px] mt-1 font-medium tracking-wider uppercase">
                      This field is required
                    </p>
                  )}
                </div>
              ))}

              {/* Payment Methods */}
              <div className="pt-6 border-t border-gold-amber/10 mt-6">
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-ivory/60 mb-5">
                  Payment Method
                </label>
                <div className="flex justify-center items-center gap-6 w-full pb-2">
                  {/* PhonePe */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('PhonePe')}
                    className={`w-16 h-16 rounded-full bg-white flex items-center justify-center transition-all overflow-hidden p-3.5 border-[3px] ${
                      paymentMethod === 'PhonePe'
                        ? 'border-gold-amber scale-110 shadow-[0_0_25px_rgba(212,137,26,0.3)]'
                        : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105 shadow-xl'
                    }`}
                    title="PhonePe"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-full w-full object-contain" />
                  </button>

                  {/* Google Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Google Pay')}
                    className={`w-16 h-16 rounded-full bg-white flex items-center justify-center transition-all overflow-hidden p-3 border-[3px] ${
                      paymentMethod === 'Google Pay'
                        ? 'border-gold-amber scale-110 shadow-[0_0_25px_rgba(212,137,26,0.3)]'
                        : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105 shadow-xl'
                    }`}
                    title="Google Pay"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-full w-full object-contain scale-110" />
                  </button>

                  {/* Paytm */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Paytm')}
                    className={`w-16 h-16 rounded-full bg-white flex items-center justify-center transition-all overflow-hidden p-2.5 border-[3px] ${
                      paymentMethod === 'Paytm'
                        ? 'border-gold-amber scale-110 shadow-[0_0_25px_rgba(212,137,26,0.3)]'
                        : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105 shadow-xl'
                    }`}
                    title="Paytm"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-full w-full object-contain scale-125" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="sticky bottom-0 p-6 pt-4 border-t border-gold-amber/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col items-center z-10"
              style={{ background: 'linear-gradient(160deg, #1A0B00 0%, #2B1600 100%)' }}
            >
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-4 [background:var(--background-whatsapp)] text-ivory font-bold rounded-2xl flex items-center justify-center space-x-3 shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:scale-[1.02] transition-all"
              >
                <MapPin size={18} />
                <span className="tracking-[0.1em] uppercase text-sm">Confirm & Order on WhatsApp</span>
              </button>
              <p className="text-[10px] text-ivory/40 text-center mt-4 uppercase tracking-widest w-full px-4 leading-relaxed">
                Your address & payment choice will be shared securely via WhatsApp.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
