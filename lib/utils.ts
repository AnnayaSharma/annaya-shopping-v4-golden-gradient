import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod?: string;
}

export function formatAddress(addr: ShippingAddress): string {
  const lines = [
    `*${addr.fullName}*`,
    `📞 ${addr.phone}`,
    addr.addressLine1,
    addr.addressLine2 ? addr.addressLine2 : '',
    `${addr.city}, ${addr.state} – ${addr.pincode}`,
  ].filter(Boolean);

  if (addr.paymentMethod) {
    lines.push(`\n💳 *Payment Method:* ${addr.paymentMethod}`);
  }

  return lines.join('\n');
}

export function getWhatsAppUrl(
  productName: string,
  size: string,
  color: string,
  price: number,
  address?: ShippingAddress
) {
  let message = `Hello Annaya Boutique! 🛍️\nI'd love to order: *${productName}*\nSize: ${size} | Color: ${color}\nPrice: ${formatPrice(price)}`;
  if (address) {
    message += `\n\n📍 *Delivery Address:*\n${formatAddress(address)}`;
  }
  message += `\n\nPlease confirm availability!`;
  return `https://wa.me/917494954286?text=${encodeURIComponent(message)}`;
}
