import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="flex flex-col h-full w-60 border-r">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold">Contacts</h2>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-50">
            {/* Profile pic skeleton */}
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            {/* Name skeleton */}
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;