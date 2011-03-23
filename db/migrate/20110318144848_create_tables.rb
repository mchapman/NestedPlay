class CreateTables < ActiveRecord::Migration
  def self.up
    create_table :people do |t|
      t.string :first_name, :null => false
      t.string :last_name, :null => false
      t.timestamps
    end

    create_table :references do |t|
      t.string :first_name, :null => false
      t.string :last_name, :null => false
      t.string :email, :null => false
      t.integer :person_id, :null => false
      t.timestamps
    end
  end

  def self.down
    drop_table :people
    drop_table :references
  end
end
