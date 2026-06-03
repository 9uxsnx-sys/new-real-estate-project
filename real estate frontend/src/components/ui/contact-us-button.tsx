import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const ContactUsButton = () => {
  return (
    <Button
      className={cn(
        "bg-black text-white rounded-full pl-[clamp(12px,1.5vw,18px)] pr-[clamp(18px,2vw,28px)] py-[clamp(8px,1vw,12px)] h-[clamp(32px,4vh,40px)]",
        "hover:bg-black/90 transition-colors",
        "flex items-center gap-[clamp(4px,0.5vw,8px)] font-medium text-[clamp(11px,1vw,14px)]"
      )}
    >
      <Phone className="w-[clamp(14px,1.5vw,18px)] h-[clamp(14px,1.5vw,18px)] fill-white text-white" strokeWidth={0} />
      <span>Contact Us</span>
    </Button>
  );
};

export default ContactUsButton;