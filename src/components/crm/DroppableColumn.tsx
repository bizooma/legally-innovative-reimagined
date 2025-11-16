import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface DroppableColumnProps {
  id: string;
  children: React.ReactNode;
  items: string[];
}

export const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  children,
  items,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      <div
        ref={setNodeRef}
        className={`space-y-2 min-h-[200px] p-2 rounded-lg transition-colors ${
          isOver ? 'bg-primary/10 border-2 border-primary border-dashed' : 'bg-muted/20'
        }`}
      >
        {children}
      </div>
    </SortableContext>
  );
};
