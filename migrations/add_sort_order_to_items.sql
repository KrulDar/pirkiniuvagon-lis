-- Add sort_order column to items table
ALTER TABLE items 
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Comment on column
COMMENT ON COLUMN items.sort_order IS 'Order of items within the list/category';
