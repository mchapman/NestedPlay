class AddFieldsToReference < ActiveRecord::Migration
  def self.up
    add_column :references, :date_requested, :datetime
    add_column :references, :date_returned, :datetime
    add_column :references, :comments, :string
  end

  def self.down
    remove_column :references, :date_requested
    remove_column :references, :date_returned
    remove_column :references, :comments
  end
end
