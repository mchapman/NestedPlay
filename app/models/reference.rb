class Reference < ActiveRecord::Base

  include NestedForm::NestedAttribute

  belongs_to :person
  validates_presence_of :first_name, :last_name, :email
end
