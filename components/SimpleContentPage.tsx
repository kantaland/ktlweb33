import React from 'react';

interface SimpleContentPageProps {
  title: string;
  subtitle: string;
  content: string | React.ReactNode;
  lastUpdated?: string;
}

const SimpleContentPage: React.FC<SimpleContentPageProps> = ({ title, subtitle, content, lastUpdated }) => {
  return (
    <div className="bg-white min-h-screen pt-40 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="border-t border-black pt-16">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
            
            {/* Sidebar / Meta */}
            <div className="lg:w-1/4">
                <span className="text-[10px] font-bold tracking-brand text-black uppercase mb-8 block pl-4 border-l-2 border-black">
                    {subtitle}
                </span>
                <h1 className="text-4xl md:text-6xl font-normal text-rover-obsidian mb-12 tracking-tighter leading-none uppercase">
                    {title}
                </h1>
                {lastUpdated && (
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <span className="text-[10px] font-bold uppercase tracking-brand text-gray-400 block mb-2">Last Updated</span>
                        <span className="text-xs text-black font-medium">{lastUpdated}</span>
                    </div>
                )}
            </div>

            {/* Main Content Body */}
            <div className="lg:w-3/4">
                <div className="prose prose-lg max-w-4xl text-gray-700 font-light leading-relaxed space-y-12">
                    {typeof content === 'string' ? (
                        <p className="text-xl md:text-2xl font-light text-rover-text leading-loose">
                            {content}
                        </p>
                    ) : (
                        content
                    )}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleContentPage;