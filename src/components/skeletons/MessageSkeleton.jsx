const MessageSkeleton = () => {
    // Create an array of 6 items for skeleton messages
    const skeletonMessages = Array(6).fill(null);
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {skeletonMessages.map((_, idx) => (
          <div key={idx} className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
            <div className="flex gap-3 max-w-[80%]">
              {/* Show avatar only for messages on the left (even indices) */}
              {idx % 2 === 0 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0" />
              )}
              
              <div className={`flex flex-col ${idx % 2 === 0 ? "items-start" : "items-end"}`}>
                {/* Message bubble */}
                <div className="bg-gray-200 rounded-2xl p-4 animate-pulse">
                  <div className="w-[200px] h-4" />
                </div>
              </div>
              
              {/* Show avatar only for messages on the right (odd indices) */}
              {idx % 2 !== 0 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageSkeleton;