class Person < ActiveRecord::Base
  has_many :references, :dependent => :destroy
  validates_presence_of :first_name, :last_name
  validates_associated :references

  accepts_nested_attributes_for :references,
                                :allow_destroy => true,
                                :reject_if => :all_blank
end
