import Link from 'next/link';
import { ANNOUNCEMENTS } from '@/lib/data';

export default function NewsTicker() {
  const latestNotices = ANNOUNCEMENTS.slice(0, 5); // Take top 5

  return (
    <div className="bg-[#D4AF37] text-[#1B3A6B] py-2 px-4 flex items-center overflow-hidden h-10 shadow-inner">
      <div className="font-bold text-sm tracking-wider uppercase pr-4 border-r border-[#1B3A6B]/20 whitespace-nowrap shrink-0 flex items-center gap-2">
        <span className="animate-pulse">🔴</span> Breaking News
      </div>
      <div className="flex-1 overflow-hidden h-6 relative ml-4">
        {/* We use negative margins and keyframes to slide up */}
        <div className="animate-ticker absolute w-full left-0 top-0">
          {/* We repeat the first one at the end to make it a seamless loop */}
          {[...latestNotices, latestNotices[0]].map((notice, i) => (
            <div key={i} className="h-6 flex items-center">
              <Link 
                href="/announcements" 
                className="text-sm font-semibold hover:underline truncate block"
              >
                {notice.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
