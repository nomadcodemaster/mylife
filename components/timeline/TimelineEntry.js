"use client";

const TimelineEntry = ({ entry, onEdit, onDelete }) => {
  const categoryEmojis = {
    work: "💼",
    education: "🎓",
    achievement: "🏆",
    personal: "❤️"
  };

  return (
    <div className="flex gap-8 mb-8 relative group">
      <div className="w-32 pt-2 text-sm text-base-content/60">
        {new Date(entry.date).toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        })}
      </div>
      
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center relative z-10">
        {categoryEmojis[entry.category]}
      </div>

      <div className="flex-1 bg-base-200 rounded-xl p-6 hover:shadow-lg transition-all">
        <h3 className="text-xl font-bold mb-2">{entry.title}</h3>
        <p className="text-base-content/80">{entry.description}</p>
        
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="btn btn-sm btn-ghost" onClick={() => onEdit(entry)}>✏️ Edit</button>
          <button className="btn btn-sm btn-ghost text-error" onClick={() => onDelete(entry._id)}>🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TimelineEntry;